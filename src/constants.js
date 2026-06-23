export const BUDGET = 5;

export const moneyChoices = [
  { id: 'rm1', label: 'RM1', symbol: '💵', value: 1 },
  { id: 'rm5', label: 'RM5', symbol: '💷', value: 5 },
  { id: 'sen50', label: '50 sen', symbol: '🪙', value: 0.5 },
];

export const items = [
  { id: 'water', name: 'Air Ajaib 💧', price: 1, symbol: '🍶', need: 3, good: 3, tag: 'Minuman sihat' },
  { id: 'bread', name: 'Roti Super 🍞', price: 2, symbol: '🥪', need: 3, good: 3, tag: 'Makanan rehat' },
  { id: 'banana', name: 'Pisang Kuasa 🍌', price: 1, symbol: '🍌', need: 3, good: 3, tag: 'Buah' },
  { id: 'milk', name: 'Susu Bintang 🥛', price: 3, symbol: '🥛', need: 2, good: 3, tag: 'Minuman berkhasiat' },
  { id: 'book', name: 'Buku Ilmu 📘', price: 4, symbol: '📔', need: 2, good: 2, tag: 'Alat belajar' },
  { id: 'toy', name: 'Kotak Misteri 🎁', price: 5, symbol: '🎁', need: 1, good: 1, tag: 'Kehendak' },
];

export const flowSteps = [
  { icon: '💰', title: 'Misi 1: Cek Beg', desc: 'Saya ada RM5.' },
  { icon: '🏷️', title: 'Misi 2: Intip Harga', desc: 'Baca harga barang.' },
  { icon: '🛒', title: 'Misi 3: Pilih Barang', desc: 'Pilih barang yang sesuai.' },
  { icon: '➕', title: 'Misi 4: Kira Kuasa', desc: 'Tambah harga barang.' },
  { icon: '✅', title: 'Misi 5: Cek Baki', desc: 'Pastikan wang cukup.' },
  { icon: '🏆', title: 'Misi 6: Bayar & Menang', desc: 'Bayar dengan sopan.' },
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
    options: ['Air ajaib dan roti super', 'Kotak misteri sahaja'],
    answer: 0,
    explain: 'Air ajaib dan roti super lebih sesuai kerana membantu badan semasa rehat.'
  },
  {
    q: 'Apakah langkah pertama sebelum membeli?',
    options: ['Cek beg duit', 'Terus bayar', 'Ambil semua barang'],
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
