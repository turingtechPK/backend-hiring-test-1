import * as dotenv from 'dotenv';
dotenv.config()

import { urlencoded } from 'body-parser';
import Express, { Request, Response } from 'express';
const app = Express()
const port = process.env.PORT || 3000;
import callRouter from './routes/call'
import cookieParser from 'cookie-parser';

app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
	res.send('<a href="call/logs"> Call Logs </a>')
})
app.use("/call", callRouter);
app.listen(port, () => {
	console.log(`Twilio IRV listening on port ${port}`)
})