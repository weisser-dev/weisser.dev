const fs = require('fs');
const path = require('path');
const config = require('./src/config/config.json');

const profileDataPath = path.join(__dirname, 'src', 'data', 'profileData.json');
const profileDataTemplatePath = path.join(__dirname, 'src', 'data', 'profileData.template.json');
const encodedDataPath = path.join(__dirname, 'public', 'data', 'b64ProfileData.json');

// Function to copy template to actual profile data
function createProfileFromTemplate() {
  const templateData = fs.readFileSync(profileDataTemplatePath, 'utf8');
  fs.writeFileSync(profileDataPath, templateData);
  console.log("profileData.json has been created from the template.");
}

if (config.encodeProfileData) {
  // Check if profileData.json exists, if not create it from the template
  if (!fs.existsSync(profileDataPath)) {
    createProfileFromTemplate();
  }

  const profileDataStat = fs.statSync(profileDataPath);
  let shouldEncode = true;

  // Check if b64ProfileData.json exists
  if (fs.existsSync(encodedDataPath)) {
    const encodedDataStat = fs.statSync(encodedDataPath);
    // Compare modification times
    shouldEncode = profileDataStat.mtime > encodedDataStat.mtime;
  }

  if (shouldEncode) {
    const profileData = fs.readFileSync(profileDataPath, 'utf8');
    const encodedData = Buffer.from(profileData).toString('base64');
    fs.writeFileSync(encodedDataPath, encodedData);
  } else {
    console.log("You always have a newer b64 encoded profileData.json, to overwrite please update src/data/profileData.json or remove the generated public/data/b64ProfileData.json");
  }
} else {
  console.log("Encoding of profile data is not enabled in the configuration.");
}
