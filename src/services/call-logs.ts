const CallLogs = require("../model/call-logs");

export const getAllCallLogs = async () => {
  try {
    return await CallLogs.find({});
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCallById = async (id: string) => {
  try {
    return await CallLogs.findById(id);
  } catch (error) {
    throw new Error(error.message);
  }
};
