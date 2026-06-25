const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "sistem_pakar_jurusan",
};

let db;

// 1. KONEKSI & AUTO-SEEDER ADMIN
async function initializeServer() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log("Basis data MySQL berhasil terhubung.");

    // Auto-Seeder: Pastikan selalu ada akun admin yang valid
    const [adminRows] = await db.query(
      "SELECT * FROM users WHERE username = 'admin'",
    );
    if (adminRows.length === 0) {
      const hashedAdminPassword = await bcrypt.hash("admin123", 10);
      await db.query(
        "INSERT INTO users (username, password, role) VALUES ('admin', ?, 'admin')",
        [hashedAdminPassword],
      );
      console.log(
        "Akun Admin default berhasil dibuat (User: admin, Pass: admin123)",
      );
    }
  } catch (err) {
    console.error("Gagal terhubung ke basis data:", err);
  }
}
initializeServer();

// ==========================================
// 2. ENDPOINT AUTENTIKASI
// ==========================================
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
      username.trim(),
    ]);

    if (rows.length > 0) {
      const user = rows[0];
      const isMatch = await bcrypt.compare(password.trim(), user.password);

      if (isMatch) {
        res.json({
          status: "success",
          role: user.role,
          token: "jwt-token-mock",
        });
      } else {
        res.status(401).json({ status: "error", message: "Password salah." });
      }
    } else {
      res
        .status(401)
        .json({ status: "error", message: "Username tidak ditemukan." });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const [exists] = await db.query("SELECT * FROM users WHERE username = ?", [
      username.trim(),
    ]);

    if (exists.length > 0)
      return res
        .status(400)
        .json({ status: "error", message: "Username sudah dipakai." });

    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    await db.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, "user")',
      [username.trim(), hashedPassword],
    );
    res.json({ status: "success", message: "Registrasi berhasil." });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// ==========================================
// 3. ENDPOINT ADMIN (USERS, JURUSAN, INDIKATOR, RULES)
// ==========================================
app.get("/api/admin/users", async (req, res) => {
  const [rows] = await db.query("SELECT id_user, username, role FROM users");
  res.json({ status: "success", data: rows });
});

app.put("/api/admin/users/:id/role", async (req, res) => {
  const { role } = req.body;
  await db.query("UPDATE users SET role = ? WHERE id_user = ?", [
    role,
    req.params.id,
  ]);
  res.json({ status: "success", message: "Role diperbarui." });
});

app.get("/api/admin/master-data", async (req, res) => {
  const [jurusan] = await db.query("SELECT * FROM jurusan");
  const [indikator] = await db.query("SELECT * FROM indikator");
  res.json({ jurusan, indikator });
});

app.get("/api/indikator", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id_indikator, pertanyaan FROM indikator",
    );
    res.json({
      status: "success",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Jurusan CRUD
app.post("/api/admin/jurusan", async (req, res) => {
  await db.query(
    "INSERT INTO jurusan (nama_jurusan, deskripsi) VALUES (?, ?)",
    [req.body.nama_jurusan, req.body.deskripsi],
  );
  res.json({ status: "success", message: "Jurusan ditambahkan." });
});

app.put("/api/admin/jurusan/:id", async (req, res) => {
  await db.query(
    "UPDATE jurusan SET nama_jurusan = ?, deskripsi = ? WHERE id_jurusan = ?",
    [req.body.nama_jurusan, req.body.deskripsi, req.params.id],
  );
  res.json({ status: "success", message: "Jurusan diperbarui." });
});

app.delete("/api/admin/jurusan/:id", async (req, res) => {
  await db.query("DELETE FROM jurusan WHERE id_jurusan = ?", [req.params.id]);
  res.json({ status: "success", message: "Jurusan dihapus." });
});

// Indikator CRUD
app.post("/api/admin/indikator", async (req, res) => {
  await db.query("INSERT INTO indikator (pertanyaan) VALUES (?)", [
    req.body.pertanyaan,
  ]);
  res.json({ status: "success", message: "Fakta ditambahkan." });
});

app.put("/api/admin/indikator/:id", async (req, res) => {
  await db.query("UPDATE indikator SET pertanyaan = ? WHERE id_indikator = ?", [
    req.body.pertanyaan,
    req.params.id,
  ]);
  res.json({ status: "success", message: "Fakta diperbarui." });
});

app.delete("/api/admin/indikator/:id", async (req, res) => {
  await db.query("DELETE FROM indikator WHERE id_indikator = ?", [
    req.params.id,
  ]);
  res.json({ status: "success", message: "Fakta dihapus." });
});

// Rules CRUD (Tanpa cf_pakar)
app.get("/api/admin/rules-all", async (req, res) => {
  const [rows] = await db.query(`
    SELECT r.*, j.nama_jurusan, i.pertanyaan 
    FROM rules r JOIN jurusan j ON r.id_jurusan = j.id_jurusan JOIN indikator i ON r.id_indikator = i.id_indikator
  `);
  res.json({ status: "success", data: rows });
});

app.post("/api/admin/rules", async (req, res) => {
  await db.query("INSERT INTO rules (id_jurusan, id_indikator) VALUES (?, ?)", [
    req.body.id_jurusan,
    req.body.id_indikator,
  ]);
  res.json({ status: "success", message: "Aturan disimpan." });
});

app.put("/api/admin/rules/:id", async (req, res) => {
  await db.query(
    "UPDATE rules SET id_jurusan = ?, id_indikator = ? WHERE id_rule = ?",
    [req.body.id_jurusan, req.body.id_indikator, req.params.id],
  );
  res.json({ status: "success", message: "Aturan diperbarui." });
});

app.delete("/api/admin/rules/:id", async (req, res) => {
  await db.query("DELETE FROM rules WHERE id_rule = ?", [req.params.id]);
  res.json({ status: "success", message: "Aturan dihapus." });
});

// ==========================================
// ENDPOINT MESIN INFERENSI (FORWARD CHAINING) + SIMPAN RIWAYAT
// ==========================================
app.post("/api/konsultasi", async (req, res) => {
  let createdWmId = null;

  try {
    // Forward chaining sederhana: rules cocok berdasarkan indikator yang dipilih.
    // Nilai kecocokan dihitung sebagai persentase: (jumlah indikator yang cocok) / (jumlah indikator dipilih) * 100.
    // Nilai ini disimpan ke DB agar riwayat & analytics bisa diambil langsung dari database.

    const { nama_user, jawaban } = req.body;

    if (!jawaban || jawaban.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Pilih setidaknya satu indikator minat/bakat.",
      });
    }

    const placeholders = jawaban.map(() => "?").join(",");

    // Kueri pencocokan aturan (hitung indikator unik yang match rule ke jurusan)
    const [rows] = await db.query(
      `
      SELECT 
        j.id_jurusan, 
        j.nama_jurusan, 
        j.deskripsi,
        COUNT(DISTINCT r.id_indikator) AS jumlah_kecocokan
      FROM rules r
      JOIN jurusan j ON r.id_jurusan = j.id_jurusan
      WHERE r.id_indikator IN (${placeholders})
      GROUP BY j.id_jurusan, j.nama_jurusan, j.deskripsi
      ORDER BY jumlah_kecocokan DESC
      LIMIT 1
    `,
      jawaban,
    );

    // Jika tidak ada jurusan cocok: tetap kembalikan hasil, dan tidak menyimpan riwayat.
    if (rows.length === 0) {
      return res.json({
        status: "success",
        nama: nama_user,
        rekomendasi: null,
        deskripsi: "Tidak ada jurusan yang cocok dengan indikator Anda.",
        kecocokan: 0,
      });
    }

    const jurusanTerbaik = rows[0];

    // Perhitungan persentase kecocokan
    const persentase = Math.round(
      (jurusanTerbaik.jumlah_kecocokan / jawaban.length) * 100,
    );
    const nilaiAkhir = persentase > 100 ? 100 : persentase;

    // Nilai kecocokan untuk disimpan ke working_memory supaya histori & analytics akurat.
    const nilaiKecocokan = nilaiAkhir;

    // VALIDASI AMBANG BATAS (THRESHOLD)
    if (nilaiAkhir < 30) {
      // Simpan sesi dengan jurusan_terpilih NULL agar konsisten dengan tabel.
      const [wmResult] = await db.query(
        "INSERT INTO working_memory (username, jurusan_terpilih, nilai_kecocokan, created_at) VALUES (?, NULL, 0, CURRENT_TIMESTAMP)",
        [nama_user],
      );
      createdWmId = wmResult.insertId;

      // Detail jawaban (id_indikator -> jawaban teks)
      if (createdWmId) {
        const [indikatorRows] = await db.query(
          `SELECT id_indikator, pertanyaan FROM indikator WHERE id_indikator IN (${placeholders})`,
          jawaban,
        );
        const map = new Map(
          indikatorRows.map((r) => [r.id_indikator, r.pertanyaan]),
        );

        for (const id_indikator of jawaban) {
          const jawabanTxt = map.get(id_indikator) || "";
          await db.query(
            "INSERT INTO working_memory_detail (id_wm, id_indikator, jawaban) VALUES (?, ?, ?)",
            [createdWmId, id_indikator, jawabanTxt],
          );
        }
      }

      // Tambahkan penjelasan yang actionable untuk UI user.
      return res.json({
        status: "success",
        nama: nama_user,
        rekomendasi: null,
        kecocokan: nilaiAkhir,
        deskripsi:
          `Nilai kecocokan Anda ${nilaiAkhir}% (di bawah ambang ${30}%). ` +
          "Sistem belum bisa menentukan jurusan yang paling sesuai. " +
          "Silakan: Cocokkan kembali indikator yang Anda pilih (centang yang benar-benar sesuai minat/bakat), dan coba konsultasi ulang. Jika tetap ambigu, pertimbangkan berkonsultasi dengan pembimbing/akademik di kampus untuk verifikasi minat dan bakat Anda.",
      });
    }

    // Jika lolos ambang batas >= 30
    // 1) Simpan working_memory
    const [wmInsert] = await db.query(
      "INSERT INTO working_memory (username, jurusan_terpilih, nilai_kecocokan, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)",
      [nama_user, jurusanTerbaik.id_jurusan, nilaiKecocokan],
    );
    createdWmId = wmInsert.insertId;

    // 2) Simpan working_memory_detail
    const [indikatorRows] = await db.query(
      `SELECT id_indikator, pertanyaan FROM indikator WHERE id_indikator IN (${placeholders})`,
      jawaban,
    );
    const map = new Map(
      indikatorRows.map((r) => [r.id_indikator, r.pertanyaan]),
    );

    for (const id_indikator of jawaban) {
      const jawabanTxt = map.get(id_indikator) || "";
      await db.query(
        "INSERT INTO working_memory_detail (id_wm, id_indikator, jawaban) VALUES (?, ?, ?)",
        [createdWmId, id_indikator, jawabanTxt],
      );
    }

    res.json({
      status: "success",
      nama: nama_user,
      rekomendasi: jurusanTerbaik.nama_jurusan,
      deskripsi: jurusanTerbaik.deskripsi,
      kecocokan: nilaiKecocokan,
    });
  } catch (error) {
    // Jangan hentikan konsultasi jika gagal menyimpan riwayat, tapi laporkan error.
    console.error("Error /api/konsultasi:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

// ==========================================
// ENDPOINT RIWAYAT (ADMIN)
// working_memory + working_memory_detail
// ==========================================
app.get("/api/history", async (req, res) => {
  try {
    const search = (req.query.search || "").trim();

    const q = `
      SELECT 
        wm.id_wm AS id_session,
        wm.username AS nama_user,
        wm.jurusan_terpilih,
        j.nama_jurusan,
        wm.created_at AS tanggal_tes,
        (
          SELECT ROUND(COUNT(*) / (SELECT COUNT(*) FROM working_memory_detail WHERE id_wm = wm.id_wm) * 100)
          FROM working_memory_detail wmd
          WHERE wmd.id_wm = wm.id_wm
        ) AS nilai_keyakinan
      FROM working_memory wm
      LEFT JOIN jurusan j ON wm.jurusan_terpilih = j.id_jurusan
    `;

    // nilai_keyakinan di atas tidak akurat; untuk UI kebutuhan kita hitung ulang dari rule matching di detail.
    // Akan dihitung ulang dari detail: persentase = (jumlah indikator yang dipilih) / (jumlah indikator yang dipilih) * 100 = 100,
    // jadi kita perbaiki dengan query yang lebih tepat: gunakan COUNT detail sebagai basis jawaban (total dipilih).
    // Untuk saat ini: jadikan 100% jika jurusan_terpilih tidak null, jika tidak null tetap 0.

    // Realistic: gunakan jurusan_terpilih null/non-null.
    const [rows] = await db.query(
      `
        SELECT 
          wm.id_wm AS id_session,
          wm.username AS nama_user,
          j.nama_jurusan,
          wm.created_at AS tanggal_tes,
          COALESCE(wm.nilai_kecocokan, 0) AS nilai_keyakinan
        FROM working_memory wm
        LEFT JOIN jurusan j ON wm.jurusan_terpilih = j.id_jurusan
        WHERE (? = '' OR wm.username LIKE ? OR j.nama_jurusan LIKE ?)
        ORDER BY wm.created_at DESC
      `,
      [search, `%${search}%`, `%${search}%`],
    );

    res.json({ status: "success", data: rows });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

app.get("/api/history/:id_session", async (req, res) => {
  try {
    const id_session = req.params.id_session;

    const [wmRows] = await db.query(
      `
      SELECT 
        wm.id_wm AS id_wm,
        wm.username AS nama_user,
        wm.jurusan_terpilih,
        j.nama_jurusan,
        wm.created_at AS tanggal_tes
      FROM working_memory wm
      LEFT JOIN jurusan j ON wm.jurusan_terpilih = j.id_jurusan
      WHERE wm.id_wm = ?
      `,
      [id_session],
    );

    if (wmRows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Sesi tidak ditemukan" });
    }

    const session = wmRows[0];

    const [detailRows] = await db.query(
      `
      SELECT id_indikator, jawaban
      FROM working_memory_detail
      WHERE id_wm = ?
      ORDER BY id_detail ASC
      `,
      [id_session],
    );

    // Jika jurusan_terpilih NULL, nilai kecocokan dari inferensi sebenarnya ada di wm.nilai_kecocokan.
    // Kita pakai nilai tersimpan agar UI menampilkan persentase yang dihitung.
    const nilai_keyakinan = session.nilai_kecocokan ?? 0;

    res.json({
      status: "success",
      session: {
        nama_user: session.nama_user,
        nama_jurusan: session.nama_jurusan,
        tanggal_tes: session.tanggal_tes,
        nilai_keyakinan,
      },
      answers: detailRows.map((r) => r.jawaban).filter(Boolean),
    });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

// ==========================================
// ENDPOINT ANALYTICS (ADMIN)
// ==========================================
app.get("/api/admin/analytics", async (req, res) => {
  try {
    const [totalRows] = await db.query(
      "SELECT COUNT(*) AS total_sessions FROM working_memory",
    );

    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    const todayStr = `${y}-${m}-${d}`;

    const [todayRows] = await db.query(
      `
      SELECT COUNT(*) AS today_sessions
      FROM working_memory
      WHERE DATE(created_at) = ?
      `,
      [todayStr],
    );

    // top jurusan dari sesi yang jurusan_terpilih tidak null
    const [topRows] = await db.query(
      `
      SELECT 
        j.nama_jurusan,
        COUNT(*) AS jumlah
      FROM working_memory wm
      JOIN jurusan j ON wm.jurusan_terpilih = j.id_jurusan
      GROUP BY j.id_jurusan, j.nama_jurusan
      ORDER BY jumlah DESC
      LIMIT 1
      `,
    );

    res.json({
      total_sessions: totalRows[0].total_sessions,
      today_sessions: todayRows[0].today_sessions,
      top_jurusan: topRows[0] || { nama_jurusan: null, jumlah: 0 },
    });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

app.listen(5000, () => console.log(`Server berjalan di port 5000`));
