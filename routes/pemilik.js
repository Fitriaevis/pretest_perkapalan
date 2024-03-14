var express = require('express');
var router = express.Router();
// var connection = require('../config/database.js');
const Model_Pemilik = require('../model/Model_Pemilik');

router.get('/', async function(req, res, next){
    let rows = await Model_Pemilik.getAll();
    res.render('pemilik/index',{
        data: rows
    })
})

router.get('/create', function(req, res, next) {
    res.render('pemilik/create', { 
      nama_pemilik: '', 
      alamat: '', 
      no_hp: '', 
    });
  });

router.post('/store', async function(req,res,next){
    try{
        let {nama_pemilik, alamat, no_hp} = req.body;
        let Data = {
            nama_pemilik, alamat, no_hp
        }
        await Model_Pemilik.Store(Data);
        req.flash('success', 'Berhasil Menyimpan Data!');
        res.redirect('/pemilik');
    }catch{
        req.flash('error', 'Terjadi kesalahan pada penyimpanan data')
        req.redirect('/pemilik');
    }
})

router.get('/edit/(:id)', async function(req,res, next){
    let id_pemilik = req.params.id;
    let rows = await Model_Pemilik.getId(id_pemilik);
    res.render('pemilik/edit', {
        id_pemilik: rows[0].id_pemilik,
        nama_pemilik: rows[0].nama_pemilik,
        alamat: rows[0].alamat,
        no_hp: rows[0].no_hp,
    })
})

router.post('/update/(:id)', async function(req,res, next){
    try{
        let id_pemilik = req.params.id;
        let {nama_pemilik, alamat, no_hp} = req.body;
        let Data = {
            nama_pemilik, alamat, no_hp
        }
        await Model_Pemilik.Update(id_pemilik, Data);
        req.flash('success', 'Berhasil memperbarui data!')
        res.redirect('/pemilik');
    } catch{
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.render('/pemilik');
    }
})

router.get('/delete/(:id)', async function(req, res, next){
    let id = req.params.id;
    await Model_Pemilik.Delete(id);
    req.flash('success', 'Berhasil menghapus data!')
    res.redirect('/pemilik');
})

module.exports = router;