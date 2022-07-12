const express = require('express');
const mongoose = require('mongoose');
const logger = require('./middleware/logger');
const validation = require('./middleware/validation');
let cors = require('cors');

if (process.env.environment !== 'production') {
    require('dotenv').config();
}

let app = express();

// creating connection to database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("connected to mongoDB"))
    .catch((err) => console.log(err))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);
app.use(validation);

app.use('/api/v1/auth', require('./routes/auth_routes'));
app.use('/api/v1/product', require('./routes/product_routes'));
app.use('/api/v1/order', require('./routes/order_routes'));
app.use('/api/v1/faq', require('./routes/faq_routes'));
app.get('/',(req,res)=>res.send("Hello"));

const PORT = process.env.PORT;
const HOST = process.env.HOST;
app.listen(PORT, () => console.log(`Server running on http://${HOST}:${PORT}`));
module.exports = app;