let { genHeader } = require("../helper/genHeader");
let req = require("../helper/request");
let { serviceName, consumerID, secretKey } = require("./config.json");
let { baseURL } = require("../config.json");

let host = baseURL;
let headers = genHeader(consumerID, secretKey);

module.exports = {
  cariRujukan: nomorKartu =>
    req.get({
      path: `/${serviceName}/Rujukan/RS/List/Peserta/${nomorKartu}`,
      host,
      headers
    }),

  insertRujukan: (
    t_rujukan = {
      noSEP,
      tglRujukan,
      ppkDirujuk,
      jnsPelayanan,
      catatan,
      diagRujukan,
      tipeRujukan,
      poliRujukan,
      user
    }
  ) =>
    req.post(
      {
        path: `/${serviceName}/Rujukan/insert`,
        host,
        headers
      },
      { request: { t_rujukan } }
    ),

  updateRujukan: (
    t_rujukan = {
      noRujukan,
      ppkDirujuk,
      tipe,
      jnsPelayanan,
      catatan,
      diagRujukan,
      tipeRujukan,
      poliRujukan,
      user
    }
  ) =>
    req.put(
      {
        path: `/${serviceName}/Rujukan/update`,
        host,
        headers
      },
      { request: { t_rujukan } }
    ),

  deleteRujukan: (
    t_rujukan = {
      noRujukan,
      user
    }
  ) =>
    req.delete(
      {
        path: `/${serviceName}/Rujukan/delete`,
        host,
        headers
      },
      { request: { t_rujukan } }
    )
};
