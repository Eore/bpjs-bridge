const req = require("../helper/request");

module.exports = (serviceName, host, headers) => ({
  cariSEP: nomorSEP =>
    req.get({
      path: `/${serviceName}/SEP/${nomorSEP}`,
      host,
      headers
    }),

  insertSEP: (
    t_sep = {
      noKartu,
      tglSep,
      ppkPelayanan,
      jnsPelayanan,
      klsRawat,
      noMR,
      rujukan: { asalRujukan, tglRujukan, noRujukan, ppkRujukan },
      catatan,
      diagAwal,
      poli: { tujuan, eksekutif },
      cob: { cob },
      katarak: { katarak },
      jaminan: {
        lakaLantas,
        penjamin: {
          penjamin,
          tglKejadian,
          keterangan,
          suplesi: {
            suplesi,
            noSepSuplesi,
            lokasiLaka: { kdPropinsi, kdKabupaten, kdKecamatan }
          }
        }
      },
      skdp: { noSurat, kodeDPJP },
      noTelp,
      user
    }
  ) =>
    req.post(
      {
        path: `/${serviceName}/SEP/1.1/insert`,
        host,
        headers
      },
      { request: { t_sep } }
    ),

  updateSEP: t_sep =>
    req.put(
      {
        path: `/${serviceName}/SEP/1.1/Update`,
        host,
        headers
      },
      { request: { t_sep } }
    ),

  hapusSEP: (t_sep = { noSEP, user }) =>
    req.delete(
      {
        path: `/${serviceName}/SEP/Delete`,
        host,
        headers
      },
      { request: { t_sep } }
    )
});
