import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Call } from '../models/call.model';
import { CallService } from '../services/call.service';
import { twiml } from 'twilio';

@Controller('calls')
export class CallController {
  private fromNumber: string;

  constructor(private readonly callService: CallService) {
    this.fromNumber = '';
  }

  // Handles incoming calls webhook
  @Post('webhook')
  handleIncomingCall(@Req() req: Request, @Res() res: Response) {
    const twilioObj = new twiml.VoiceResponse();
    this.fromNumber = req.body.From; // Extract the caller's phone number from the request body

    // Create a gather element for user input
    const gather = twilioObj.gather({
      numDigits: 1,
      action: '/calls/gather',
    });

    // Provide instructions to the caller
    gather.say('For call forwarding, press 1. To leave a voicemail, press 2.');

    // Redirect the caller back to the webhook URL for further processing
    twilioObj.redirect('/calls/webhook');

    res.type('text/xml');
    res.send(twilioObj.toString());

    return '<?xml version="1.0" encoding="UTF-8"?><Response></Response>';
  }


  // Handles user input from the gather element
  @Post('/gather')
  async handleGatherRequest(@Req() req: Request, @Res() res: Response): Promise<void> {
    const twilioObj = new twiml.VoiceResponse();

    if (req.body.Digits) {
      // Check the user's input and take appropriate actions
      switch (req.body.Digits) {
        case '1':
          twilioObj.say('You selected call forwarding.');
          const callObject = await this.callService.forwardCall(this.fromNumber, twilioObj);
          console.log("call objectt hereee: ", callObject);
          break;
        case '2':
          twilioObj.say('You selected voicemail.');
          const voicemailResponse = await this.callService.allowVoicemail(this.fromNumber, twilioObj);
          console.log("voicemail reponseeee: ", voicemailResponse);
          break;
        default:
          twilioObj.say("Sorry, I don't understand that choice.");
          twilioObj.pause();
          twilioObj.redirect('/calls/webhook');
          break;
      }
    } else {
      // If no user input is received, redirect back to the webhook URL
      twilioObj.redirect('/calls/webhook');
    }

    res.type('text/xml');
    res.send(twilioObj.toString());
  }


  // Handles logging of forwarded calls
  @Get('/logForwardedCall')
  async handleForwardedCall(@Req() req: Request, @Res() res: Response): Promise<void> {
    const callData = req.query; // Call data is passed in the request query parameters

    this.callService.logCall(callData);
    console.log("List of calls: \n", this.callService.getAllCalls());
    res.sendStatus(200);
  }


  // Handles logging of voicemails
  @Get('/logVoiceMail')
  async handleVoiceMail(@Req() req: Request, @Res() res: Response): Promise<void> {
    const callData = req.query; // Call data is passed in the request query parameters

    this.callService.logCall(callData);
    console.log("List of calls: \n", this.callService.getAllCalls());
    res.sendStatus(200);
  }


  // Retrieves all calls
  @Get()
  getAllCalls(): Call[] {
    return this.callService.getAllCalls();
  }
}
