import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateReviewDto } from 'src/review/dto/createReview.dto';
import { Types, disconnect } from 'mongoose';

let productId = new Types.ObjectId().toHexString()
const testDto: CreateReviewDto = {
  title: 'Test',
  name: 'TestName',
  description: 'Lorem...',
  rating: '5',
  productId
}
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST)', async (done) => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201)
      .then(({body}:request.Response)=>{
        const id = body._id
        expect(id).toBeDefined()
        done()
      })
  });

  afterAll(()=>{
    disconnect()
  })
});
