import { Injectable } from '@nestjs/common';
import { NodeEnv } from '@utils/enum';
import { createDatabase } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  public static async startup() {
    try {
      process
        .on('unhandledRejection', (reason) => {
          // eslint-disable-next-line no-console
          console.error('Unhandled Rejection at Promise', reason);
        })
        .on('uncaughtException', (err) => {
          // eslint-disable-next-line no-console
          console.error(err, 'Uncaught Exception thrown');
          process.exit(1);
        });
      return;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  /**
   * Configures The App Environment
   *
   * @returns
   */
  static envConfiguration(): string {
    switch (process.env.NODE_ENV) {
      case NodeEnv.TEST:
        return `_${NodeEnv.TEST}.env`;

      default:
        return '.env';
    }
  }

}
