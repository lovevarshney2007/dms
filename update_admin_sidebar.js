const fs = require('fs');
let content = fs.readFileSync('client/src/pages/admin/AdminPage.jsx', 'utf8');

// 1. Update NAV_ITEMS
content = content.replace(
  /const NAV_ITEMS = \[[\s\S]*?\];/,
  `const NAV_ITEMS = [
  { id: "dashboard",    label: "Dashboard",           icon: "dashboard" },
  { id: "home",         label: "Home Page",           icon: "gallery" },
  { id: "competitions", label: "Competitions Page",   icon: "competition" },
  { id: "shows",        label: "Shows Page",          icon: "videos" },
  { id: "talents",      label: "Success Stories Page",icon: "stories" },
  { id: "gallery_page", label: "Gallery Page",        icon: "gallery" },
  { id: "contact",      label: "Contact Page",        icon: "queries" },
  { id: "settings",     label: "Website Settings",    icon: "settings" }
];`
);

// 2. Update CmsSection signature
content = content.replace(
  'function CmsSection({ section }) {',
  'function CmsSection({ section, title }) {'
);

// 3. Update CmsSection title rendering
content = content.replace(
  '<h2 className="admin-section-title">{NAV_ITEMS.find(n => n.id === section)?.label}</h2>',
  '<h2 className="admin-section-title">{title || section}</h2>'
);

// 4. Update renderContent in AdminPage
content = content.replace(
  /function renderContent\(\) \{[\s\S]*?return null;\n    \}/,
  `function renderContent() {
      switch (active) {
        case "dashboard": return <DashboardSection />;
        case "home":
          return (
            <div className="space-y-12">
              <CmsSection section="patrons" title="Patrons & Mentors" />
              <CmsSection section="sponsors" title="Sponsors" />
              <CmsSection section="testimonials" title="Testimonials" />
            </div>
          );
        case "competitions":
          return <CmsSection section="seasons" title="Voice of Delhi NCR Seasons" />;
        case "shows":
          return <CmsSection section="competitions" title="Shows & Events" />;
        case "talents":
          return (
            <div className="space-y-12">
              <ContestantsSection />
              <CmsSection section="stories" title="Success Stories" />
            </div>
          );
        case "gallery_page":
          return (
            <div className="space-y-12">
              <CmsSection section="gallery" title="Gallery (Photos & Videos)" />
              <CmsSection section="videos" title="Other Video Links" />
            </div>
          );
        case "contact":
          return <QueriesSection />;
        case "settings":
          return <SettingsSection />;
        default:
          return null;
      }
    }`
);

fs.writeFileSync('client/src/pages/admin/AdminPage.jsx', content);
console.log("Updated AdminPage.jsx sidebar layout");
