import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { Types } from "mongoose";
import { WRONG_ID_FORMAT } from "./constants/pipes_constants";

export class IdValidationPipe implements PipeTransform{
    transform(value: string, metadata: ArgumentMetadata) {
        if(metadata.type != 'param') return value
        if(!Types.ObjectId.isValid(value)){
            throw new BadRequestException(WRONG_ID_FORMAT)
        }
        return value
    }
}