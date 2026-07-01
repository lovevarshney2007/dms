const fs = require('fs');
let content = fs.readFileSync('client/src/pages/admin/AdminPage.jsx', 'utf8');

// Ensure CONTENT_TYPE_MAP has qualified-contestant mapped to contestants
content = content.replace(
  'seasons:      "season",',
  'seasons:      "season",\n  contestants:  "qualified-contestant",'
); // This might already be there, but let's make sure by rewriting the whole block if possible, or just updating NAV_ITEMS.

// Let's rewrite NAV_ITEMS
content = content.replace(
  /const NAV_ITEMS = \[[\s\S]*?\];/,
  `const NAV_ITEMS = [
  { id: "dashboard",    label: "Dashboard",           icon: "dashboard" },
  { id: "home",         label: "Home Page",           icon: "patrons" },
  { id: "competitions", label: "Competitions Page",   icon: "competition" },
  { id: "shows",        label: "Shows Page",          icon: "videos" },
  { id: "talents",      label: "Success Stories Page",icon: "stories" },
  { id: "gallery_page", label: "Gallery Page",        icon: "gallery" },
  { id: "contact",      label: "Contact Page",        icon: "queries" },
  { id: "registrations",label: "Join Us (Registrations)", icon: "contestants" },
  { id: "settings",     label: "Website Settings",    icon: "settings" }
];`
);

// Fix renderContent
content = content.replace(
  /function renderContent\(\) \{[\s\S]*?return null;\n      \}\n    \}/,
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
              <CmsSection section="contestants" title="Qualified Contestants" />
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
        case "registrations":
          return <ContestantsSection />; // This actually renders the registrations table
        case "settings":
          return <SettingsSection />;
        default:
          return null;
      }
    }`
);

fs.writeFileSync('client/src/pages/admin/AdminPage.jsx', content);
console.log("Updated AdminPage.jsx sidebar layout and sections properly.");
