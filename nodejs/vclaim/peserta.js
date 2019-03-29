let { genHeader } = require("../helper/genHeader");
let req = require("../helper/request");
let { serviceName, consumerID, secretKey } = require("./config.json");
let { baseURL } = require("../config.json");

let host = baseURL;
let headers = genHeader(consumerID, secretKey);

module.exports = {
  cariPeserta: (parameter, tanggalPelayanan) => {
    let str =
      parameter.length === 13 ? `/nokartu/${parameter}` : `/nik/${parameter}`;
    return req.get({
      path: `/${serviceName}/Peserta${str}/tglSEP/${tanggalPelayanan}`,
      host,
      headers
    });
  }
};
