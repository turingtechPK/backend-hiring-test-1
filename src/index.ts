import * as dotenv from 'dotenv';
dotenv.config()

import { urlencoded } from 'body-parser';
import Express, { Request, Response } from 'express';
const app = Express()
const port = process.env.PORT || 3000;
import callRouter from './routes/call'
import cookieParser from 'cookie-parser';
import callHandler from './controllers/callHandler';

app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!')
})
app.use("/call", callRouter);
app.listen(port, () => {
	console.log(`Twilio IRV listening on port ${port}`)
})