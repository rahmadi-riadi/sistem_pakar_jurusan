const mysql = require("mysql2");

// Konfigurasi koneksi ke database lokal (XAMPP default)
const pool = mysql.createPool({
  host: "localhost",
  user: "root", // Default user XAMPP
  password: "", // Default XAMPP tidak pakai password
  database: "sistem_pakar_jurusan",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Ubah pool menjadi promise agar bisa menggunakan async/await
const promisePool = pool.promise();

// Cek koneksi saat server pertama kali jalan
promisePool
  .getConnection()
  .then((connection) => {
    console.log("Database berhasil terkoneksi ke sistem_pakar_jurusan");
    connection.release();
  })
  .catch((err) => {
    console.error("Gagal terkoneksi database:", err.message);
  });

module.exports = promisePool;
