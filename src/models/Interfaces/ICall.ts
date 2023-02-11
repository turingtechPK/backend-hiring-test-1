interface ICall {
	sid: string;
	caller: string;
	status: string;
	startTime: Date;
	endTime: Date;
	duration: string;
	voicemail: string;
	country: string;
}

export default ICall;