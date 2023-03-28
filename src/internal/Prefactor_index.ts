// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import * as express from "express";
// import * as SibApiV3Sdk from "sib-api-v3-sdk";
// import {config} from "dotenv";
// import * as cors from "cors";


// config();

// const app = express();
// admin.initializeApp();

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

// const defaultClient = SibApiV3Sdk.ApiClient.instance;
// const apiKey = defaultClient.authentications["api-key"];
// apiKey.apiKey = process.env.VITE_SENDINBLUE_API_KEY;

// const sendinblue = (sendSmtpEmail: any) => {
//   const transactionnalApiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

//   transactionnalApiInstance.sendTransacEmail(sendSmtpEmail).then(
//     function(data: any) {
//       console.log(data);
//       return true;
//     },
//     function(error: any) {
//       console.log(error);
//       return false;
//     });
// };


// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// app.post("/sendMail", async (req, res) => {
//   const sendSmtpEmail = {
//     to: [
//       {email: req.body.recipientMail},
//     ],
//     templateId: req.body.templateId,
//     params: req.body.templateParams,
//   };
//   sendinblue(sendSmtpEmail);

//   res.status(200).send({mailSent: "success"});
// });


// exports.api = functions.https.onRequest(app);

