import { test, expect } from '@playwright/test';

test('Verify full user flow for Dunia Syiling RM5', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Scene 1: Title Screen
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Dunia Syiling RM5');
  await page.click('button:has-text("Mulakan Misi")');

  // Scene 2: Briefing
  await expect(page.locator('h2')).toContainText('Arahan Misi');
  await page.click('button:has-text("Faham! Seterusnya")');

  // Scene 3: Identify Money
  await expect(page.locator('h2')).toContainText('Misi 1: Kenali RM5');
  await page.click('.item-card:has-text("RM5")', { force: true });
  await page.click('button:has-text("Teruskan")');

  // Scene 4: Agent Flow
  await expect(page.locator('h2')).toContainText('Misi 2: Susun Langkah Bijak');
  // Order: 1. Lihat Wang, 2. Lihat Harga, 3. Pilih Barang, 4. Kira Jumlah, 5. Semak Baki, 6. Bayar, 7. Simpan Baki
  const steps = ['Lihat Wang', 'Lihat Harga', 'Pilih Barang', 'Kira Jumlah', 'Semak Baki', 'Bayar', 'Simpan Baki'];
  for (const step of steps) {
    await page.click(`button:has-text("${step}")`, { force: true });
  }
  await page.click('button:has-text("Ke Kedai Mini")');

  // Scene 5: Shop
  await expect(page.locator('h2:has-text("Misi 3: Kedai Mini Didi")')).toBeVisible();
  await page.click('.item-card:has-text("Roti")', { force: true });
  await page.click('.item-card:has-text("Air Mineral")', { force: true });
  await page.click('button:has-text("Bayar Sekarang")');

  // Scene 6: Challenge 1
  await expect(page.locator('h2')).toContainText('Cabaran 1: Cukupkah Wang?');
  await page.click('button:has-text("Ya")');
  await page.click('button:has-text("Misi Seterusnya")');

  // Scene 7: Challenge 2
  await expect(page.locator('h2')).toContainText('Cabaran 2: Pilihan Bekal Bijak');
  await page.click('.item-card:has-text("Pilihan A")', { force: true });
  await page.click('button:has-text("Ia makanan sihat")');
  await page.click('button:has-text("Hantar Pilihan")');

  // Scene 8: Radar Chart
  await expect(page.locator('h2:has-text("Carta Bijak: Nilai Barang")')).toBeVisible();
  await page.click('button:has-text("Seterusnya: Kira Baki")');

  // Scene 9: Challenge 3
  await expect(page.locator('h2')).toContainText('Cabaran 3: Kira Baki Wang');
  await page.click('button:has-text("RM2")');
  await page.click('button:has-text("Selesaikan Misi")');

  // Scene 10: Reflection
  await expect(page.locator('h2')).toContainText('Refleksi Agen Didi');
  await page.click('button:has-text("Saya faham")');
  await page.click('button:has-text("Tamat Misi")');

  // Scene 11: Summary
  await expect(page.locator('h1')).toContainText('MISI BERJAYA!');
});
