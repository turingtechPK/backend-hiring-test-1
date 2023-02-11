import { urlencoded } from 'body-parser';
import Express, { Request, Response } from 'express';
const app = Express()
const port = 3000;
import callRouter from './routes/call'
import cookieParser from 'cookie-parser';

app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!')
})
app.use("/call", callRouter);
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})