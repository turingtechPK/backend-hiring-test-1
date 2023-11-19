import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@services/config/config.service';
import { QueryService } from '@services/query/query.service';
import { TypeOrmModule } from '@nestjs/typeorm';

const providers = [
    ConfigService,
    QueryService,
];
@Global()
@Module({
    providers: [...providers ],
    exports: [...providers],
})
export class SharedModule {}
