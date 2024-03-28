const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const Model_Kategori = require('../model/Model_Kategori');
const Model_Produk = require('../model/Model_Produk');
const Model_Users = require('../model/Model_Users');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/upload');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const authMiddleware = async (req, res, next) => {
    try {
        let id = req.session.userId;
        if (!id) {
            return res.redirect('/login');
        }
        let userData = await Model_Users.getId(id);
        if (userData.length === 0) {
            return res.redirect('/superusers');
        }
        req.userData = userData[0];
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

router.get('/', authMiddleware, async (req, res) => {
    try {
        let rows = await Model_Produk.getAll();
        res.render('produk/index', {
            data: rows,
            email: req.userData.email
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/create', authMiddleware, async (req, res) => {
    try {
        let rows = await Model_Kategori.getAll();
        res.render('produk/create', {
            data: rows,
            email: req.userData.email
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/store', upload.single('foto_produk'), async (req, res) => {
    try {
        let { nama_produk, harga_produk, id_kategori } = req.body;
        let foto_produk = req.file.filename;
        let Data = {
            nama_produk,
            harga_produk,
            id_kategori,
            foto_produk
        };
        await Model_Produk.Store(Data);
        req.flash('success', 'Berhasil Menyimpan Data');
        res.redirect('/produk');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Gagal menyimpan data');
        res.redirect('/produk');
    }
});



router.get('/edit/:id', authMiddleware, async (req, res) => {
    try {
        let id = req.params.id;
        let kategoriRows = await Model_Kategori.getAll();
        let rows = await Model_Produk.getId(id);
        res.render('produk/edit', {
            id: id,
            data: kategoriRows,
            produk: rows[0],
            email: req.session.email
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/update/:id', upload.single('foto_produk'), async (req, res) => {
    try {
        let id = req.params.id;
        let filebaru = req.file ? req.file.filename : null;
        let rows = await Model_Produk.getId(id);
        const namaFileLama = rows[0].foto_produk;
        if (filebaru && namaFileLama) {
            const pathFileLama = path.join(__dirname, '../public/images/upload', namaFileLama);
            fs.unlinkSync(pathFileLama);
        }
        let { nama_produk, harga_produk, id_kategori } = req.body;
        let foto_produk = filebaru || namaFileLama;
        let Data = {
            nama_produk,
            harga_produk,
            id_kategori,
            foto_produk
        };
        await Model_Produk.Update(id, Data);
        req.flash('success', 'Berhasil Memperbaharui Data');
        res.redirect('/produk');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Gagal memperbaharui data');
        res.redirect('/produk');
    }
});

router.get('/delete/:id', authMiddleware, async (req, res) => {
    try {
        let id = req.params.id;
        let rows = await Model_Produk.getId(id);
        const namaFileLama = rows[0].foto_produk;
        if (namaFileLama) {
            const pathFileLama = path.join(__dirname, '../public/images/upload', namaFileLama);
            fs.unlinkSync(pathFileLama);
        }
        await Model_Produk.Delete(id);
        req.flash('success', 'Berhasil Menghapus Data');
        res.redirect('/produk');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Gagal menghapus data');
        res.redirect('/produk');
    }
});

module.exports = router;
