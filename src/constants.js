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
    tag: { bm: 'KEPERLUAN', en: 'NEED' },
    opinion: {
      bm: 'Air mineral sangat penting untuk kesihatan dan harganya murah!',
      en: 'Mineral water is very important for health and it\'s cheap!'
    }
  },
  {
    id: 'bread',
    name: { bm: 'Roti', en: 'Bread' },
    price: 2,
    type: 'bread',
    need: 3,
    good: 3,
    tag: { bm: 'KEPERLUAN', en: 'NEED' },
    opinion: {
      bm: 'Roti memberi tenaga untuk kamu belajar dan bermain.',
      en: 'Bread gives you energy to learn and play.'
    }
  },
  {
    id: 'banana',
    name: { bm: 'Pisang', en: 'Banana' },
    price: 1,
    type: 'banana',
    need: 3,
    good: 3,
    tag: { bm: 'KEPERLUAN', en: 'NEED' },
    opinion: {
      bm: 'Pisang adalah snek sihat yang penuh dengan vitamin.',
      en: 'Banana is a healthy snack full of vitamins.'
    }
  },
  {
    id: 'milk',
    name: { bm: 'Susu Kotak', en: 'Milk Carton' },
    price: 3,
    type: 'milk',
    need: 2,
    good: 3,
    tag: { bm: 'KEPERLUAN', en: 'NEED' },
    opinion: {
      bm: 'Susu bagus untuk menguatkan tulang dan gigi kamu.',
      en: 'Milk is good for strengthening your bones and teeth.'
    }
  },
  {
    id: 'book',
    name: { bm: 'Buku Kecil', en: 'Small Book' },
    price: 4,
    type: 'book',
    need: 2,
    good: 2,
    tag: { bm: 'KEPERLUAN', en: 'NEED' },
    opinion: {
      bm: 'Membaca buku membantu kamu menjadi lebih bijak!',
      en: 'Reading books helps you become smarter!'
    }
  },
  {
    id: 'toy',
    name: { bm: 'Mainan Kecil', en: 'Small Toy' },
    price: 5,
    type: 'toy',
    need: 1,
    good: 1,
    tag: { bm: 'KEHENDAK', en: 'WANT' },
    opinion: {
      bm: 'Mainan memang seronok, tapi pastikan keperluan lain sudah cukup.',
      en: 'Toys are fun, but make sure other needs are met first.'
    }
  },
  {
    id: 'apple',
    name: { bm: 'Epal', en: 'Apple' },
    price: 1,
    type: 'apple',
    need: 3,
    good: 3,
    tag: { bm: 'KEPERLUAN', en: 'NEED' },
    opinion: {
      bm: 'Epal merah yang manis dan sangat baik untuk badan.',
      en: 'Sweet red apple that is very good for your body.'
    }
  },
  {
    id: 'pencil',
    name: { bm: 'Pensil', en: 'Pencil' },
    price: 1,
    type: 'pencil',
    need: 2,
    good: 2,
    tag: { bm: 'KEPERLUAN', en: 'NEED' },
    opinion: {
      bm: 'Pensil sangat berguna untuk kamu menulis dan melukis.',
      en: 'Pencils are very useful for you to write and draw.'
    }
  },
  {
    id: 'eraser',
    name: { bm: 'Pemadam', en: 'Eraser' },
    price: 1,
    type: 'eraser',
    need: 2,
    good: 2,
    tag: { bm: 'KEPERLUAN', en: 'NEED' },
    opinion: {
      bm: 'Pemadam kecil ini membantu membetulkan tulisan kamu.',
      en: 'This small eraser helps correct your writing.'
    }
  },
  {
    id: 'biscuits',
    name: { bm: 'Biskut', en: 'Biscuits' },
    price: 2,
    type: 'biscuits',
    need: 2,
    good: 2,
    tag: { bm: 'KEPERLUAN', en: 'NEED' },
    opinion: {
      bm: 'Biskut yang sedap untuk alas perut kamu.',
      en: 'Delicious biscuits to fill your stomach.'
    }
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
