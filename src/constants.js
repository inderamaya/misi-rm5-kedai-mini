export const BUDGET = 5;

export const moneyChoices = [
  { id: '10sen', label: '10 sen', type: 'coin10', value: 0.1 },
  { id: '20sen', label: '20 sen', type: 'coin20', value: 0.2 },
  { id: '50sen', label: '50 sen', type: 'coin50', value: 0.5 },
  { id: 'rm1', label: 'RM1', type: 'note1', value: 1 },
  { id: 'rm5', label: 'RM5', type: 'note5', value: 5, highlight: true },
];

export const items = [
  { id: 'water', name: 'Air Mineral', price: 1, type: 'water', category: 'KEPERLUAN', need: 3, good: 3 },
  { id: 'bread', name: 'Roti', price: 2, type: 'bread', category: 'KEPERLUAN', need: 3, good: 3 },
  { id: 'banana', name: 'Pisang', price: 1, type: 'banana', category: 'KEPERLUAN', need: 3, good: 3 },
  { id: 'milk', name: 'Susu Kotak', price: 3, type: 'milk', category: 'KEPERLUAN', need: 3, good: 3 },
  { id: 'book', name: 'Buku Kecil', price: 4, type: 'book', category: 'KEPERLUAN', need: 2, good: 2 },
  { id: 'toy', name: 'Mainan Kecil', price: 5, type: 'toy', category: 'KEHENDAK', need: 1, good: 1 },
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
  question: 'Kamu ada RM5. Kamu pilih Roti RM2 dan Susu RM3. Cukupkah wang kamu?',
  options: [
    { label: 'Ya', correct: true, feedback: 'Betul! RM2 + RM3 = RM5. Syiling Bonus untuk kamu!' },
    { label: 'Tidak', correct: false, feedback: 'Cuba lagi. Mari kira semula bersama-sama.' }
  ]
};

export const challenge2 = {
  question: 'Pilih dua barang yang paling penting untuk bekal sekolah.',
  options: [
    { id: 'A', label: 'Air Mineral + Roti', items: ['water', 'bread'], description: 'Sangat bagus! Ini makanan berkhasiat.' },
    { id: 'B', label: 'Mainan Kecil + Gula-gula', items: ['toy', 'candy'], description: 'Ini kehendak, bukan keperluan utama.' },
    { id: 'C', label: 'Buku Kecil + Air Mineral', items: ['book', 'water'], description: 'Pilihan bijak untuk minda yang cergas!' }
  ]
};

export const challenge3 = {
  question: 'Kamu beli Air Mineral RM1 dan Roti RM2. Kamu bayar guna RM5. Berapakah baki?',
  options: [
    { label: 'RM1', correct: false, feedback: 'Kira lagi sekali. RM5 tolak RM3...' },
    { label: 'RM2', correct: true, feedback: 'Hebat! RM5 - RM3 = RM2. Kamu lulus misi ini!' },
    { label: 'RM3', correct: false, feedback: 'Hampir tepat. Mari kira baki yang betul.' }
  ]
};
