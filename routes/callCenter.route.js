import express from 'express';
import { welcome, digitLookup, recordCall, errorMsg, goodByeMsg, getCallRecordings, endCall } from '../controllers/callCenter.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Call
 *   description: A call center for forwarding and recording phone calls.
 */


/**
 * @swagger
 * /turing-tech/welcome:
 *   post:
 *     summary: Handle welcome greetings and user input
 *     description: Initiates a voice response with a menu for user input.
 *     tags: [Call]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/xml:
 *             example:
 *               <?xml version="1.0" encoding="UTF-8"?>
 *               <Response>
 *                 <Gather numDigits="1" action="/turing-tech/digit-lookup" method="POST">
 *                   <Say>
 *                     Thank you for calling Turing Technologies!
 *                     If you wish to talk to one of our representatives, please press 1.
 *                     For a voice message, please press 2.
 *                   </Say>
 *                 </Gather>
 *               </Response>
 * 
 */
router.route("/welcome").post(welcome).get(welcome);

/**
* @swagger
 * /turing-tech/digit-lookup:
 *   post:
 *     summary: Handle user input based on digits pressed
 *     description: Processes user input based on the digit pressed during a call.
 *     tags: [Call]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               Digits:
 *                 type: string
 *                 description: The digit pressed by the user.
 *                 example: '1'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/xml:
 *             example:
 *               <?xml version="1.0" encoding="UTF-8"?>
 *               <Response>
 *                 <Dial callerId="{{TWILIO_PHONE_NUMBER}}" action="/turing-tech/record/call" method="POST">
 *                   <Number>{{MY_PHONE}}</Number>
 *                 </Dial>
 *               </Response>
 *       '201':
 *         description: Voice message recording response
 *         content:
 *           application/xml:
 *             example:
 *               <?xml version="1.0" encoding="UTF-8"?>
 *               <Response>
 *                 <Say>Please leave a message after the beep.</Say>
 *                 <Record action="/turing-tech/record/recording" maxLength="30" playBeep="true" finishOnKey="*"/>
 *               </Response>
 *       '307':
 *         description: Redirect response
 *         headers:
 *           Location:
 *             description: Redirect location
 *             example: /turing-tech/welcome
 */

router.post("/digit-lookup", digitLookup);


/**
 * @swagger
 * /turing-tech/record/{type}:
 *   post:
 *     summary: Handle call recording and processing
 *     description: Records call details and processes based on the provided type.
 *     tags: [Call]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: Call was forwarded or a voice recording.
 *         schema:
 *           type: string
 *           example: 'recording'
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               To:
 *                 type: string
 *                 description: The recipient's phone number.
 *                 example: '+1234567890'
 *               From:
 *                 type: string
 *                 description: The caller's phone number.
 *                 example: '+9876543210'
 *               CallSid:
 *                 type: string
 *                 description: The unique identifier for the call.
 *                 example: 'CA1234567890'
 *               RecordingSid:
 *                 type: string
 *                 description: The unique identifier for the recording.
 *                 example: 'RE9876543210'
 *               RecordingUrl:
 *                 type: string
 *                 description: The URL of the call recording.
 *                 example: 'https://example.com/recording.mp3'
 *               RecordingDuration:
 *                 type: integer
 *                 description: The duration of the recording.
 *                 example: '30'
 *               ErrorMessage:
 *                 type: string
 *                 description: An error message (if any).
 *                 example: 'Call failed'
 *               DialBridged:
 *                 type: string
 *                 description: Indicates whether the dial was bridged successfully.
 *                 example: 'true'
 *     responses:
 *       '307':
 *         description: Redirect response
 *         headers:
 *           Location:
 *             description: Redirect location based on processing result
 *             example: /turing-tech/goodbye
 */
router.post("/record/:type", recordCall);

/**
 * @swagger
 * /turing-tech/goodbye:
 *   get:
 *     summary: Voices goodbye message to the caller
 *     description: Voices a goodbye message to the caller after a call.
 *     tags: [GoodbyeMessage]
 *     responses:
 *       '200':
 *         description: Goodbye message displayed successfully
 *         content:
 *           application/xml:
 *             schema:
 *               type: string
 *               example: '<Response><Say>Thank you for calling Turing Technologies! Your voice makes a difference. Goodbye.</Say><Hangup/></Response>'
 */
router.route("/goodbye").get(goodByeMsg);

/**
 * @swagger
 * /turing-tech/error-msg:
 *   get:
 *     summary: Display error message to the caller
 *     description: Voices an error message to the caller when a call does not go through.
 *     tags: [ErrorMessage]
 *     responses:
 *       '200':
 *         description: Error message displayed successfully
 *         content:
 *           application/xml:
 *             schema:
 *               type: string
 *               example: '<Response><Say>Our representatives are busy at the moment! Please Try Again Later. Goodbye.</Say><Hangup/></Response>'
 */
router.route("/error-msg").get(errorMsg);;

/**
 * @swagger
 * /turing-tech/end:
 *   post:
 *     summary: Save Call Details
 *     tags: [Call]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               To:
 *                 type: string
 *                 description: The recipient's phone number.
 *                 example: '+1234567890'
 *               From:
 *                 type: string
 *                 description: The caller's phone number.
 *                 example: '+9876543210'
 *               Direction:
 *                 type: string
 *                 description: The direction of the call (incoming/outgoing).
 *                 example: 'incoming'
 *               CallSid:
 *                 type: string
 *                 description: The unique identifier for the call.
 *                 example: 'CA1234567890'
 *               CallStatus:
 *                 type: string
 *                 description: The status of the call.
 *                 example: 'completed'
 *               CallerCountry:
 *                 type: string
 *                 description: The country code of the caller.
 *                 example: 'US'
 *               CalledCountry:
 *                 type: string
 *                 description: The country code of the called party.
 *                 example: 'CA'
 *               CallDuration:
 *                 type: integer
 *                 description: The duration of the call.
 *                 example: '10'
 *     responses:
 *       '200':
 *         description: Successfully saved call details
 *       '500':
 *         description: Internal server error
 */
router.post("/end", endCall);



/**
 * @swagger
 * /turing-tech/recordings:
 *   get:
 *     summary: Get all call details and voice messages
 *     tags: [Call Details]
 *     responses:
 *       '200':
 *         description: Successfully retrieved call details and voice messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array               
 *       '500':
 *         description: Internal server error
 */
router.get("/recordings", getCallRecordings);



export default router;