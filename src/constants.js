export const BUDGET = 5;

export const moneyChoices = [
  { id: 'rm1', label: 'RM1', type: 'note1', value: 1 },
  { id: 'rm5', label: 'RM5', type: 'note5', value: 5 },
  { id: 'rm10', label: 'RM10', type: 'note10', value: 10 },
];

export const items = [
  {
    id: 'water',
    name: { bm: 'Air Mineral', en: 'Mineral Water' },
    price: 1,
    type: 'water',
    need: 3,
    good: 3,
    tag: { bm: 'KEPERLUAN', en: 'NEED' }
  },
  {
    id: 'bread',
    name: { bm: 'Roti', en: 'Bread' },
    price: 2,
    type: 'bread',
    need: 3,
    good: 3,
    tag: { bm: 'KEPERLUAN', en: 'NEED' }
  },
  {
    id: 'banana',
    name: { bm: 'Pisang', en: 'Banana' },
    price: 1,
    type: 'banana',
    need: 3,
    good: 3,
    tag: { bm: 'KEPERLUAN', en: 'NEED' }
  },
  {
    id: 'milk',
    name: { bm: 'Susu Kotak', en: 'Milk Carton' },
    price: 3,
    type: 'milk',
    need: 2,
    good: 3,
    tag: { bm: 'KEPERLUAN', en: 'NEED' }
  },
  {
    id: 'book',
    name: { bm: 'Buku Kecil', en: 'Small Book' },
    price: 4,
    type: 'book',
    need: 2,
    good: 2,
    tag: { bm: 'KEPERLUAN', en: 'NEED' }
  },
  {
    id: 'toy',
    name: { bm: 'Mainan Kecil', en: 'Small Toy' },
    price: 5,
    type: 'toy',
    need: 1,
    good: 1,
    tag: { bm: 'KEHENDAK', en: 'WANT' }
  },
];

export const flowSteps = [
  {
    type: 'look_money',
    title: { bm: 'Lihat Wang', en: 'Look at Money' },
    desc: { bm: 'Saya ada RM5.', en: 'I have RM5.' }
  },
  {
    type: 'look_price',
    title: { bm: 'Lihat Harga', en: 'Look at Price' },
    desc: { bm: 'Baca harga barang.', en: 'Read the item price.' }
  },
  {
    type: 'choose_item',
    title: { bm: 'Pilih Barang', en: 'Choose Item' },
    desc: { bm: 'Pilih barang yang sesuai.', en: 'Choose suitable items.' }
  },
  {
    type: 'calculate',
    title: { bm: 'Kira Jumlah', en: 'Calculate Total' },
    desc: { bm: 'Tambah harga barang.', en: 'Add the item prices.' }
  },
  {
    type: 'check_balance',
    title: { bm: 'Semak Baki', en: 'Check Balance' },
    desc: { bm: 'Pastikan wang cukup.', en: 'Ensure enough money.' }
  },
  {
    type: 'pay',
    title: { bm: 'Bayar', en: 'Pay' },
    desc: { bm: 'Bayar dengan sopan.', en: 'Pay politely.' }
  },
];

export const quiz = [
  {
    q: {
      bm: 'Kamu ada RM5. Roti RM2 dan air RM1. Adakah wang cukup?',
      en: 'You have RM5. Bread RM2 and water RM1. Is the money enough?'
    },
    options: {
      bm: ['Ya, cukup', 'Tidak cukup'],
      en: ['Yes, enough', 'Not enough']
    },
    answer: 0,
    explain: {
      bm: 'RM2 + RM1 = RM3. RM3 kurang daripada RM5.',
      en: 'RM2 + RM1 = RM3. RM3 is less than RM5.'
    }
  },
  {
    q: {
      bm: 'Apakah langkah pertama sebelum membeli barang?',
      en: 'What is the first step before buying an item?'
    },
    options: {
      bm: ['Lihat wang', 'Terus bayar', 'Ambil semua barang'],
      en: ['Look at money', 'Pay immediately', 'Take all items']
    },
    answer: 0,
    explain: {
      bm: 'Kita perlu tahu berapa banyak wang yang kita ada.',
      en: 'We need to know how much money we have.'
    }
  },
  {
    q: {
      bm: 'Jika jumlah harga RM6 tetapi kamu ada RM5, apakah tindakan bijak?',
      en: 'If the total price is RM6 but you have RM5, what is the wise action?'
    },
    options: {
      bm: ['Pilih barang lain', 'Marah juruwang', 'Ambil juga barang itu'],
      en: ['Choose another item', 'Get angry at cashier', 'Take the item anyway']
    },
    answer: 0,
    explain: {
      bm: 'Kita perlu pilih barang yang sesuai dengan bajet kita.',
      en: 'We need to choose items that fit our budget.'
    }
  },
  {
    q: {
      bm: 'Barang manakah lebih sesuai untuk waktu rehat?',
      en: 'Which item is more suitable for break time?'
    },
    options: {
      bm: ['Roti dan air mineral', 'Mainan kecil sahaja'],
      en: ['Bread and mineral water', 'Small toy only']
    },
    answer: 0,
    explain: {
      bm: 'Makanan berkhasiat lebih penting untuk kesihatan.',
      en: 'Nutritious food is more important for health.'
    }
  },
  {
    q: {
      bm: 'Mengapa kita perlu semak baki wang?',
      en: 'Why do we need to check the money balance?'
    },
    options: {
      bm: ['Supaya tahu wang cukup', 'Supaya boleh beli semua barang', 'Supaya boleh simpan wang'],
      en: ['To know if money is enough', 'To be able to buy everything', 'To be able to save money']
    },
    answer: 0,
    explain: {
      bm: 'Semak baki membantu kita memastikan kita tidak berbelanja lebih.',
      en: 'Checking the balance helps us ensure we don\'t overspend.'
    }
  },
];
