const fs = require('fs');
let content = fs.readFileSync('client/src/pages/admin/AdminPage.jsx', 'utf8');

// Replace type: "url" with type: "text" to allow relative paths
content = content.replace(/type\:\s*"url"/g, 'type: "text"');

fs.writeFileSync('client/src/pages/admin/AdminPage.jsx', content);
