/**
 * @typedef {Object} t_sep
 * @property {String} t_sep.noKartu Nomor kartu BPJS
 * @property {String} t_sep.tglSEP Tanggal penerbitan SEP (yyyy-mm-dd)
 * @property {String} t_sep.ppkPelayanan Kode faskes pemberi pelayanan
 * @property {Number} t_sep.jnsPelayanan Jenis pelayanan:
 * 1. Rawat Inap
 * 2. Rawat Jalan
 * @property {Number} t_sep.klsRawat Kelas rawat:
 * 1. Kelas 1
 * 2. Kelas 2
 * 3. Kelas 3
 * @property {String} t_sep.noMR Nomor rekam medis pada rumah sakit
 * @property {Object} t_sep.rujukan
 * @property {String} t_sep.rujukan.asalRujukan Asal rujukan:
 * 1. Faskes Pertama
 * 2. Rumah Sakit
 * @property {String} t_sep.rujukan.tglRujukan Tanggal rujukan (yyyy-mm-dd)
 * @property {String} t_sep.rujukan.noRujukan Nomor rujukan
 * @property {String} t_sep.rujukan.ppkRujukan Kode fasilitas kesehatan rujukan
 * @property {String} t_sep.catatan Catatan peserta
 * @property {String} t_sep.diagAwal Diagnosa awal menurut ICD-10
 * @property {Object} t_sep.poli
 * @property {String} t_sep.poli.tujuan Kode poli tujuan
 * @property {Number} t_sep.poli.eksekutif Poli eksekutif?
 * 0. Tidak
 * 1. Ya
 * @property {Object} t_sep.cob
 * @property {Number} t_sep.cob.cob COB?
 * 0. Tidak
 * 1. Ya
 * @property {Object} t_sep.katarak
 * @property {Number} t_sep.katarak.katarak Katarak?
 * 0. Tidak
 * 1. Ya
 * @property {Object} t_sep.jaminan
 * @property {Number} t_sep.jaminan.lakaLantas Kecelakaan lalu lintas?
 * 0. Tidak
 * 1. Ya
 * @property {Object} t_sep.jaminan.penjamin
 * @property {String} t_sep.jaminan.penjamin.penjamin Penjamin kecelakaan lalu lintas (jika lebih dari 1 gunakan delimiter koma ',')
 * 1. Jasa Raharja
 * 2. BPJS Ketenagakerjaan
 * 3. PT. TASPEN
 * 4. PT. ASABARI
 * @property {String} t_sep.jaminan.penjamin.tglKejadian Tanggal kejadian kecelakaan (yyyy-mm-dd)
 * @property {String} t_sep.jaminan.penjamin.keterangan Keterangan kejadian kecelakaan
 * @property {Object} t_sep.jaminan.penjamin.suplesi
 * @property {String} t_sep.jaminan.penjamin.suplesi.suplesi Suplesi?
 * 0. Tidak
 * 1. Ya
 * @property {String} t_sep.jaminan.penjamin.suplesi.noSepSuplesi Nomor SEP yang terdapat suplesi
 * @property {Object} t_sep.jaminan.penjamin.lokasiLaka
 * @property {String} t_sep.jaminan.penjamin.lokasiLaka.kdPropinsi Kode propinsi
 * @property {String} t_sep.jaminan.penjamin.lokasiLaka.kdKabupaten Kode kabupaten
 * @property {String} t_sep.jaminan.penjamin.lokasiLaka.kdKecamatan Kode kecamatan
 * @property {Object} t_sep.skdp
 * @property {String} t_sep.skdp.noSurat Nomor surat kontrol
 * @property {String} t_sep.skdp.kodeDPJP Kode dokter DPJP
 * @property {String} t_sep.noTelp Nomor telepon
 * @property {String} t_sep.user User pembuat SEP
 */

/**
 * @typedef {Object} t_rujukan
 * @property {String} t_rujukan.noSep Nomor SEP
 * @property {String} t_rujukan.tglRujukan Tanggal rujukan (yyyy-mm-dd)
 * @property {String} t_rujukan.ppkDirujuk Faskes yang dirujuk
 * @property {Number} t_rujukan.jnsPelayanan Jenis pelayanan:
 * 1. Rawat Inap
 * 2. Rawat Jalan
 * @property {String} t_rujukan.catatan Catatan rujukan
 * @property {String} t_rujukan.diagRujukan Kode diagnosa rujukan
 * @property {Number} t_rujukan.tipeRujukan Tipe Rujukan:
 * 0. Penuh
 * 1. Partial
 * 2. Rujuk Balik
 * @property {String} t_rujukan.poliRujukan Kode poli rujukan
 * @property {String} t_rujukan.user User pemakai
 */

const { genHeader } = require("../helper/genHeader");
const { baseURL, consumerID, secretKey } = require("./config.json");

const headers = genHeader(consumerID, secretKey);

const referensi = require("./vclaim/referensi")(
  "vclaim-rest",
  baseURL,
  headers
);
const peserta = require("./vclaim/peserta")("vclaim-rest", baseURL, headers);
const sep = require("./vclaim/sep")("vclaim-rest", baseURL, headers);

module.exports = {
  referensi: {
    /**
     * Pencarian data diagnosa (ICD-10)
     * @param {String} parameter Kode atau nama diagnosa diagnosa berdasarkan ICD-10
     */
    diagnosa: parameter => referensi.diagnosa(parameter),

    /**
     * Pencarian data poli
     * @param {String} parameter Kode atau nama poli
     */
    poli: parameter => referensi.poli(parameter),

    /**
     * Pencarian data fasilitas kesehatan
     * @param {String} parameter Kode atau nama fasilitas kesehatan
     * @param {number} jenisFaskes Kode jenis fasilitas kesehatan:
     * 1. Faskes Pertama
     * 2. Rumah Sakit
     */
    fasilitasKesehatan: (parameter, jenisFaskes) =>
      referensi.fasilitasKesehatan(parameter, jenisFaskes),

    /**
     * Pencarian data dokter DPJP
     * @param {number} jenisPelayanan Kode jenis pelayanan:
     * 1. Rawat Inap
     * 2. Rawat Jalan
     * @param {String} tanggalPelayanan Tanggal pelayanan atau SEP (yyyy-mm-dd)
     * @param {String} kodeSpesialis Kode spesialis atau subspesialis
     */
    dokterDPJP: (jenisPelayanan, tanggalPelayanan, kodeSpesialis) =>
      referensi.dokterDPJP(jenisPelayanan, tanggalPelayanan, kodeSpesialis),

    /**
     * Pencarian data propinsi
     */
    propinsi: () => referensi.propinsi(),

    /**
     * Pencarian data kabupaten
     * @param {String} propinsi Nama propinsi yang akan dicari list kabupatennya
     */
    kabupaten: propinsi => referensi.kabupaten(propinsi),

    /**
     * Pencarian data kecamatan
     * @param {String} kabupaten Nama kabupaten yang akan dicari list kecamatannya
     */
    kecamatan: kabupaten => referensi.kecamatan(kabupaten)
  },
  peserta: {
    /**
     * Pencarian data peserta BPJS Kesehatan
     * @param {String} parameter Nomor BPJS atau nik peserta
     * @param {String} tanggalPelayanan Tanggal pelayanan atau SEP (yyyy-mm-dd)
     */
    cariPeserta: (parameter, tanggalPelayanan) =>
      peserta.cariPeserta(parameter, tanggalPelayanan)
  },

  sep: {
    /**
     * Melihat data detail SEP Peserta
     * @param {String} nomorSEP Nomor SEP peserta
     */
    cariSEP: nomorSEP => sep.cariSEP(nomorSEP),

    /**
     * Insert SEP versi 1.1
     * @param {t_sep} t_sep
     */
    insertSEP: t_sep => sep.insertSEP(t_sep),

    hapusSEP: () => {},

    /**
     * Hapus SEP versi 1.1
     * @param {t_sep} t_sep
     */
    updateSEP: t_sep => {}
  },
  rujukan: {
    cariRujukan: () => {},

    /**
     * Insert rujukan
     * @param {t_rujukan} t_rujukan
     */
    insertRujukan: t_rujukan => {},

    /**
     * Update rujukan
     * @param {t_rujukan} t_rujukan
     */
    updateRujukan: () => {},
    hapusRujukan: () => {}
  },
  lembarPengajuanKlaim: {},
  monitoring: {}
};
