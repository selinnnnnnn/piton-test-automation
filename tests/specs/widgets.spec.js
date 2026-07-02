// tests/specs/widgets.spec.js

const { test, expect } = require('@playwright/test');
const { WidgetsPage } = require('../pages/WidgetsPage');

test.describe('DemoQA - Widgets Modülü Testleri', () => {

  // Test suite genel ayar: service worker bloklama
  // Amaç: UI üzerinde olası reklam, overlay veya performans kaynaklı sorunları azaltmak
  test.use({ serviceWorkers: 'block' });


  // =========================
  // TC_W01 - PROGRESS BAR NEGATIVE / EARLY STOP TEST
  // =========================

  test('TC_W01 - Progress Bar - Yükleme Devam Ederken Erken Resetleme Kontrolü', async ({ page }) => {
    const widgetsPage = new WidgetsPage(page);

    // Progress bar sayfasına git
    await widgetsPage.navigateToProgressBar();

    // Progress başlat
    await widgetsPage.startProgress();

    // UI progress süreci için kısa bekleme
    await page.waitForTimeout(2000);

    // Progress durdur
    await widgetsPage.stopProgress();

    // Reset butonu görünür olmalı (progress state kontrolü)
    await expect(widgetsPage.resetButton).toBeVisible({ timeout: 3000 });
  });


  // =========================
  // TC_W02 - SLIDER INPUT VALIDATION
  // =========================

  test('TC_W02 - Slider - Manuel Değer Girişi Kontrolü', async ({ page }) => {
    const widgetsPage = new WidgetsPage(page);

    // Slider sayfasına git
    await widgetsPage.navigateToSlider();

    // Slider input alanına odaklan
    await widgetsPage.sliderValueInput.click();

    // Manuel değer girme simülasyonu
    await page.keyboard.type('50');

    // Girilen değerin doğrulanması
    await expect(widgetsPage.sliderValueInput).toHaveValue('50');
  });


  // =========================
  // TC_W04 - PROGRESS BAR STATE STABILITY TEST
  // =========================

  test('TC_W04 - Progress Bar - Durdurma Butonu Fonksiyonu', async ({ page }) => {
    const widgetsPage = new WidgetsPage(page);

    // Progress bar sayfasına git
    await widgetsPage.navigateToProgressBar();

    // Progress başlat
    await widgetsPage.startProgress();

    // UI stabilizasyon beklemesi
    await page.waitForTimeout(1500);

    // Progress durdur
    await widgetsPage.stopProgress();

    // İlk state okunur
    const percentageTextBefore = await widgetsPage.progressBar.innerText();

    // State değişimini gözlemek için bekleme
    await page.waitForTimeout(1000);

    // İkinci state okunur
    const percentageTextAfter = await widgetsPage.progressBar.innerText();

    // Progress durduktan sonra değer sabit kalmalı
    expect(percentageTextBefore).toBe(percentageTextAfter);
  });


  // =========================
  // TC_W05 - MENU NAVIGATION TEST
  // =========================

  test('TC_W05 - Menu - Alt Menü Elemanlarının Tetiklenmesi', async ({ page }) => {
    const widgetsPage = new WidgetsPage(page);

    // Menu sayfasına git
    await widgetsPage.navigateToMenu();

    // Hover + click zinciri ile menu navigation
    await widgetsPage.clickMenuSteps();

    // En alt menu item görünür olmalı
    await expect(widgetsPage.subSubItem1).toBeVisible();
  });


  // =========================
  // TC_W03 - MULTI SELECT VALIDATION
  // =========================

  test('TC_W03 - Select Menu - Çoklu Renk Seçimi Kontrolü', async ({ page }) => {
    const widgetsPage = new WidgetsPage(page);

    // Select menu sayfasına git
    await widgetsPage.navigateToSelectMenu();

    // Seçilecek renk listesi
    const renkler = ['Green', 'Blue'];

    // Renk seçim işlemi
    await widgetsPage.selectColors(renkler);

    // =========================
    // ASSERTIONS
    // =========================

    // Seçilen her rengin UI üzerinde görünmesi beklenir
    for (const renk of renkler) {
      await expect(page.locator(`div:has-text("${renk}")`).first())
        .toBeVisible();
    }
  });

});