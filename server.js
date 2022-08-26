var db = require("./db"); // db object
var bodyParser = require("body-parser"); // handling json
const express = require("express"); // server
const cors = require("cors"); // infrastructure allowing request from/to different domains
const request = require('request');
const app = express(); // instance of the server

var timeout = require('connect-timeout');


app.use(timeout(1200000));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

var PORT = process.env.PORT || 3000; // server port


app.get("/", function (req, res) {
});


app.get("/getNotification/:productName/:productPrice", function(req, res){

const productName = req.params.productName
const productPrice = req.params.productPrice
let ads = []
var outcomeResponse = {}
try {
  request("https://www.subito.it/hades/v1/search/items?q="+productName+"&c=12&t=s&qso=false&shp=false&sort=datedesc&lim=30&start=0", function (error, response, body) {
          var listing = JSON.parse(body)
          let ads = listing.ads;
          var oldDate;
          db.getDate().then(async (value) => {oldDate = await value         
          let outcome = false;
          for(const adItem of ads)
          {
            const newDate = new Date(adItem.dates.display).getTime()
            console.log(newDate + " "+ oldDate)
            if(parseInt(adItem.features[adItem.features.length-1].values[0].key) <= parseInt(productPrice) && newDate > oldDate)
            {       
              outcome = true;
              db.updateDate(newDate);   
              break; 
            }
          }
          res.json({outcome: outcome})                       
    })        
  }
)
} catch (error) {
  
}

});


// server is listening
app.listen(PORT, function () {
  console.log("Server listening on " + PORT);
});
