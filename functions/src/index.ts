import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as SibApiV3Sdk from "sib-api-v3-sdk";
import {config} from "dotenv";
import * as cors from "cors";
import {getAuth} from "firebase-admin/auth";
import {getDatabase} from "firebase-admin/database";

config();

const app = express();
admin.initializeApp();


// On sign up.
exports.processSignUp = functions.auth.user().onCreate(async (user) => {
  // Check if user meets role criteria.
  if (
    user.email &&
        process.env.VITE_REACT_APP_ADMINS_ARRAY &&
        process.env.VITE_REACT_APP_ADMINS_ARRAY.includes(user.email) &&
        user.emailVerified
  ) {
    const customClaims = {
      admin: true,
      accessLevel: 9,
    };

    try {
      // Set custom user claims on this newly created user.
      await getAuth().setCustomUserClaims(user.uid, customClaims);

      // Update real-time database to notify client to force refresh.
      const metadataRef = getDatabase().ref("metadata/" + user.uid);

      // Set the refresh time to the current UTC timestamp.
      // This will be captured on the client to force a token refresh.
      await metadataRef.set({refreshTime: new Date().getTime()});
    } catch (error) {
      console.log(error);
    }
  }
});

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.VITE_SENDINBLUE_API_KEY;

const sendinblue = (sendSmtpEmail: any) => {
  const transactionnalApiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  transactionnalApiInstance.sendTransacEmail(sendSmtpEmail).then(
    function(data: any) {
      console.log(data);
      return true;
    },
    function(error: any) {
      console.log(error);
      return false;
    }
  );
};

app.use(cors({origin: true}));

app.post("/sendMail", async (req, res) => {
  const sendSmtpEmail = {
    to: [{email: req.body.recipientMail}],
    templateId: req.body.templateId,
    params: req.body.templateParams,
  };
  sendinblue(sendSmtpEmail);

  res.status(200).send({mailSent: "success"});
});

app.get("/helloWorld", (request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.api = functions.https.onRequest(app);
