let https = require("https");

let req = (method, { host, path, headers }, data) =>
  new Promise((resolve, reject) => {
    let req = https.request(
      {
        host,
        path,
        method,
        headers
      },
      res => {
        let data = [];
        res.on("data", chunk => data.push(chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data.join("")));
          } catch (err) {
            resolve(data.join(""));
          }
        });
        res.on("error", err => reject(err));
      }
    );

    req.write(JSON.stringify(data));
    req.end();
  });

module.exports = {
  get: ({ host, path, headers }) =>
    new Promise((resolve, reject) => {
      https.get(
        {
          host,
          path,
          headers
        },
        res => {
          let data = [];
          res.on("data", chunk => data.push(chunk));
          res.on("end", () => {
            try {
              resolve(JSON.parse(data.join("")));
            } catch (err) {
              resolve(data.join(""));
            }
          });
          res.on("error", err => reject(err));
        }
      );
    }),

  post: ({ host, path, headers }, data) =>
    req("POST", { host, path, headers }, data),

  put: ({ host, path, headers }, data) =>
    req("PUT", { host, path, headers }, data),

  delete: ({ host, path, headers }, data) =>
    req("DELETE", { host, path, headers }, data)
};
