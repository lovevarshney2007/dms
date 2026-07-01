const fs = require('fs');
let content = fs.readFileSync('client/src/pages/HomePage.jsx', 'utf8');

if (!content.includes('import { useState, useEffect }')) {
  content = content.replace(
    'import { Link } from "react-router-dom";',
    'import { useState, useEffect } from "react";\nimport { Link } from "react-router-dom";'
  );
  fs.writeFileSync('client/src/pages/HomePage.jsx', content);
  console.log("Added useState and useEffect import");
} else {
  console.log("Import already exists");
}
