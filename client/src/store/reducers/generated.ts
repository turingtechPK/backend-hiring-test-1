import { emptySplitApi as api } from '@client/store/api';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    callsControllerFindAll: build.query<
      CallsControllerFindAllApiResponse,
      CallsControllerFindAllApiArg
    >({
      query: () => ({ url: `/api/calls` }),
    }),
    callsControllerFindOne: build.query<
      CallsControllerFindOneApiResponse,
      CallsControllerFindOneApiArg
    >({
      query: (queryArg) => ({ url: `/api/calls/${queryArg.callSid}` }),
    }),
    callsControllerRemove: build.mutation<
      CallsControllerRemoveApiResponse,
      CallsControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/calls/${queryArg.callSid}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as rtk };

export type CallsControllerFindAllApiResponse = /** status 200  */ CallEntity[];
export type CallsControllerFindAllApiArg = void;


export type CallsControllerFindOneApiResponse = /** status 200  */ CallEntity;
export type CallsControllerFindOneApiArg = {
  callSid: string;
};
export type CallsControllerRemoveApiResponse = unknown;
export type CallsControllerRemoveApiArg = {
  callSid: string;
};
export type CallEntity = {
  CallSid: string;
  CallStatus: string;
  Called: string;
  Caller: string;
  Direction: string;
  From: string;
  To: string;
  Duration?: string | null;
  RecordingUrl?: string | null;
};

export const {
  useCallsControllerFindAllQuery,
  useCallsControllerFindOneQuery,
  useCallsControllerRemoveMutation,
} = injectedRtkApi;
