const connection = require('../config/database');

class Model_Kapal {

    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT a.id_kapal, a.nama_kapal, a.id_pemilik, a.id_dpi, a.id_alat_tangkap, ' +
                'b.nama_pemilik, b.id_pemilik, ' +
                'c.nama_dpi, c.id_dpi, ' +
                'd.nama_alat_tangkap, d.id_alat_tangkap ' + 
                'FROM kapal as a ' +
                'INNER JOIN pemilik as b ON a.id_pemilik = b.id_pemilik ' +
                'INNER JOIN dpi as c ON a.id_dpi = c.id_dpi ' +
                'INNER JOIN alat_tangkap as d ON a.id_alat_tangkap = d.id_alat_tangkap ' +
                'ORDER BY a.id_kapal DESC', 
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                }
            );
        });
    }

    static async Store(Data) {
        return new Promise((resolve, reject) => {
            connection.query('insert into kapal set ?', Data, function (err, result) {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
            })
        });
    }

    static async getId(id) {
        return new Promise((resolve, reject) => {
            connection.query('select * from kapal where id_kapal = ' + id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    static async Update(id, Data) {
        return new Promise((resolve, reject) => {
            connection.query('update kapal set ? where id_kapal =' + id, Data, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        });
    }

    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('delete from kapal where id_kapal =' + id, function (err, result) {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
            })
        });
    }

}


module.exports = Model_Kapal;