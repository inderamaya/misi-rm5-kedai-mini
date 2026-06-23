export const BUDGET = 5;

export const moneyChoices = [
  { id: 'rm1', label: 'RM1', symbol: '💵', value: 1 },
  { id: 'rm5', label: 'RM5', symbol: '💷', value: 5 },
  { id: 'rm10', label: 'RM10', symbol: '💴', value: 10 },
];

export const items = [
  { id: 'water', name: 'Air Mineral', price: 1, symbol: '💧', need: 3, good: 3, tag: 'Keperluan' },
  { id: 'bread', name: 'Roti', price: 2, symbol: '🍞', need: 3, good: 3, tag: 'Keperluan' },
  { id: 'banana', name: 'Pisang', price: 1, symbol: '🍌', need: 3, good: 3, tag: 'Keperluan' },
  { id: 'milk', name: 'Susu Kotak', price: 3, symbol: '🥛', need: 2, good: 3, tag: 'Keperluan' },
  { id: 'book', name: 'Buku Kecil', price: 4, symbol: '📘', need: 2, good: 2, tag: 'Kehendak' },
  { id: 'toy', name: 'Mainan Kecil', price: 5, symbol: '🧸', need: 1, good: 1, tag: 'Kehendak' },
];

export const flowSteps = [
  { icon: '💰', title: 'Lihat Wang', desc: 'Saya ada RM5.' },
  { icon: '🏷️', title: 'Lihat Harga', desc: 'Baca harga barang.' },
  { icon: '🛒', title: 'Pilih Barang', desc: 'Pilih barang yang sesuai.' },
  { icon: '➕', title: 'Kira Jumlah', desc: 'Tambah harga barang.' },
  { icon: '✅', title: 'Semak Baki', desc: 'Pastikan wang cukup.' },
  { icon: '🏆', title: 'Bayar', desc: 'Bayar dengan sopan.' },
];

export const quiz = [
  {
    q: 'Kamu ada RM5. Roti RM2 dan air RM1. Adakah wang cukup?',
    options: ['Ya, cukup', 'Tidak cukup'],
    answer: 0,
    explain: 'RM2 + RM1 = RM3. RM3 kurang daripada RM5.'
  },
  {
    q: 'Apakah langkah pertama sebelum membeli barang?',
    options: ['Lihat wang', 'Terus bayar', 'Ambil semua barang'],
    answer: 0,
    explain: 'Kita perlu tahu berapa banyak wang yang kita ada.'
  },
  {
    q: 'Jika jumlah harga RM6 tetapi kamu ada RM5, apakah tindakan bijak?',
    options: ['Pilih barang lain', 'Marah juruwang', 'Ambil juga barang itu'],
    answer: 0,
    explain: 'Kita perlu pilih barang yang sesuai dengan bajet kita.'
  },
  {
    q: 'Barang manakah lebih sesuai untuk waktu rehat?',
    options: ['Roti dan air mineral', 'Mainan kecil sahaja'],
    answer: 0,
    explain: 'Makanan berkhasiat lebih penting untuk kesihatan.'
  },
  {
    q: 'Mengapa kita perlu semak baki wang?',
    options: ['Supaya tahu wang cukup', 'Supaya boleh beli semua barang', 'Supaya boleh simpan wang'],
    answer: 0,
    explain: 'Semak baki membantu kita memastikan kita tidak berbelanja lebih.'
  },
];
