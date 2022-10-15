//Representaion of the type of data that will be stores for a call object
export class CreateCallsDto {
  status: string;
  duration: number;
  audioFile: string;
  from: string;
  to: string;
  direction: string;
}
