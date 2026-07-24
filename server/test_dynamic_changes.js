const http = require('http');

const PORT = 5051;
const API_URL = `http://127.0.0.1:${PORT}`;
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'admin';

async function fetchAPI(endpoint, options = {}) {
  const customHeaders = { 'Content-Type': 'application/json', ...options.headers };
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: customHeaders
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || `Request failed with status ${res.status}`);
  return data;
}

async function runTests() {
  console.log("===============================================");
  console.log("   DYNAMIC DATA CHANGES TEST - ADMIN PANEL     ");
  console.log("===============================================\n");

  try {
    // 1. Fetch current settings
    console.log("[1] Client Website: Fetching current website settings...");
    const initialSettings = await fetchAPI('/api/content/website-setting');
    let testSetting = initialSettings.find(s => s.settingKey === 'heroAnnouncement');
    const oldAnnouncement = testSetting ? testSetting.settingValue : 'Not found';
    console.log(`    Current 'heroAnnouncement': "${oldAnnouncement}"`);

    // 2. Login as admin
    console.log("\n[2] Admin Panel: Logging in as admin...");
    const loginData = await fetchAPI('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
    });
    const token = loginData.token;
    console.log(`    Login successful. Token received.`);

    // 3. Update the setting via Admin API
    const newAnnouncement = `Dynamic Test Announcement ${Date.now()}`;
    console.log(`\n[3] Admin Panel: Changing 'heroAnnouncement' to: "${newAnnouncement}"...`);
    
    if (testSetting && testSetting._id) {
      await fetchAPI(`/api/admin/content/${testSetting._id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ settingKey: 'heroAnnouncement', settingValue: newAnnouncement, type: 'website-setting' })
      });
    } else {
      await fetchAPI('/api/admin/content/website-setting', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ settingKey: 'heroAnnouncement', settingValue: newAnnouncement, type: 'website-setting' })
      });
    }
    console.log(`    Change saved successfully in database.`);

    // 4. Fetch settings again
    console.log("\n[4] Client Website: Refreshing page and fetching settings again...");
    const updatedSettings = await fetchAPI('/api/content/website-setting');
    const newTestSetting = updatedSettings.find(s => s.settingKey === 'heroAnnouncement');
    console.log(`    New 'heroAnnouncement': "${newTestSetting ? newTestSetting.settingValue : 'Not found'}"`);

    // 5. Verify the change
    console.log("\n===============================================");
    if (newTestSetting && newTestSetting.settingValue === newAnnouncement) {
      console.log("✅ TEST PASSED: Admin panel dynamically changed the website data!");
    } else {
      console.log("❌ TEST FAILED: Data did not change dynamically.");
    }
    console.log("===============================================");
    
    // 6. Restore old setting
    console.log("\n[5] Restoring original setting...");
    if (testSetting && testSetting._id) {
        await fetchAPI(`/api/admin/content/${testSetting._id}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ settingKey: 'heroAnnouncement', settingValue: oldAnnouncement, type: 'website-setting' })
        });
    }

  } catch (err) {
    console.error("Test Error:", err.message);
  }
}

runTests();
