To develop and test locally:
Run:

`npm install @google-cloud/functions-framework`

then
```
export MAILGUN_API_KEY=<Mail gun API key>
npx @google-cloud/functions-framework --target=send_quiz_result
```
