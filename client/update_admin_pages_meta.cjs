const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'admin', 'AdminPage.jsx');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Add sidebar category
if (!code.includes('{ id: "pages_content"')) {
  code = code.replace(
    /\{ id: "dashboard",\s*label: "Dashboard",\s*icon: "dashboard" \},/,
    '{ id: "dashboard",    label: "Dashboard",           icon: "dashboard" },\n  { id: "pages_content",label: "Pages Content",       icon: "edit" },'
  );
}

// 2. Add CONTENT_TYPE_MAP
if (!code.includes('pages: "page-meta"')) {
  code = code.replace(
    /const CONTENT_TYPE_MAP = \{/,
    'const CONTENT_TYPE_MAP = {\n  pages: "page-meta",'
  );
}

// 3. Add FIELDS_MAP
if (!code.includes('pages: [')) {
  code = code.replace(
    /const FIELDS_MAP = \{/,
    'const FIELDS_MAP = {\n  pages: [\n    { key: "name",        label: "Page Identifier (e.g. about, home)", type: "text", required: true },\n    { key: "title",       label: "Title",       type: "text", required: true },\n    { key: "subtitle",    label: "Subtitle/Eyebrow", type: "text" },\n    { key: "description", label: "Description", type: "textarea" },\n    { key: "imageUrl",    label: "Image URL",   type: "text" }\n  ],'
  );
}

// 4. Add switch case
if (!code.includes('case "pages_content":')) {
  code = code.replace(
    /case "dashboard": return <DashboardSection \/>;/,
    'case "dashboard": return <DashboardSection />;\n      case "pages_content": return <CmsSection section="pages" title="Pages Metadata" />;'
  );
}

fs.writeFileSync(filePath, code);
console.log('AdminPage.jsx updated successfully.');
