import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ICall, IRecording } from 'src/Interfaces';

/**
 * Returns an ICall object with appended recording and duration if available.
 * 
 * @returns {ICall} An ICall object containing caller, caller country, called to, called to country, and CallSid.
 * If recording data is available, RecordingSid, RecordingDuration, and RecordingUrl are also included.
 * If call duration is available, call_duration is appended.
 */



export const CallObj = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();


    const returnObj: Partial<ICall> = {
      caller: request.body.From,
      caller_country: request.body.CallerCountry,
      called_to: request.body.To,
      called_to_country: request.body.ToCountry,
      CallSid: request.body.CallSid,
    };
    if (request.body.RecordingSid ) {
      returnObj.Recording = {
        RecordingSid: request.body.RecordingSid,
        RecordingDuration: request.body.RecordingDuration,
        RecordingUrl: request.body.RecordingUrl,
      };
    }

    if (request.body.CallDuration) {
      returnObj.call_duration = request.body.CallDuration;
    }
    return returnObj;
  },
);
