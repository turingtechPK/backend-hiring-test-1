import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TwilioService } from './twilio.service';


@Controller()
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}
}
