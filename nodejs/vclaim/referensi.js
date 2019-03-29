let { genHeader } = require("../helper/genHeader");
let req = require("../helper/request");
let { serviceName, consumerID, secretKey } = require("./config.json");
let { baseURL } = require("../config.json");

let host = baseURL;
let headers = genHeader(consumerID, secretKey);

module.exports = {
  diagnosa: parameter =>
    req.get({
      path: `/${serviceName}/referensi/diagnosa/${parameter}`,
      host,
      headers
    }),
  poli: parameter =>
    req.get({
      path: `/${serviceName}/referensi/poli/${parameter}`,
      host,
      headers
    }),

  fasilitasKesehatan: (parameter, jenisFaskes) =>
    req.get({
      path: `/${serviceName}/referensi/faskes/${parameter}/${jenisFaskes}`,
      host,
      headers
    }),

  dokterDPJP: (jenisPelayanan, tanggalPelayanan, kodeSpesialis) =>
    req.get({
      path: `/${serviceName}/referensi/dokter/pelayanan/${jenisPelayanan}/tglPelayanan/${tanggalPelayanan}/Spesialis/${kodeSpesialis}`,
      host,
      headers
    }),

  propinsi: () =>
    req.get({ path: `/${serviceName}/referensi/propinsi`, host, headers }),

  kabupaten: propinsi =>
    req.get({
      path: `/${serviceName}/referensi/kabupaten/propinsi/${propinsi}`,
      host,
      headers
    }),

  kecamatan: kabupaten =>
    req.get({
      path: `/${serviceName}/referensi/kecamatan/kabupaten/${kabupaten}`,
      host,
      headers
    })
};
