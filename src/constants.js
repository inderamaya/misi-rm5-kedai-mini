export const BUDGET = 5;

export const moneyChoices = [
  { id: '10sen', label: '10 sen', type: 'coin10', value: 0.1 },
  { id: '20sen', label: '20 sen', type: 'coin20', value: 0.2 },
  { id: '50sen', label: '50 sen', type: 'coin50', value: 0.5 },
  { id: 'rm1', label: 'RM1', type: 'note1', value: 1 },
  { id: 'rm5', label: 'RM5', type: 'note5', value: 5, highlight: true },
];

export const items = [
  { id: 'water', name: 'Air mineral', price: 1, type: 'water', category: 'KEPERLUAN', need: 3, good: 3 },
  { id: 'bread', name: 'Roti', price: 2, type: 'bread', category: 'KEPERLUAN', need: 3, good: 3 },
  { id: 'banana', name: 'Pisang', price: 1, type: 'banana', category: 'KEPERLUAN', need: 3, good: 3 },
  { id: 'milk', name: 'Susu kotak', price: 3, type: 'milk', category: 'KEPERLUAN', need: 3, good: 3 },
  { id: 'book', name: 'Buku kecil', price: 4, type: 'book', category: 'KEPERLUAN', need: 2, good: 2 },
  { id: 'toy', name: 'Mainan kecil', price: 5, type: 'toy', category: 'KEHENDAK', need: 1, good: 1 },
];

export const flowSteps = [
  { id: 1, title: 'Lihat Wang', type: 'look_money' },
  { id: 2, title: 'Lihat Harga', type: 'look_price' },
  { id: 3, title: 'Pilih Barang', type: 'choose_item' },
  { id: 4, title: 'Kira Jumlah', type: 'calculate' },
  { id: 5, title: 'Semak Baki', type: 'check_balance' },
  { id: 6, title: 'Bayar', type: 'pay' },
  { id: 7, title: 'Simpan Baki', type: 'save_balance' },
];

export const challenge1 = {
  question: 'Kamu ada RM5. Kamu pilih roti RM2 dan susu RM3. Adakah wang kamu cukup?',
  options: [
    { label: 'Ya', correct: true, feedback: 'Betul! RM2 + RM3 = RM5.' },
    { label: 'Tidak', correct: false, feedback: 'Cuba lagi. Kira semula.' }
  ]
};

export const challenge2 = {
  question: 'Kamu ada RM5. Pilih dua barang untuk misi rehat.',
  options: [
    { id: 'A', label: 'Air mineral + roti', items: ['water', 'bread'], description: 'Kombinasi keperluan yang baik.' },
    { id: 'B', label: 'Mainan kecil + gula-gula', items: ['toy', 'candy'], description: 'Ini adalah kehendak.' },
    { id: 'C', label: 'Buku kecil + air mineral', items: ['book', 'water'], description: 'Pilihan yang bagus untuk minda dan badan.' }
  ]
};

export const challenge3 = {
  question: 'Kamu ada RM5. Kamu beli air mineral RM1 dan roti RM2. Berapakah baki wang kamu?',
  options: [
    { label: 'RM1', correct: false, feedback: 'Cuba lagi, agen.' },
    { label: 'RM2', correct: true, feedback: 'RM5 - RM3 = RM2. Misi berjaya!' },
    { label: 'RM3', correct: false, feedback: 'Cuba lagi, agen.' }
  ]
};
