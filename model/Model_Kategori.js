const  connection = require('../config/database');

class Model_Kategori{
    //mengambil data
    static async getAll(){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM kategori ORDER BY id_kategori DESC', (err, rows) => {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
        });
    }
    //menyimpan data
    static async Store(Data){
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO kategori SET ?', Data, function(err, result){
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        });
    }
    //mengambil data berdasarkan ID
    static async getId(id){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM kategori WHERE id_kategori = ' + id, (err, rows) => {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        });
    }
    //mengupdate data
    static async Update(id, Data){
        return new Promise((resolve, reject) => {
            connection.query('UPDATE kategori SET ? WHERE id_kategori = ' + id, Data, function(err, result){
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        });
    }
    //menghapus data
    static async Delete(id){
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM kategori WHERE id_kategori = ' + id, function(err, result){
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        });
    }
}

module.exports = Model_Kategori;