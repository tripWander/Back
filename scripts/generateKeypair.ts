import crypto from "crypto";
import fs from "fs";


function generateKeypair() {
  crypto.generateKeyPair("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem"
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem"
    }
  }, (err: Error, publicKey: string, privateKey: string) => {
    if (err) throw err;
    fs.writeFileSync(`${__dirname}/../id_rsa_pub.pem`, publicKey);
    fs.writeFileSync(`${__dirname}/../id_rsa_priv.pem`, privateKey);
  });

}

generateKeypair();