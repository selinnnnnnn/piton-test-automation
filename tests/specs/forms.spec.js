// tests/specs/forms.spec.js

const { test, expect } = require('@playwright/test');
const { FormsPage } = require('../pages/FormsPage');
const path = require('path');

test.describe('DemoQA - Forms Modülü Testleri', () => {

  // Test suite seviyesinde genel config
  // Service worker bloklama: UI'da reklam/overlay veya donma sorunlarını azaltmak için
  test.use({ serviceWorkers: 'block' });


  // =========================
  // TC_F01 - NEGATIVE / DEPENDENCY CHECK
  // =========================
  
  test('TC_F01 - Practice Form - Bağımlılık Kontrolü', async ({ page }) => {
    const formsPage = new FormsPage(page);

    // Practice form sayfasına git
    await formsPage.navigateToPracticeForm();

    // City dropdown tetiklenir
    await formsPage.cityContainer.click();

    // Dropdown menu DOM üzerinden yakalanır
    const cityMenu = page.locator('.css-26l3qy-menu');

    // Beklenen sonuç: menu açılmamalı (dependency / UI bug kontrolü)
    await expect(cityMenu).not.toBeVisible();
  });


  // =========================
  // TC_F02 - MODAL BEHAVIOR TEST
  // =========================

  test('TC_F02 - Practice Form - Önizleme Ekranı Kapatma Butonu Fonksiyonu', async ({ page }) => {
    const formsPage = new FormsPage(page);

    // Sayfaya git
    await formsPage.navigateToPracticeForm();

    // Formu doldur ve submit et
    await formsPage.submitValidForm('Jane', 'Doe', '1223334444');

    // Başarı modalı görünmeli
    await expect(formsPage.successModal).toBeVisible();

    // Modal kapatma işlemi
    await formsPage.closePreviewModal();

    // Modal kapanmış olmalı
    await expect(formsPage.successModal).not.toBeVisible();
  });


  // =========================
  // TC_F03 - CHECKBOX MULTI SELECTION TEST
  // =========================

  test('TC_F03 - Practice Form - Çoklu Hobi Seçimi Kontrolü', async ({ page }) => {
    const formsPage = new FormsPage(page);

    // Sayfaya git
    await formsPage.navigateToPracticeForm();
    
    // Checkbox label elementleri (UI üzerinden tıklama)
    const sportsCheckbox = page.locator('label[for="hobbies-checkbox-1"]');
    const readingCheckbox = page.locator('label[for="hobbies-checkbox-2"]');
    
    // Checkbox seçimleri
    await sportsCheckbox.click();
    await readingCheckbox.click();
    
    // DOM seviyesinde doğrulama
    await expect(page.locator('#hobbies-checkbox-1')).toBeChecked();
    await expect(page.locator('#hobbies-checkbox-2')).toBeChecked();
  });


  // =========================
  // TC_F04 - FILE UPLOAD NEGATIVE TEST
  // =========================

  test('TC_F04 - Practice Form - Invalid file type should be rejected', async ({ page }) => {
    const formsPage = new FormsPage(page);

    // Sayfaya git
    await formsPage.navigateToPracticeForm();

    // Minimum valid form data
    await formsPage.firstNameInput.fill('Jane');
    await formsPage.lastNameInput.fill('Doe');
    await formsPage.genderRadio.check();
    await formsPage.userNumberInput.fill('0000000000');

    // Geçersiz dosya yükleme
    await formsPage.uploadInvalidFile('accuracy95.txt');

    // Form submit
    await formsPage.submitButton.click();

    // =========================
    // ASSERTIONS (NEGATIVE SCENARIO)
    // =========================

    // Dosya upload path görünmemeli
    await expect(page.locator('#uploadedFilePath')).not.toBeVisible();

    // Dosya adı UI'da görünmemeli
    await expect(page.getByText('accuracy95.txt')).not.toBeVisible();

    // Başarı modalı açılmamalı
    await expect(formsPage.successModal).not.toBeVisible();
  });


  // =========================
  // TC_F05 - PHONE NUMBER VALIDATION
  // =========================

  test('TC_F05 - Practice Form - Telefon Numarası Hane Kontrolü', async ({ page }) => {
    const formsPage = new FormsPage(page);

    // Sayfaya git
    await formsPage.navigateToPracticeForm();

    // Valid form submit
    await formsPage.submitValidForm('Jane', 'Doe', '1223334444');

    // Başarı modalı görünmeli
    await expect(formsPage.successModal).toBeVisible();
  });

});