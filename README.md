## Description

The applicate uses [Nest](https://github.com/nestjs/nest) framework with TypeScript to carry out the task. Following commands can be used to run it: 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

Nest is [MIT licensed](LICENSE).

## API

The project consists of the following main apis: 

### /call
This API is used to call the twilio US number. Since calling it directly from PK number was not possible so used that. 

### /ivr/incoming
This API is the callback against the twilio webhook for incoming call. When a call comes, this hook is hit and it forwards call to menu API. 

### /ivr/menu
This API returns the call menu against keypad numbers which the programmable voice speaks for caller.
If user presses 1, call is forwarded to my personal number, if user presses 2 they can record a voice mail.

### /ivr/recording
This API is the callback of voice record. Once user records a voice message it is recieved here and we can store it to db. 