const fs = require('fs');
let content = fs.readFileSync('client/src/pages/HomePage.jsx', 'utf8');

// Remove the Success Stories section
content = content.replace(
  /\{\/\*\ 5\.\ Success\ Stories\ \*\/\}.*?<\/section>/s,
  ''
);

fs.writeFileSync('client/src/pages/HomePage.jsx', content);
console.log("Success stories removed.");
