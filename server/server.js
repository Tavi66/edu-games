const path = require('path');
const express = require('express');
const port = process.env.PORT  || 5000;
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const mongo = require('../src/mongodb');


app.use(cors());
app.use(bodyParser.json());

//mongo.connect();

app.use(express.static(path.join(__dirname,"..","build")) );

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'build',  'index.html'));
});


app.get('/', (request, response) => {
    response.send('on server');
});

//Payroll requests
app.get('/api/payroll',(request,response) => {
    request.connection.setTimeout(1000 * 60 * 10);
    mongo.getPayrollDocuments(response);
  });

app.post('/api/payroll/add', (request, response) => {
    request.connection.setTimeout(1000 * 60 * 10);
    const record = request.body;
    mongo.postSinglePayroll(record);
  });

  app.get('/close', (request, response) => {
      mongo.closeDb();
  })
  
  app.listen( port, () => {
    console.log(`Server running on port ${port}!`);
    mongo.connect();
});
