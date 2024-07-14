require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');

const app = express();
app.use(bodyParser.json());

app.use('/api', apiRoutes);

const PORT = 8081;
    // process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});