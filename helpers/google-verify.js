const { OAuth2Client } = require("google-auth-library");
const clientId = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(clientId);

async function googleVerify(token = "") {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientId,
  });
  const { name, picture, email } = ticket.getPayload();

  return {
    name,
    picture,
    email,
  };
}

module.exports = {
  googleVerify,
};
