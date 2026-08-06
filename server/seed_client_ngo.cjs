/**
 * seed_client_ngo.cjs
 * Seeds NGO team members, hero slides, initiative content, and sample gallery
 * images into the CLIENT MongoDB database.
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Not available here but we don't need it because we don't have Admin model. Oh wait!

// Let's just create the admin without bcrypt if it's an issue, wait, no, the NGO server uses bcryptjs, so I need to hash the password.
// Let's use crypto module from Node.js or simply install bcryptjs locally in DMS-main/server temporarily.
