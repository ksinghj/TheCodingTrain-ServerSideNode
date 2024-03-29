const express = require("express");
const Datastore = require("nedb");

const app = express();

app.listen(3000, () => console.log("Listening at 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1000mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      console.error(err);
      return;
    }
    response.json(data);
  });
});

app.post("/api", (request, response) => {
  console.log("Request Received");
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
  //   response.json({
  //     status: "success",
  //     timestamp: timestamp,
  //     latitude: data.lat,
  //     longitude: data.lon
  //   });
});
