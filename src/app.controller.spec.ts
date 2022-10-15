import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CallsController } from './models/calls/calls.controller';
import { CallsModule } from './models/calls/calls.module';
import { CallsService } from './models/calls/calls.service';

describe('AppController', () => {
  let appController: AppController;
  let callController: CallsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CallsModule],
      controllers: [AppController, CallsController],
      providers: [AppService, CallsService],
    }).compile();

    appController = app.get<AppController>(AppController);
    callController = app.get<CallsService>(CallsService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('add new call after call end', () => {
    it('It should have all the keys', () => {
      expect(
        Object.keys(
          callController.createAfterCallEnd(
            'completed',
            1665853316895,
            '+923325886763',
            '+923309890596',
          ),
        ),
      ).toEqual(
        Object.keys({
          id: 'hasdojii210823kjl',
          status: 'complete',
          duration: 1231231,
          audioFile: '',
          from: '+923325886763',
          to: '+923309890596',
          direction: 'inbound',
        }),
      );
    });
  });
});
