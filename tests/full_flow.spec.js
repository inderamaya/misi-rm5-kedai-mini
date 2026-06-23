import { test, expect } from '@playwright/test';

test('Verify full user flow and props', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Home Screen
  await expect(page.locator('h1')).toContainText('Misi Super RM5');
  await page.screenshot({ path: 'full_flow_1_home.png' });

  // Go to Intro
  await page.click('button:has-text("Mula Misi")');
  await expect(page.locator('h1')).toContainText('Hai Pembeli Bijak!');
  await page.screenshot({ path: 'full_flow_2_intro.png' });

  // Go to Money
  await page.click('button:has-text("Seterusnya: Kenali Wang")');
  await expect(page.locator('h1')).toContainText('Kenali Wang');
  await page.click('button:has-text("RM5")', { force: true }); // Select RM5
  await page.screenshot({ path: 'full_flow_3_money.png' });

  // Go to Flow
  await page.click('button:has-text("Seterusnya: Peta Alir")');
  await expect(page.locator('h1')).toContainText('Peta Alir');
  // Click steps in order
  const steps = page.locator('.flowStep');
  for (let i = 0; i < 6; i++) {
    await steps.nth(i).click();
  }
  await page.screenshot({ path: 'full_flow_4_flow.png' });

  // Go to Shop
  await page.click('button:has-text("Seterusnya: Misi Kedai")');
  await expect(page.locator('h1')).toContainText('Kedai Mini Maya');
  await page.click('button:has-text("Roti Super")', { force: true });
  await page.click('button:has-text("Air Ajaib")', { force: true });
  await page.screenshot({ path: 'full_flow_5_shop.png' });

  // Go to Wise Choice
  await page.click('button:has-text("Seterusnya: Pilihan Bijak")');
  await expect(page.locator('h1')).toContainText('Carta Bijak');
  await page.screenshot({ path: 'full_flow_6_wise.png' });

  // Go to Quiz
  await page.click('button:has-text("Seterusnya: Kuiz")');
  await expect(page.locator('h1')).toContainText('Kuiz Pembeli Bijak');
  await page.screenshot({ path: 'full_flow_7_quiz.png' });
});
