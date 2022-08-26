const {MongoClient} = require('mongodb');
const url = "mongodb+srv://pippo123:iCExUAhQYgdfTIEE@subibot.igssrju.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);
const database = {}
const dbName = "subibot";
const collectionName = "items";




database.connectDb = async () => {
  try {
       await client.connect();
      
       const db = client.db(dbName);
       // Use the collection "people"
       const col = db.collection(collectionName);

       return {db: db, col: col}
      } catch (err) {
       console.log(err.stack);
   }
}

database.updateDate = async (date) => {
  try {
    const connected = await database.connectDb()                                                                                                                                                         
    let flag = {
        date : date
    }
    // Insert a single document, wait for promise so we can read it back
    const p = await connected.col.updateOne({},{$set: flag}, setTimeout(() => client.close(), 1500));
    console.log("updated");
   } catch (err) {
    console.log(err.stack);
}
finally {
   
}
}

database.getDate = async () => {
  try {
       const connected = await database.connectDb()                                                                                                                                                         
      
      
       // Find one document
       const myDoc = await connected.col.findOne();
       // Print to the console
       return myDoc.date;
      } catch (err) {
       console.log(err.stack);
   }

   finally {
      await client.close();
  }
}

database.insertDate = async () => {
  try {
        const date = new Date('2022-08-25 00:00').getTime();
        console.log(date);
       const connected = await database.connectDb()                                                                                                                                                         
       let flag = {
           date : date
       }
       // Insert a single document, wait for promise so we can read it back
       const p = await connected.col.insertOne(flag);
       // Find one document
      
      } catch (err) {
       console.log(err.stack);
   }

   finally {
      await client.close();
  }
}



module.exports = database;




