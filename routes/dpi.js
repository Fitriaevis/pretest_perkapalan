var express = require('express');
var router = express.Router();
// var connection = require('../config/database.js');
const Model_DPI = require('../model/Model_DPI');

router.get('/', async function(req, res, next){
    let rows = await Model_DPI.getAll();
    res.render('dpi/index',{
        data: rows
    })
})

router.get('/create', function(req, res, next) {
    res.render('dpi/create', { 
      nama_dpi: '', 
      luas: '' 
    });
  });

router.post('/store', async function(req,res,next){
    try{
        let {nama_dpi, luas} = req.body;
        let Data = {
            nama_dpi, luas
        }
        await Model_DPI.Store(Data);
        req.flash('success', 'Berhasil Menyimpan Data!');
        res.redirect('/dpi');
    }catch{
        req.flash('error', 'Terjadi kesalahan pada penyimpanan data')
        req.redirect('/dpi');
    }
})

router.get('/edit/(:id)', async function(req,res, next){
    let id_dpi = req.params.id;
    let rows = await Model_DPI.getId(id_dpi);
    res.render('dpi/edit', {
        id_dpi: rows[0].id_dpi,
        nama_dpi: rows[0].nama_dpi,
        luas: rows[0].luas,
    })
})

router.post('/update/(:id)', async function(req,res, next){
    try{
        let id_dpi = req.params.id;
        let {nama_dpi, luas} = req.body;
        let Data = {
            nama_dpi, luas
        }
        await Model_DPI.Update(id_dpi, Data);
        req.flash('success', 'Berhasil memperbarui data!')
        res.redirect('/dpi');
    } catch{
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.render('/dpi');
    }
})

router.get('/delete/(:id)', async function(req, res, next){
    let id = req.params.id;
    await Model_DPI.Delete(id);
    req.flash('success', 'Berhasil menghapus data!')
    res.redirect('/dpi');
})

module.exports = router;