require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');  // ./routes/api로 수정

const app = express();
app.use(bodyParser.json());

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 8081;  // 8081 또는 환경 변수로 포트 설정
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});