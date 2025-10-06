import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

/*
Body: {
  "email":"email address to send to",
  "candidates": Candidate[],
}

Candidate: {
  name: string,
  photoUrl: string,
  website: string, //candidate's website
  matchLabel: string, //top match, 2nd match, etc
  party: string,
  alignedIssues: string[], // "* policies" or "policies"
}
*/

export const send_quiz_result = (req, res) => {
  const mailgun = new Mailgun(FormData);

  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "MAILGUN_API_KEY",
    // When you have an EU-domain, you must specify the endpoint:
    // url: "https://api.eu.mailgun.net"
  });

  const data = mg.messages.create("speedmatch.nyc", {
    from: "Speed Match NYC <info@speedmatch.nyc>",
    to: ["{res.body.email}"],
    subject: "Your SpeedMatch NYC Candidate Matching Results",
    template: "SpeedMatch NYC: Quiz result",
    "h:X-Mailgun-Variables": JSON.stringify({
      candidates: "{req.body.candidates}"
    }),
  }).then(msg => console.log(msg)) // logs response data;
    .catch(err => console.log(err)); // logs any error

}; 
