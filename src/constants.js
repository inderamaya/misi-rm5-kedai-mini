export const BUDGET = 5;

export const moneyChoices = [
  { id: 'rm1', label: 'RM1', symbol: '💵', value: 1 },
  { id: 'rm5', label: 'RM5', symbol: '💷', value: 5 },
  { id: 'sen50', label: '50 sen', symbol: '🪙', value: 0.5 },
];

export const items = [
  { id: 'water', name: 'Air Mineral', price: 1, symbol: '💧', need: 3, good: 3, tag: 'Minuman sihat' },
  { id: 'bread', name: 'Roti', price: 2, symbol: '🍞', need: 3, good: 3, tag: 'Makanan rehat' },
  { id: 'banana', name: 'Pisang', price: 1, symbol: '🍌', need: 3, good: 3, tag: 'Buah' },
  { id: 'milk', name: 'Susu Kotak', price: 3, symbol: '🥛', need: 2, good: 3, tag: 'Minuman berkhasiat' },
  { id: 'book', name: 'Buku Kecil', price: 4, symbol: '📘', need: 2, good: 2, tag: 'Alat belajar' },
  { id: 'toy', name: 'Mainan Kecil', price: 5, symbol: '🧸', need: 1, good: 1, tag: 'Kehendak' },
];

export const flowSteps = [
  { icon: '👀', title: 'Lihat Wang', desc: 'Saya ada RM5.' },
  { icon: '🏷️', title: 'Lihat Harga', desc: 'Baca harga barang.' },
  { icon: '🛒', title: 'Pilih Barang', desc: 'Pilih barang yang sesuai.' },
  { icon: '➕', title: 'Kira Jumlah', desc: 'Tambah harga barang.' },
  { icon: '✅', title: 'Semak Baki', desc: 'Pastikan wang cukup.' },
  { icon: '🤝', title: 'Bayar', desc: 'Bayar dengan sopan.' },
];

export const quiz = [
  {
    q: 'Kamu ada RM5. Roti RM2 dan air RM1. Adakah wang cukup?',
    options: ['Ya, cukup', 'Tidak cukup'],
    answer: 0,
    explain: 'RM2 + RM1 = RM3. Baki RM2.'
  },
  {
    q: 'Barang manakah lebih sesuai untuk waktu rehat?',
    options: ['Air mineral dan roti', 'Mainan kecil sahaja'],
    answer: 0,
    explain: 'Air mineral dan roti lebih sesuai kerana membantu badan semasa rehat.'
  },
  {
    q: 'Apakah langkah pertama sebelum membeli?',
    options: ['Lihat wang', 'Terus bayar', 'Ambil semua barang'],
    answer: 0,
    explain: 'Kita perlu tahu jumlah wang dahulu.'
  },
  {
    q: 'Jika jumlah harga RM6 tetapi kamu ada RM5, apakah tindakan bijak?',
    options: ['Pilih barang lain', 'Marah juruwang', 'Ambil juga barang itu'],
    answer: 0,
    explain: 'Kita perlu pilih barang yang cukup dengan wang.'
  },
];
