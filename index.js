"use strict";
const express = require("express"),
  bodyParser = require("body-parser"),
  app = express().use(bodyParser.json());

app.listen(process.env.PORT || 3000, () => console.log("webhook is listening"));

app.post("/", (req, res) => {
  let body = req.body;
  if (body.object === "page") {
    body.entry.forEach(function (entry) {
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

    res.status(200).send("EVENT_RECIEVED");
  } else {
    res.sendStatus(404);
  }
});
app.get("/", (req, res) => {
  let VT = "abcd1234";

  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VT) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});
// app.use((req, res) => {
//   res.status(404);
//   res.setHeader("Content-Type", "text/html");
//   res.end("Something went wrong");
// });
