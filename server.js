var bodyParser = require("body-parser"); // handling json
const express = require("express"); // server
const cors = require("cors"); // infrastructure allowing request from/to different domains

const app = express(); // instance of the server

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

var PORT = process.env.PORT || 3000; // server port


app.post("/login", function (req, res) {
  //
  student.login(req.body.mail, req.body.pass).then((session) => {
    res.json(session);
  });
});


// server is listening
app.listen(PORT, function () {
  console.log("Server listening on " + PORT);
});
