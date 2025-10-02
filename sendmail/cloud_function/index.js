import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

const functions = require('@google-cloud/functions-framework');

functions.http('helloHttp', (req, res) => {
  const mailgun = new Mailgun(FormData);

  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "MAILGUN_API_KEY",
    // When you have an EU-domain, you must specify the endpoint:
    // url: "https://api.eu.mailgun.net"
  });

  const data = mg.messages.create("speedmatch.nyc", {
    from: "Mailgun Sandbox <postmaster@speedmatch.nyc>",
    to: ["Li Ma <lima@1thing.org>"],
    subject: "Hello Li Ma from Mailgun.js",
    template: "SpeedMatch NYC: Quiz result",
    "h:X-Mailgun-Variables": JSON.stringify({
      test: "test",
      candidate_1: "Alice",
      candidate_2: "Bob",
      candidate_3: "Charlie",
      candidate_4: "David",
    }),
  }).then(msg => console.log(msg)) // logs response data;
    .catch(err => console.log(err)); // logs any error

});
