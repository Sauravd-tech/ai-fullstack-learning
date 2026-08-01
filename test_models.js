const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const match = env.match(/GEMINI_API_KEY=\"?([^\"]+)\"?/);
if (match) {
  const key = match[1];
  fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + key)
    .then(res => res.json())
    .then(data => {
      console.log(data.models.map(m => m.name).join('\n'));
    })
    .catch(console.error);
}
