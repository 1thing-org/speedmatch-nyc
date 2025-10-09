# HTML Template in Mailgun
Use https://premailer.dialect.ca/ to inline CSS

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your SpeedMatch NYC Results</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .candidate-block {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
    }
    .candidate-block:last-child {
      border-bottom: none;
    }
    .match-label {
      font-size: 1.2em;
      font-weight: bold;
    }
    .candidate-name {
      font-weight: bold;
    }
    .candidate-image {
      width: 200px;
      height: 200px;
      object-fit: cover;
    }
    ul {
      padding-left: 20px;
    }
  </style>
</head>
<body>
  <h2>Your SpeedMatch NYC Candidate Matching Results</h2>
  <p>Here are the candidates that best align with your values based on your quiz answers.</p>
  
  {{#each candidates}}
  <div class="candidate-block">
    <p class="match-label">{{matchLabel}}</p>
    <img src="{{photoUrl}}" alt="{{name}}" class="candidate-image" width="200" height="200">
    <p><strong class="candidate-name">{{name}}</strong></p>
    <p>{{party}}</p>
    <p><a href="{{website}}">{{website}}</a></p>
    <p><strong>Aligned Issues:</strong></p>
    <ul>
      {{#each alignedIssues}}
      <li>{{this}}</li>
      {{/each}}
    </ul>
  </div>
  {{/each}}

  <p>Thank you for using SpeedMatch NYC!</p>
</body>
</html>

```


Generated template:
```
<body style="font-family: Arial, sans-serif; font-size:13; line-height: 1.6; color: #333;">
{{#each candidates}}
  <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom-width: 1px; border-bottom-color: #eee; border-bottom-style: solid;">
    <p style="font-size: 1.1em; font-weight: bold;">{{matchLabel}}</p>
    <img src="{{photoUrl}}" alt="{{name}}" width="200" height="200" style="width: 200px; height: 200px; object-fit: cover;">
    <p><strong style="font-weight: bold;">{{name}}</strong></p>
    <p>{{party}}</p>
    <p><a href="{{website}}">{{website}}</a></p>
    <p><strong>Aligned Issues:</strong></p>
    <ul style="padding-left: 20px;">
      {{#each alignedIssues}}
      <li>{{this}}</li>
      {{/each}}
    </ul>
  </div>
{{/each}}
</body>
```