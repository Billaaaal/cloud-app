import express from "express";
import admin from "firebase-admin";
import {
  readdirSync,
  rmSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  renameSync,
  createReadStream
} from "fs";
import { zip } from "zip-a-folder";
import crypto from "crypto";

var router = express.Router();

var serviceAccount = require("../../credentials.json");

router.use(express.json());

router.get("/", (req, res) => {
  const idToken = req.headers.authorization!.split(" ")[1];

  const path = req.headers.path;

  const type = req.headers.type;

  var name = req.headers.name;

  console.log("Let's download a file...");

  if (!idToken) {
    res.status(400).json({ message: `Error` }).send();
  } else {
    //console.log("Verifying token...")

    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;

        if (type === "folder") {
          if (!existsSync("./temp")) {
            mkdirSync("./temp");
          }
          const tempPath =
            "./temp/" + crypto.randomBytes(4).readUInt32LE(0) + ".zip";

          zip("./files_folder/" + uid + path, tempPath).then(() => {
            //res.download(tempPath, () => {
            //  rmSync(tempPath);
            //});
            const stream = createReadStream(tempPath);

            //res.setHeader("Content-Type", "application/pdf");
            //res.setHeader("Content-Disposition", 'inline; filename="js.pdf"');

            res.setHeader("Content-Type", "application/zip");
            res.setHeader(
              "Content-Disposition",
              `inline; filename="${name}.zip}"`
            );


            stream.pipe(res);
          });
        } else {

          const stream = createReadStream("./files_folder/" + uid + path);

          //res.setHeader("Content-Type", "application/pdf");
          //res.setHeader("Content-Disposition", 'inline; filename="js.pdf"');

          res.setHeader("Content-Type", "application/zip"); /////////////
          res.setHeader(
            "Content-Disposition",
            `inline; filename="${name}"`
          );

          stream.pipe(res);
         
          //console.log("Downloading file..." + "./files_folder/" + uid + path);
          //res.download("./files_folder/" + uid + path);
        }

        //return res.json({ message: `Welcome, this is the backend ${decodedToken.email}` });
        //createNewUser(uid)

        //createFolderInDB(uid, path, folderName);

        //var db = admin.database();
        //for realtime database

        //var pathToElement = "users/" + uid + path.replace(".", ",");

        //console.log("Welcome " + decodedToken.email)
      })
      .catch((error) => {
        // Handle error

        res.status(400).json({ message: `Error` }).send();

        //console.log(error);
      });
  }
});

export default router;
