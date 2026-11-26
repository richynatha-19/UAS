// Import library readline-sync untuk membaca input pengguna dari terminal
import * as readlineSync from 'readline-sync';

// ============================================================================
// BAGIAN 1: DEFINISI STRUKTUR DATA & SEED DATA (Oleh: Muhammad Faizin Akbar)
// ============================================================================

// Mendefinisikan tipe data (interface) untuk entitas Kayu sesuai rancangan Bab I
interface Kayu {
    id: string;          // Kode unik varian kayu (contoh: "KY-01")
    jenis: string;       // Nama jenis kayu (contoh: "Kayu Jati")
    grade: string;       // Tingkat kualitas kayu ("A", "B", atau "C")
    hargaSatuan: number; // Harga jual per batang dalam Rupiah
    stok: number;        // Jumlah ketersediaan stok di gudang
    tersedia: boolean;   // Status ketersediaan (true jika stok > 0)
}

// Inisialisasi array of objects berisi 5 data awal (seed data) inventaris kayu
let daftarKayu: Kayu[] = [
    { id: "KY-01", jenis: "Kayu Jati", grade: "A", hargaSatuan: 500000, stok: 25, tersedia: true },
    { id: "KY-02", jenis: "Kayu Mahoni", grade: "B", hargaSatuan: 300000, stok: 40, tersedia: true },
    { id: "KY-03", jenis: "Kayu Meranti", grade: "B", hargaSatuan: 250000, stok: 15, tersedia: true },
    { id: "KY-04", jenis: "Kayu Ulin", grade: "A", hargaSatuan: 650000, stok: 10, tersedia: true },
    { id: "KY-05", jenis: "Kayu Sengon", grade: "C", hargaSatuan: 120000, stok: 0, tersedia: false }
];

// ============================================================================
// BAGIAN 2: KERANGKA FUNGSI BERTIPE (Akan dilengkapi bersama tim)
// ============================================================================

// Fungsi untuk menampilkan daftar opsi menu utama ke layar terminal (void)
function tampilkanDaftarMenu(): void {
    console.log("\n==================================================");
    console.log("   SISTEM INVENTARIS & KASIR TOKO KAYU SEJAHTERA  ");
    console.log("==================================================");
    console.log("1. Tambah Varian Kayu Baru (Create)");
    console.log("2. Lihat Semua Katalog Kayu (Read All)");
    console.log("3. Lihat Detail Kayu by ID (Read Detail)");
    console.log("4. Ubah Data & Resupply Stok (Update)");
    console.log("5. Hapus Data Kayu (Delete)");
    console.log("6. Cari & Filter Kayu (Search)");
    console.log("7. Transaksi Kasir Penjualan");
    console.log("0. Keluar Aplikasi");
    console.log("==================================================");
}

// ============================================================================
// BAGIAN 3: PERULANGAN MENU UTAMA (Oleh: Muhammad Faizin Akbar)
// ============================================================================

// Fungsi utama untuk menjalankan siklus perulangan menu aplikasi
function jalankanAplikasi(): void {
    // Variabel penanda status program berjalan (tipe boolean, menggunakan let)
    let isRunning: boolean = true;

    // Perulangan while akan terus berjalan selama isRunning bernilai true
    while (isRunning) {
        tampilkanDaftarMenu();

        // Membaca input pilihan menu dari pengguna (tipe string)
        const pilihan: string = readlineSync.question("Pilih menu (0-7): ");

        // Seleksi kondisi switch untuk mengarahkan alur sesuai pilihan user
        switch (pilihan) {
            case "1":
                console.log("\n[INFO] Fitur Create akan diimplementasikan pada Progress 3.");
                break;
            case "2":
                console.log("\n[INFO] Fitur Read Semua Data akan diimplementasikan pada Progress 4.");
                break;
            case "3":
                console.log("\n[INFO] Fitur Read Detail by ID akan diimplementasikan pada Progress 4.");
                break;
            case "4":
                console.log("\n[INFO] Fitur Update & Resupply akan diimplementasikan pada Progress 5.");
                break;
            case "5":
                console.log("\n[INFO] Fitur Delete akan diimplementasikan pada Progress 5.");
                break;
            case "6":
                console.log("\n[INFO] Fitur Search akan diimplementasikan pada Progress 6.");
                break;
            case "7":
                console.log("\n[INFO] Fitur Kasir akan diintegrasikan dari kode UTS.");
                break;
            case "0":
                // Mengubah status menjadi false untuk menghentikan perulangan menu
                console.log("\nTerima kasih telah menggunakan Sistem Toko Kayu Sejahtera!");
                isRunning = false;
                break;
            default:
                // Penanganan kasus tepi apabila input menu tidak sesuai (bukan 0-7)
                console.log("\n[PERINGATAN] Pilihan tidak valid! Silakan masukkan angka 0 sampai 7.");
                break;
        }
    }
}

// Memanggil fungsi utama untuk memulai program
jalankanAplikasi();