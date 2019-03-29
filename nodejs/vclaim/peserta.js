let req = require("../helper/request");

module.exports = (serviceName, host, headers) => ({
  cariPeserta: (parameter, tanggalPelayanan) => {
    let str =
      parameter.length === 13 ? `/nokartu/${parameter}` : `/nik/${parameter}`;
    return req.get({
      path: `/${serviceName}/Peserta${str}/tglSEP/${tanggalPelayanan}`,
      host,
      headers
    });
  }
})
