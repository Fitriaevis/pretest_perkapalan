const connection = require('../config/database');

class Model_Produk {
    // Get all products
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT a.*, b.nama_kategori FROM produk a ' + 
            'LEFT JOIN kategori b ON b.id_kategori = a.id_kategori ' + 
            'ORDER BY a.id_produk DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Insert a new product
    static async Store(Data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO produk SET ?', Data, function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Get product by ID
    static async getId(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM produk WHERE id_produk = ?', id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Update product
    static async Update(id, Data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE produk SET ? WHERE id_produk = ?', [Data, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Delete product by ID
    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM produk WHERE id_produk = ?', id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Model_Produk;
