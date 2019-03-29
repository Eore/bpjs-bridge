let crypto = require("crypto");

let genXSignature = ({ consumerID, secretKey, timestamp }) =>
  crypto
    .createHmac("sha256", secretKey)
    .update(`${consumerID}&${timestamp}`)
    .digest("base64");

exports.genHeader = (consumerID, secretKey) => {
  let timestamp = Date.now()
    .toString()
    .substr(0, 10);
  return {
    "X-Cons-ID": consumerID,
    "X-Timestamp": timestamp,
    "X-Signature": genXSignature({ consumerID, secretKey, timestamp })
  };
};
