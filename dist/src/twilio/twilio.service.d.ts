import { ConfigService } from '@nestjs/config';
export declare class TwilioService {
    configService: ConfigService;
    private twilioClient;
    constructor(configService: ConfigService);
    dialNumber(to: string): Promise<string>;
    showCallLogs(): Promise<import("twilio/lib/rest/api/v2010/account/call").CallInstance[]>;
}
