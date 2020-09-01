const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

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

//Booklog get/post
const getBookLog = (response) => {
  const dbo = db.db("data");
  let documents;
  dbo.collection("booklog").find({}).toArray( function(err, result){
    console.log('Retrieving Documents...');

    if(err) throw err;
    //console.log('result: ',result);
    console.log('Retrieved Documents!');
    documents = result;
    response.send(documents);
  });
}

const postBookRecord = (document) => {
  const dbo = db.db("data");
  dbo.collection("booklog").insertOne(document)
      .then( res => {
        console.log('Added document!');
        //  console.log(document);
      });
}

//ChoreLog posts/get
const getChorelog = (response) => {
  const dbo = db.db("data");
  let documents; //{projection: {_id: 0} }
  dbo.collection("chorelog").find({}).toArray( function(err, result){
    console.log('Retrieving Documents...');

    if(err) throw err;
    //console.log('result: ',result);
    console.log('Retrieved Documents!');
    documents = result;
    response.send(documents);
  });
}
const findChore = (request, response) => {
  const dbo = db.db("data");
  const document = request.body;
  console.log('document (findChore): ', document);
  let documents;
  dbo.collection("chorelog").find({}, document).toArray( function(err, result){
    console.log('Retrieving Document...');

    if(err) throw err;
    console.log('result: ',result);
    console.log('Retrieved Document!');
    documents = result;

    if(documents.length === 0)
    response.send(false);
    else
    response.send(true);
    //response.send(documents);
  });
}

const postChoreRecord = (document) => {
  const dbo = db.db("data");
  dbo.collection("chorelog").insertOne(document)
      .then( res => {
        console.log('Added document!');
        //  console.log(document);
      });
}

const deleteChoreRecord = (document) => {
  const dbo = db.db("data");
  // dbo.collection("chorelog").findOne(document)
  // .then(
  //   res => console.log(res)
  // )
  // .catch(err => console.log(err));
    console.log(document);

  dbo.collection("chorelog").deleteOne(document)
  .then(res => {
    console.log('Deleted document!');
  }).catch(err => console.log(err));
  
}

exports.connect = connect;
exports.getDb = getDb;
exports.closeDb = closeDb;

exports.findChore = findChore;

exports.getBookLog = getBookLog;
exports.getChorelog = getChorelog;

exports.postBookRecord = postBookRecord;
exports.postChoreRecord = postChoreRecord;
exports.deleteChoreRecord = deleteChoreRecord;
