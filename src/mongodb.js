const MongoClient = require('mongodb').MongoClient;

if(process.env.NODE_ENV !== "production")
{
  require('dotenv').config();
}

const uri = process.env.REACT_APP_MONGOURI;

var db;

//Initialize mongodb connection once
const  connect  = async () => {
  try{
    await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err,database) {
    if(err) throw err;

    console.log('Connected to mongoDB.');

    db = database;

  });
} catch(error) {
  throw(error);
}
};

 const getDb = async () => {
   try{
   if(db === null || db === undefined)
   {
     console.log('db is null/undefined.');
     await connect();
     return db;
   } else {
     console.log('Retrieved DB.');
     return db;
   }
  }
  catch(error){
    throw(error)
  }
}

 const closeDb = () => {
   db.close();
   console.log('mongoDB db connection closed.');
}

//Payroll get/post
const getPayrollDocuments = (response) => {
  const dbo = db.db("data");
  let documents;
  dbo.collection("payroll").find({}).toArray( function(err, result){
    //console.log('START fetchDocuments');
    console.log('Retrieving Documents...');

    if(err) throw err;
    //console.log('result: ',result);
    console.log('Retrieved Documents!');
    //console.log('END fetchDocuments');
    documents = result;
    response.send(documents);
  });
    // db.close(); 
}

const postSinglePayroll = (document) => {
  const dbo = db.db("data");
  dbo.collection("payroll").insertOne(document)
      .then( res => {
        console.log('Added document!');
        //db.close();
        //   console.log(res);
        //  console.log(document);
      });
}

exports.connect = connect;
exports.getDb = getDb;
exports.closeDb = closeDb;
exports.getPayrollDocuments = getPayrollDocuments;
exports.postSinglePayroll = postSinglePayroll;