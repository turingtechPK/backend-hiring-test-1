// for DB models when required

import pkg from 'mongoose';
const { model, Schema } = pkg;

/**
 * A call model to log calls data in DB, it does not store the call data
 * @param {String} ext - extension used by the client [1,2]
 * @param {String} createdAt - Date of the call in ISO string format
 * @param {String} user - (optional) user id
 */
const callSchema = new Schema({
  ext: String,
  createdAt: String,
  user: String,
});

const Call = model('Call', callSchema);
export default Call;
