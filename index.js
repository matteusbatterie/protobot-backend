const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

require('./routes/dialogFlowRoutes')(app); 
console.log(process.env)
const PORT = process.env.PORT || 5000;
app.listen(PORT);