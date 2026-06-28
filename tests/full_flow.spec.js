import { test, expect } from '@playwright/test';

test('Verify full user flow and props', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Home Screen
  await expect(page.locator('h1')).toContainText('Selamat Datang');
  await page.screenshot({ path: 'full_flow_1_home.png' });

  // Go to Intro
  await page.click('button:has-text("Mulakan Misi")');
  await expect(page.locator('h1')).toContainText('Hai Pembeli Bijak!');
  await page.screenshot({ path: 'full_flow_2_intro.png' });

  // Go to Level 1: Money
  await page.click('button:has-text("Seterusnya: Kenali Wang")');
  await expect(page.locator('h1')).toContainText('Kenali Wang');
  await page.click('button:has-text("RM5")', { force: true }); // Select RM5
  await page.screenshot({ path: 'full_flow_3_money.png' });

  // Go to Level 2: Flow
  await page.click('button:has-text("Seterusnya: Peta Alir")');
  await expect(page.locator('h1')).toContainText('Peta Alir Pembeli Bijak');
  // Click steps in order
  const steps = page.locator('.stepping-stone');
  for (let i = 0; i < 6; i++) {
    await page.waitForTimeout(600); // Wait for feedback animation
    await steps.nth(i).click({ force: true });
  }
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'full_flow_4_flow.png' });

  // Go to Level 3: Shop
  await page.click('button:has-text("Seterusnya: Misi Kedai")');
  await expect(page.locator('h1')).toContainText('Kedai Mini Ajaib');
  await page.click('button:has-text("Roti")', { force: true });
  await page.click('button:has-text("Roti")', { force: true }); // Add second roti
  await page.click('button:has-text("Air Mineral")', { force: true });
  await page.screenshot({ path: 'full_flow_5_shop.png' });

  // Go to Level 4: Wise Choice
  await page.click('button:has-text("Seterusnya: Pilihan Bijak")');
  await expect(page.locator('h1')).toContainText('Carta Bijak');
  await page.screenshot({ path: 'full_flow_6_wise.png' });

  // Go to Level 5: Quiz
  await page.click('button:has-text("Seterusnya: Kuiz")');
  await expect(page.locator('h1')).toContainText('Kuiz Pengukuhan');
  await page.screenshot({ path: 'full_flow_7_quiz.png' });
});
