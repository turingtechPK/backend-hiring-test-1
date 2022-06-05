import twilio from 'twilio';

import callController from './controllers.js';

// const accountSID = process.env.TWILIO_SID;
// const authToken = process.env.TWILIO_TOKEN;

const routes = (app) => {
  app.get('/', (req, res) => res.status(200).send('Hello T tech'));
  app.post(
    '/call/',
    twilio.webhook({ validate: false }),
    callController.processCall
  );
  app.get('/calls', callController.getCalls);
};

export default routes;
