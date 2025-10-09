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
  // Set CORS headers for all responses
  // Use '*' to allow any domain, or replace with a specific domain:
  // e.g., 'https://my-frontend-app.com'
  res.set('Access-Control-Allow-Origin', '*'); 

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    // Customize these headers based on what your client needs
    res.set('Access-Control-Allow-Methods', 'POST'); 
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    // Send 204 status to indicate the preflight request succeeded
    res.status(204).send(''); 
    return;
  }
  
  const mailgun = new Mailgun(FormData);

  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "MAILGUN_API_KEY",
    // When you have an EU-domain, you must specify the endpoint:
    // url: "https://api.eu.mailgun.net"
  });

  console.log("Sending email to", req.body.email);
  console.log("With candidates", req.body.candidates);
  const data = mg.messages.create("speedmatch.nyc", {
    from: "Speed Match NYC <info@speedmatch.nyc>",
    to: [req.body.email],
    subject: "Your SpeedMatch NYC Candidate Matching Results",
    template: "SpeedMatch NYC: Quiz result",
    "h:X-Mailgun-Variables": JSON.stringify({
      candidates: req.body.candidates
    }),
  }).then(msg => {
      console.log(msg); // logs response data
      res.status(200).send('Email sent successfully.');
    }) 
    .catch(err => {
      console.error(err); // logs any error
      res.status(500).send('Failed to send email.');
    });

};
