// Import library readline-sync untuk membaca input pengguna dari terminal
import * as readlineSync from "readline-sync";

// =========================================================================
// BAGIAN 1: DEFINISI STRUKTUR DATA & SEED DATA (Oleh: Muhammad Faizin Akbar)
// =========================================================================

// Mendefinisikan tipe data (interface) untuk entitas Kayu sesuai rancangan Bab I
interface Kayu {
  id: string;           // Kode unik varian kayu (contoh: "KY-01")
  jenis: string;        // Nama jenis kayu (contoh: "Kayu Jati")
  grade: string;        // Tingkat kualitas kayu ("A", "B", atau "C")
  hargaSatuan: number;  // Harga jual per batang dalam Rupiah
  stok: number;         // Jumlah ketersediaan stok di gudang
  tersedia: boolean;    // Status ketersediaan (true jika stok > 0)
}

// Inisialisasi array of objects berisi 5 data awal (seed data) inventaris kayu
let daftarKayu: Kayu[] = [
  { id: "KY-01", jenis: "Kayu Jati", grade: "A", hargaSatuan: 500000, stok: 25, tersedia: true },
  { id: "KY-02", jenis: "Kayu Mahoni", grade: "B", hargaSatuan: 350000, stok: 40, tersedia: true },
  { id: "KY-03", jenis: "Kayu Meranti", grade: "B", hargaSatuan: 275000, stok: 60, tersedia: true },
  { id: "KY-04", jenis: "Kayu Ulin", grade: "A", hargaSatuan: 650000, stok: 15, tersedia: true },
  { id: "KY-05", jenis: "Kayu Sengon", grade: "C", hargaSatuan: 150000, stok: 0, tersedia: false }
];

// =========================================================================
// BAGIAN 2: KERANGKA FUNGSI BERTIPE (Oleh: Muhammad Naufal Adiputra)
// =========================================================================

// Fungsi untuk menampilkan daftar pilihan menu utama ke layar terminal
function tampilkanDaftarMenu(): void {
  console.log("\n=======================================================");
  console.log("   SISTEM INVENTARIS & KASIR TOKO KAYU SEJAHTERA      ");
  console.log("=======================================================");
  console.log("1. Tambah Varian Kayu Baru (Create)");
  console.log("2. Lihat Semua Katalog Kayu (Read All)");
  console.log("3. Lihat Detail Kayu by ID (Read Detail)");
  console.log("4. Ubah Data & Resupply Stok (Update)");
  console.log("5. Hapus Data Kayu (Delete)");
  console.log("6. Cari & Filter Kayu (Search)");
  console.log("7. Transaksi Kasir Penjualan");
  console.log("0. Keluar Aplikasi");
  console.log("=======================================================");
}

// Fungsi untuk menampilkan seluruh daftar katalog inventaris kayu
function tampilkanKatalogKayu(data: Kayu[]): void {
  console.log("\n--- KATALOG INVENTARIS KAYU ---");
  if (data.length === 0) {
    console.log("Data inventaris kayu masih kosong.");
    return;
  }

  for (let i: number = 0; i < data.length; i++) {
    const item: Kayu = data[i];
    const statusTeks: string = item.tersedia ? "Tersedia" : "Habis";
    console.log(
      `${i + 1}. [${item.id}] ${item.jenis} | Grade ${item.grade} | Rp${item.hargaSatuan.toLocaleString("id-ID")} | Stok: ${item.stok} (${statusTeks})`
    );
  }
}

// Fungsi helper untuk mencari satu objek kayu berdasarkan ID
function cariKayuById(idCari: string): Kayu | undefined {
  return daftarKayu.find(
    (item: Kayu) => item.id.toLowerCase() === idCari.trim().toLowerCase()
  );
}

// Kerangka fungsi CRUD yang akan disempurnakan pada Progress 3
function tambahKayuBaru(): void {
  console.log("\n[Info] Fitur Tambah Varian Kayu Baru siap diimplementasikan pada tahap berikutnya.");
}

function lihatDetailKayu(): void {
  const idInput: string = readlineSync.question("Masukkan ID Kayu (contoh: KY-01): ");
  const hasil: Kayu | undefined = cariKayuById(idInput);
  if (!hasil) {
    console.log(`[!] Data kayu dengan ID "${idInput}" tidak ditemukan.`);
    return;
  }
  console.log("\n--- DETAIL DATA KAYU ---");
  console.log(`ID           : ${hasil.id}`);
  console.log(`Jenis Kayu   : ${hasil.jenis}`);
  console.log(`Grade        : ${hasil.grade}`);
  console.log(`Harga Satuan : Rp${hasil.hargaSatuan.toLocaleString("id-ID")}`);
  console.log(`Jumlah Stok  : ${hasil.stok} batang`);
  console.log(`Status       : ${hasil.tersedia ? "Tersedia" : "Stok Habis"}`);
}

function ubahDataKayu(): void {
  console.log("\n[Info] Fitur Ubah Data & Resupply Stok siap diimplementasikan pada tahap berikutnya.");
}

function hapusDataKayu(): void {
  console.log("\n[Info] Fitur Hapus Data Kayu siap diimplementasikan pada tahap berikutnya.");
}

function cariDanFilterKayu(): void {
  console.log("\n[Info] Fitur Cari & Filter Kayu siap diimplementasikan pada tahap berikutnya.");
}

// =========================================================================
// BAGIAN 3: MODUL KALKULASI KASIR PENJUALAN (Oleh: Richy Natha)
// =========================================================================

// Fungsi helper untuk menghitung total bayar setelah diskon (diskon 10% jika pembelian >= 10 batang)
function hitungTotalTransaksi(hargaSatuan: number, jumlahBeli: number): {
  subtotal: number;
  diskon: number;
  totalAkhir: number;
} {
  const subtotal: number = hargaSatuan * jumlahBeli;
  const diskon: number = jumlahBeli >= 10 ? subtotal * 0.1 : 0;
  const totalAkhir: number = subtotal - diskon;
  return { subtotal, diskon, totalAkhir };
}

// Fungsi utama modul kasir penjualan kayu
function prosesTransaksiKasir(): void {
  console.log("\n--- TRANSAKSI KASIR PENJUALAN ---");
  tampilkanKatalogKayu(daftarKayu);

  const idBeli: string = readlineSync.question("\nMasukkan ID Kayu yang dibeli (contoh: KY-01): ");
  const kayuDipilih: Kayu | undefined = cariKayuById(idBeli);

  if (!kayuDipilih) {
    console.log(`[!] Transaksi dibatalkan: ID Kayu "${idBeli}" tidak ditemukan.`);
    return;
  }

  if (!kayuDipilih.tersedia || kayuDipilih.stok <= 0) {
    console.log(`[!] Transaksi dibatalkan: Stok ${kayuDipilih.jenis} sedang habis.`);
    return;
  }

  const jumlahInput: string = readlineSync.question(`Masukkan jumlah pembelian (${kayuDipilih.jenis}, sisa stok ${kayuDipilih.stok}): `);
  const jumlahBeli: number = Number(jumlahInput);

  if (isNaN(jumlahBeli) || jumlahBeli <= 0 || !Number.isInteger(jumlahBeli)) {
    console.log("[!] Transaksi dibatalkan: Jumlah pembelian harus berupa bilangan bulat positif.");
    return;
  }

  if (jumlahBeli > kayuDipilih.stok) {
    console.log(`[!] Transaksi dibatalkan: Stok tidak mencukupi (tersedia ${kayuDipilih.stok} batang).`);
    return;
  }

  // Hitung rincian pembayaran menggunakan fungsi kalkulasi kasir
  const rincian = hitungTotalTransaksi(kayuDipilih.hargaSatuan, jumlahBeli);

  console.log("\n--- RINCIAN PEMBAYARAN ---");
  console.log(`Item         : ${kayuDipilih.jenis} (Grade ${kayuDipilih.grade})`);
  console.log(`Jumlah Beli  : ${jumlahBeli} batang @ Rp${kayuDipilih.hargaSatuan.toLocaleString("id-ID")}`);
  console.log(`Subtotal     : Rp${rincian.subtotal.toLocaleString("id-ID")}`);
  console.log(`Diskon (10%) : Rp${rincian.diskon.toLocaleString("id-ID")}`);
  console.log(`Total Bayar  : Rp${rincian.totalAkhir.toLocaleString("id-ID")}`);

  const uangInput: string = readlineSync.question("Masukkan nominal uang pembayaran (Rp): ");
  const uangBayar: number = Number(uangInput);

  if (isNaN(uangBayar) || uangBayar < rincian.totalAkhir) {
    console.log("[!] Transaksi dibatalkan: Uang pembayaran tidak valid atau kurang.");
    return;
  }

  const kembalian: number = uangBayar - rincian.totalAkhir;

  // Perbarui stok inventaris secara otomatis setelah transaksi berhasil
  kayuDipilih.stok -= jumlahBeli;
  if (kayuDipilih.stok === 0) {
    kayuDipilih.tersedia = false;
  }

  console.log("\n=======================================================");
  console.log("              STRUK TRANSAKSI BERHASIL                 ");
  console.log("=======================================================");
  console.log(`Total Tagihan : Rp${rincian.totalAkhir.toLocaleString("id-ID")}`);
  console.log(`Uang Tunai    : Rp${uangBayar.toLocaleString("id-ID")}`);
  console.log(`Kembalian     : Rp${kembalian.toLocaleString("id-ID")}`);
  console.log(`Sisa Stok     : ${kayuDipilih.stok} batang`);
  console.log("=======================================================");
}

// =========================================================================
// BAGIAN 4: PERULANGAN MENU UTAMA (Oleh: Muhammad Faizin Akbar)
// =========================================================================

// Fungsi utama untuk menjalankan siklus perulangan menu aplikasi
function jalankanAplikasi(): void {
  let isRunning: boolean = true;

  while (isRunning) {
    tampilkanDaftarMenu();
    const pilihan: string = readlineSync.question("Pilih menu (0-7): ");

    switch (pilihan) {
      case "1":
        tambahKayuBaru();
        break;
      case "2":
        tampilkanKatalogKayu(daftarKayu);
        break;
      case "3":
        lihatDetailKayu();
        break;
      case "4":
        ubahDataKayu();
        break;
      case "5":
        hapusDataKayu();
        break;
      case "6":
        cariDanFilterKayu();
        break;
      case "7":
        prosesTransaksiKasir();
        break;
      case "0":
        console.log("\nTerima kasih telah menggunakan Sistem Inventaris & Kasir Toko Kayu.");
        isRunning = false;
        break;
      default:
        console.log("\n[!] Pilihan tidak valid. Silakan masukkan angka 0 sampai 7.");
        break;
    }
  }
}

// Memanggil fungsi utama untuk memulai eksekusi program
jalankanAplikasi();