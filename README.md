## Summary

The purpose of the project is to reproduce one small feature: __call forwarding__.

Here is the story:

Your company has one main number. This number is an [IVR](https://en.wikipedia.org/wiki/Interactive_voice_response):
- If the caller presses `1`, call is forwarded to another phone number;
- If the caller presses `2`, he is able to leave a voicemail.

It's 9AM in the office and first calls are coming in!


## Code

In order to receive and route calls, we will be creating an interaction with [Twilio](https://twilio.com)'s API.

- The focus of this project is the interaction between your backend server and Twilio - only inbound calls should be handled;
- In order to test the interaction between Twilio and your local environment, I used tunnels like [ngrok.com](https://ngrok.com);
- Registerd a test account on [Twilio](https://twilio.com) - we'll be able to setup a new account and test phone number for free;
- We added all the models needed specially for Call object;

### Bonus

- Used Typescript
- Used node.js framework
- Used [OpenAPI/Swagger Docs](https://swagger.io/solutions/api-documentation/) to document APIs

### Use case

The use case we want to reproduce is the following:

- A customer is calling the main number of your company;
- If the caller presses `1`, the call is redirected on your personal phone\*. You should be able to pickup and talk with the caller.
- If the caller presses `2`, he can drop a voicemail (you would like to hear this message later);
- The call has to be logged in the database;
- An activity feed, listing all calls, should be displayed: status of the call, duration, link to an audio file if the caller dropped a voicemail plus other info you have in mind.
