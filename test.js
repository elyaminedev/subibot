const {MongoClient, ObjectId} = require('mongodb');
const url = "mongodb+srv://pippo123:iCExUAhQYgdfTIEE@subibot.igssrju.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);
const database = {}
const dbName = "subibot";
const collectionName = "items";

const request = require('request');


database.connectDb = async () => {
  try {
       await client.connect();
       console.log("Connected correctly to server");
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
       const p = await connected.col.updateOne({_id:ObjectId("6307449bf59d5c37b0fb42d6")},{$set: flag}, {upsert: true}, setTimeout(() => {client.close()}, 1500));
       console.log("updated");
      } catch (err) {
       // console.log(err.stack);
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
       return myDoc;
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



    debugger;
    const productName = "iphone"
    const productPrice = 100
    
    request("https://www.subito.it/hades/v1/search/items?q="+productName+"&c=12&t=s&qso=false&shp=false&sort=datedesc&lim=30&start=0", function (error, response, body) {
          var listing = JSON.parse(body)
          let ads = listing.ads;
          const oldDate = database.getDate();
        
    for(const adItem of ads)
    {
    
      const currentDate = new Date(adItem.dates.display).getTime()
      if(adItem.features[adItem.features.length-1].values[0].key <= productPrice || new Date(adItem.dates.display).getTime() > oldDate)
      {
        console.log("AOOOOO")
        database.updateDate(currentDate);
        
      }
          
    }
    });
    




