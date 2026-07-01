const fs = require('fs');
let content = fs.readFileSync('client/src/pages/admin/AdminPage.jsx', 'utf8');

content = content.replace(
  '{ id: "competitions", label: "Competitions",         icon: "competition" },',
  '{ id: "competitions", label: "Shows & Events",         icon: "competition" },'
);

fs.writeFileSync('client/src/pages/admin/AdminPage.jsx', content);
console.log("Renamed Competitions to Shows & Events in Admin sidebar");
