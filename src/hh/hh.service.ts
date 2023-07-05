import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CLUSTER_FIND_ERROR, HhAPI, SALARY_CLUSTER_ID } from './const/hh.const';
import { HhResponse } from './hh.models';
import { HhData } from 'src/top_page/top_page.model/top_page.model';
import { log } from 'console';

@Injectable()
export class HhService {
    token:string;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ){
        this.configService.get('HH_TOKEN') ?? "";
    }

async getData(text:string){
    console.log(text)
    try{
        const {data} = await  this.httpService.get<HhResponse>(HhAPI.vacansies,{
            params:{
                text,
                cluster:true
            },
            headers:{
                'User-Agent':'PandasTop/(vladimirplotnikov371@gmail.com)',
                Authorization: 'Bearer'
            }
           }).toPromise()
           return this.parseData(data)
    }
    catch(e){
        Logger.error(e)
    }

}
private parseData(data:HhResponse):HhData{
    const salaryCluster = data.clusters.find(el => el.id === SALARY_CLUSTER_ID)
    if(!salaryCluster){
        throw new Error(CLUSTER_FIND_ERROR)
    }
    const juniorSalary = this.getSalaryFromString(salaryCluster.items[1].name)
    const middleSalary = this.getSalaryFromString(salaryCluster.items[Math.ceil(salaryCluster.items.length / 2)].name)
    const seniorSalary = this.getSalaryFromString(salaryCluster.items[salaryCluster.items.length -1].name)
    return{
        count:data.found,
        juniorSalary,
        middleSalary,
        seniorSalary,
        updatedAt: new Date()
    }
}
private getSalaryFromString(s:string){
    const numberRegExp = /(\d+)/g
const res = s.match(numberRegExp)
    if(!res){
        return 0
    }
    return  +res[0]
}
}
