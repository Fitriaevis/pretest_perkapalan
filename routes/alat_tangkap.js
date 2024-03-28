var express = require('express');
var router = express.Router();
// var connection = require('../config/database.js');
const Model_Alat_Tangkap = require('../model/Model_Alat_Tangkap');

router.get('/', async function(req, res, next){
    let rows = await Model_Alat_Tangkap.getAll();
    res.render('alat_tangkap/index',{
        data: rows,
        email: req.session.email
    })
})

router.get('/create', function(req, res, next) {
    res.render('alat_tangkap/create', { 
      nama_alat_tangkap: '',
      email: req.session.email
    });
  });

router.post('/store', async function(req,res,next){
    try{
        let {nama_alat_tangkap} = req.body;
        let Data = {
            nama_alat_tangkap,
            email: req.session.email
        }
        await Model_Alat_Tangkap.Store(Data);
        req.flash('success', 'Berhasil Menyimpan Data!');
        res.redirect('/alat_tangkap');
    }catch{
        req.flash('error', 'Terjadi kesalahan pada penyimpanan data')
        req.redirect('/alat_tangkap');
    }
})

router.get('/edit/(:id)', async function(req,res, next){
    let id_alat_tangkap = req.params.id;
    let rows = await Model_Alat_Tangkap.getId(id_alat_tangkap);
    res.render('alat_tangkap/edit', {
        id_alat_tangkap: rows[0].id_alat_tangkap,
        nama_alat_tangkap: rows[0].nama_alat_tangkap,
        email: req.session.email
    })
})

router.post('/update/(:id)', async function(req,res, next){
    try{
        let id_alat_tangkap = req.params.id;
        let {nama_alat_tangkap} = req.body;
        let Data = {
            nama_alat_tangkap,
            email: req.session.email
        }
        await Model_Alat_Tangkap.Update(id_alat_tangkap, Data);
        req.flash('success', 'Berhasil memperbarui data!')
        res.redirect('/alat_tangkap');
    } catch{
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.render('/alat_tangkap');
    }
})

router.get('/delete/(:id)', async function(req, res, next){
    let id = req.params.id;
    await Model_Alat_Tangkap.Delete(id);
    req.flash('success', 'Berhasil menghapus data!')
    res.redirect('/alat_tangkap');
})

module.exports = router;