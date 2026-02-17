const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(() => {
    console.log('DB Connected');
    app.listen(3000, () => {
        console.log('Server is running on port http://localhost:3000');
    })
}).catch((error) => {
    console.log("DB did not connect");
    console.log(error.message);
})


