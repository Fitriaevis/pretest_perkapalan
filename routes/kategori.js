var express = require('express');
var router = express.Router();
// var connection = require('../config/database.js');
const Model_Kategori = require('../model/Model_Kategori');

router.get('/', async function(req, res, next){
    let rows = await Model_Kategori.getAll();
    res.render('kategori/index',{
        data: rows,
        email: req.session.email
    })
})

router.get('/create', function(req, res, next) {
    res.render('kategori/create', { 
      nama_kategori: '',
      email: req.session.email
    });
  });

router.post('/store', async function(req,res,next){
    try{
        let {nama_kategori} = req.body;
        let Data = {
            nama_kategori
        }
        await Model_Kategori.Store(Data);
        req.flash('success', 'Berhasil Menyimpan Data!');
        res.redirect('/kategori');
    }catch{
        req.flash('error', 'Terjadi kesalahan pada penyimpanan data')
        req.redirect('/kategori');
    }
})

router.get('/edit/(:id)', async function(req,res, next){
    let id = req.params.id;
    let rows = await Model_Kategori.getId(id);
    res.render('kategori/edit', {
        id: rows[0].id,
        nama_kategori: rows[0].nama_kategori,
        email: req.session.email
    })
})

router.post('/update/(:id)', async function(req,res, next){
    try{
        let id = req.params.id;
        let {nama_kategori} = req.body;
        let Data = {
            id,
            nama_kategori
        }
        await Model_Kategori.Update(id, Data);
        req.flash('success', 'Berhasil memperbarui data!')
        res.redirect('/kategori');
    } catch{
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.render('/kategori');
    }
})

router.get('/delete/(:id)', async function(req, res, next){
    let id = req.params.id;
    await Model_Kategori.Delete(id);
    req.flash('success', 'Berhasil menghapus data!')
    res.redirect('/kategori');
})

module.exports = router;