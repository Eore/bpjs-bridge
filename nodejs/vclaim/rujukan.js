let req = require("../helper/request");

module.exports = (serviceName, host, headers) => ({
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
})
