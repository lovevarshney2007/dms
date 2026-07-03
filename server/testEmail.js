require("dotenv").config({ path: __dirname + "/.env" });
const { sendRegistrationEmail } = require("./src/services/emailService");

async function testEmail() {
  try {
    console.log("Sending email...");
    await sendRegistrationEmail({
      name: "Test User",
      email: "job4lovevarshney@gmail.com", // Sending to the same email just to test
      formType: "talent-show"
    });
    console.log("Email sent successfully!");
  } catch (err) {
    console.error("Error sending email:", err);
  }
}

testEmail();
