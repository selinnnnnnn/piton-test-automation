// tests/specs/elements.spec.js

const { test, expect } = require('@playwright/test');
const { ElementsPage } = require('../pages/ElementsPage');

test.describe('DemoQA - Elements Modülü Testleri', () => {

  // =========================
  // TEXT BOX TEST CASE
  // =========================
  
  test('TC_E05 - Text Box - Geçerli Veri Girişi Doğrulaması', async ({ page }) => {
    const elementsPage = new ElementsPage(page);

    // Sayfaya navigasyon
    await elementsPage.navigateToTextBox();

    // Form doldurma işlemi
    await elementsPage.fillTextBoxForm(
      'john doe',
      'test@test.com',
      'Lorem ipsum dolor sit amet...',
      'Lorem ipsum dolor sit amet...'
    );

    // =========================
    // ASSERTIONS (DOĞRULAMALAR)
    // =========================

    // Girilen isim output alanında görünmeli
    await expect(elementsPage.outputName).toContainText('john doe');

    // Email doğrulaması
    await expect(elementsPage.outputEmail).toContainText('test@test.com');

    // Adres doğrulaması (kısmi kontrol yapılır)
    await expect(elementsPage.outputCurrentAddress).toContainText('Lorem ipsum');
    await expect(elementsPage.outputPermanentAddress).toContainText('Lorem ipsum');
  });


  // =========================
  // WEB TABLES NEGATIVE TEST
  // =========================

  test('TC_E01 - Web Tables - İsim Alanına Sayı Girilmesi', async ({ page }) => {
    const elementsPage = new ElementsPage(page);

    // Web tables sayfasına git
    await page.goto('https://demoqa.com/webtables');

    // Hatalı veri girişi (isim alanına numeric değer)
    await elementsPage.fillWebTableForm('1', 'doe', 'test@test.com', '30', '5000', 'finance');

    // Sistem bu veriyi kabul etmemeli (negatif senaryo)
    await expect(elementsPage.tableRows).not.toContainText('1');
  });


  // =========================
  // BUTTONS - NEGATIVE DOUBLE CLICK TEST
  // =========================

  test('TC_E02 - Buttons - Double Click (Negatif Test)', async ({ page }) => {
    const elementsPage = new ElementsPage(page);

    // Buttons sayfasına navigasyon
    await page.goto('https://demoqa.com/buttons');

    // Sağ click + normal click simülasyonu
    await elementsPage.clickDoubleClickButton();

    // =========================
    // ASSERTION
    // =========================

    // Double click mesajı çıkmamalı (negatif kontrol)
    await expect(elementsPage.doubleClickMessage).toBeHidden();
  });


  // =========================
  // LINKS - API STATUS VALIDATION
  // =========================

  test('TC_E03 - Links - API Durum Kodlarının Doğrulanması', async ({ page }) => {
    const elementsPage = new ElementsPage(page);

    // Links sayfasına git
    await page.goto('https://demoqa.com/links');

    // Broken link'e tıkla
    await elementsPage.clickNotFoundLink();

    // API response doğrulaması (404 kontrolü)
    await expect(elementsPage.linkResponseResponse)
      .toContainText('Link has responded with status 404 and status text Not Found');
  });


  // =========================
  // WEB TABLES - SPECIAL CHARACTER VALIDATION
  // =========================

  test('TC_E04 - Web Tables - Departman Alanına Özel Karakter Girilmesi Kontrolü', async ({ page }) => {
    const elementsPage = new ElementsPage(page);

    // Web tables sayfasına git
    await page.goto('https://demoqa.com/webtables');

    // Özel karakter içeren departman input testi
    await elementsPage.fillWebTableForm('john', 'doe', 'test@test.com', '20', '1000', '&*?');

    // =========================
    // ASSERTION
    // =========================

    // Sistem bu özel karakterleri kabul etmemeli
    await expect(elementsPage.tableRows).not.toContainText('&*?');
  });

});