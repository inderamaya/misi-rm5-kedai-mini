export const BUDGET = 5;

export const moneyChoices = [
  { id: 'rm1', label: 'RM1', type: 'note1', value: 1 },
  { id: 'rm5', label: 'RM5', type: 'note5', value: 5 },
  { id: 'rm10', label: 'RM10', type: 'note10', value: 10 },
];

export const items = [
  { id: 'water', name: 'Air Mineral', price: 1, type: 'water', need: 3, good: 3, tag: 'KEPERLUAN' },
  { id: 'bread', name: 'Roti', price: 2, type: 'bread', need: 3, good: 3, tag: 'KEPERLUAN' },
  { id: 'banana', name: 'Pisang', price: 1, type: 'banana', need: 3, good: 3, tag: 'KEPERLUAN' },
  { id: 'milk', name: 'Susu Kotak', price: 3, type: 'milk', need: 2, good: 3, tag: 'KEPERLUAN' },
  { id: 'book', name: 'Buku Kecil', price: 4, type: 'book', need: 2, good: 2, tag: 'KEPERLUAN' },
  { id: 'toy', name: 'Mainan Kecil', price: 5, type: 'toy', need: 1, good: 1, tag: 'KEHENDAK' },
];

export const flowSteps = [
  { type: 'look_money', title: 'Lihat Wang', desc: 'Saya ada RM5.' },
  { type: 'look_price', title: 'Lihat Harga', desc: 'Baca harga barang.' },
  { type: 'choose_item', title: 'Pilih Barang', desc: 'Pilih barang yang sesuai.' },
  { type: 'calculate', title: 'Kira Jumlah', desc: 'Tambah harga barang.' },
  { type: 'check_balance', title: 'Semak Baki', desc: 'Pastikan wang cukup.' },
  { type: 'pay', title: 'Bayar', desc: 'Bayar dengan sopan.' },
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
