Call Forwarding Application

1. Call on (+1 949 990 3171)
2. After that select the required option to forward call

Deployed App Domain

1.  https://call-forwarding5.herokuapp.com/api/twilio/getHistory
2.  https://call-forwarding5.herokuapp.com/api/twilio/voice

code structure

1. Main file of the repo is index.js where i have defined the routes middlewares etc.
2. Use the git hooks to check the precommits using linter to check the code quality
3. setup the ORM and configure it for db -> sequelize
4. make controllers, models and run migrations
5. two Apis /api/twilio/getHistory and /api/twilio/voice
6. /api/twilio/getHistory is used to check the logs
7. /api/twilio/voice is used when we select the call forward mechanism this api calls and process the mechanism

