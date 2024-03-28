var express = require('express');
var router = express.Router();
// var connection = require('../config/database.js');
const Model_Kapal = require('../model/Model_Kapal');
const Model_Pemilik = require('../model/Model_Pemilik');
const Model_DPI = require('../model/Model_DPI');
const Model_Alat_Tangkap = require('../model/Model_Alat_Tangkap');


router.get('/', async function (req, res, next) {
    let rows = await Model_Kapal.getAll();
    res.render('kapal/index', {
        data: rows,
        email: req.session.email
    });
});

router.get('/create', async function (req, res, next) {
    try {
        let pemilik = await Model_Pemilik.getAll();
        let dpi = await Model_DPI.getAll();
        let alat_tangkap = await Model_Alat_Tangkap.getAll();
        res.render('kapal/create', {
            dataPemilik: pemilik,
            dataDPI: dpi,
            dataAlatTangkap: alat_tangkap,
            email: req.session.email
        });
    } catch (error) {
        console.log(error);
        req.flash('error', 'Terjadi kesalahan pada server');
        res.redirect('/kapal');
    }
});


router.post('/store', async function (req, res, next) {
    try {
        let { nama_kapal, id_pemilik, id_dpi, id_alat_tangkap } = req.body;
        let Data = {
            nama_kapal,
            id_pemilik,
            id_dpi,
            id_alat_tangkap,
            email: req.session.email
        }
        await Model_Kapal.Store(Data);
        req.flash('success', 'Berhasil menyimpan data');
        res.redirect('/kapal');
    } catch {
        req.flash('error', 'Terjadi kesalahan pada fungsi')
        res.redirect('/kapal')
    }
})

router.get('/edit/(:id)', async function (req, res, next) {
    let id = req.params.id;
    let pemilik = await Model_Pemilik.getAll();
    let dpi = await Model_DPI.getAll();
    let alat_tangkap = await Model_Alat_Tangkap.getAll();
    let rows = await Model_Kapal.getId(id);
    res.render('kapal/edit', {
        id: rows[0].id_kapal,
        nama_kapal: rows[0].nama_kapal,
        id_pemilik: rows[0].id_pemilik,
        id_alat_tangkap: rows[0].id_alat_tangkap,
        id_dpi: rows[0].id_dpi,
        data_pemilik: pemilik,
        data_dpi: dpi,
        data_alat_tangkap: alat_tangkap,
        email: req.session.email
    })
})



router.post('/update/(:id)', async function (req, res, next) {
    try {
        let id = req.params.id;
        let { nama_kapal, id_pemilik, id_dpi, id_alat_tangkap } = req.body;
        let Data = {
            nama_kapal: nama_kapal,
            id_pemilik: id_pemilik,
            id_dpi: id_dpi,
            id_alat_tangkap: id_alat_tangkap,
            email: req.session.email
        }
        await Model_Kapal.Update(id, Data);
        req.flash('success', 'Berhasil mengubah data');
        res.redirect('/kapal')
    } catch {
        req.flash('error', 'terjadi kesalahan pada fungsi');
        res.render('/kapal');
    }
})

router.get('/delete/(:id)', async function (req, res) {
    let id = req.params.id;
    await Model_Kapal.Delete(id);
    req.flash('success', 'Berhasil menghapus data');
    res.redirect('/kapal')
})

module.exports = router;