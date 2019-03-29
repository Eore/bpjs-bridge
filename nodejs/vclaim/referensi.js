let req = require("../helper/request");

module.exports = (serviceName, host, headers) => ({
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
});
