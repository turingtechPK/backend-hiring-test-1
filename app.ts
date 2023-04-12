require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
  const app_ = require('./src/server/index.ts');
  app_.then((app) => {
    console.log('Waiting for service to load');
  
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Server running on port  ${port}`);
    });
  })
    .catch((err) => {
        console.error(err);
    });
},err=>{
    console.error(err);
})
