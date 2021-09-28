const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: `${__dirname}/../config.env` });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then((con) => {
  console.log('DB connection sucessfully');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on  http://localhost:${port}`);
});
