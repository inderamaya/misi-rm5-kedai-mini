import { test, expect } from '@playwright/test';

test('Verify full user flow for Akademi Agen RM5', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Scene 1: Title Screen
  await expect(page.getByRole('main').locator('h1')).toContainText('Akademi Agen RM5');
  await page.click('button:has-text("Mulakan Misi")');

  // Scene 2: Briefing
  await expect(page.locator('h2')).toContainText('Arahan Misi');
  await page.click('button:has-text("Scan Complete: Seterusnya")');

  // Scene 3: Identify Money
  await expect(page.locator('h2')).toContainText('Kenali Wang');
  await page.click('.money-card:has-text("RM5")', { force: true });
  await page.click('button:has-text("Teruskan")');

  // Scene 4: Agent Flow
  await expect(page.locator('h2')).toContainText('Peta Alir Agen');
  const nodes = page.locator('.flow-node');
  for (let i = 0; i < 7; i++) {
    await nodes.nth(i).click({ force: true });
  }
  await page.click('button:has-text("Ke Kedai")');

  // Scene 5: Holographic Shop
  await expect(page.locator('h2:has-text("Holographic Shop")')).toBeVisible();
  await page.click('.item-card:has-text("Roti")', { force: true });
  await page.click('.item-card:has-text("Air mineral")', { force: true });
  await page.click('button:has-text("Confirm")');

  // Scene 6: Challenge 1
  await expect(page.locator('h2')).toContainText('Cabaran 1: Cukup atau Tidak?');
  await page.click('button:has-text("Ya")');
  await page.click('button:has-text("Misi Seterusnya")');

  // Scene 7: Challenge 2
  await expect(page.locator('h2')).toContainText('Cabaran 2: Pilihan Agen Bijak');
  await page.click('.money-card:has-text("Air mineral + roti")', { force: true });
  await page.fill('textarea', 'Kombinasi keperluan yang baik.');
  await page.click('button:has-text("Hantar")');

  // Scene 8: Radar Chart
  await expect(page.locator('h2:has-text("Carta Radar Bijak")')).toBeVisible();
  await page.fill('textarea', 'Pilihan bijak kerana ia adalah keperluan.');
  await page.click('button:has-text("Seterusnya")');

  // Scene 9: Challenge 3
  await expect(page.locator('h2')).toContainText('Cabaran 3: Kira Baki Agen');
  await page.click('button:has-text("RM2")');
  await page.click('button:has-text("Selesaikan Misi")');

  // Scene 10: Reflection
  await expect(page.locator('h2')).toContainText('Refleksi Agen');
  await page.click('button:has-text("Saya faham")');
  await page.click('button:has-text("Tamat Misi")');

  // Scene 11: Summary
  await expect(page.getByRole('main').locator('h1')).toContainText('MISI BERJAYA!');
});
