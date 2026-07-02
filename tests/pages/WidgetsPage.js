// tests/pages/WidgetsPage.js

const { expect } = require('@playwright/test');

class WidgetsPage {
  constructor(page) {
    // Playwright page instance: tüm UI aksiyonları bu obje üzerinden yapılır
    this.page = page;
    
    // =========================
    // PROGRESS BAR (TC_W01)
    // =========================

    // Progress bar başlatma / durdurma butonu
    this.startStopButton = page.locator('#startStopButton');

    // Progress bar container (progress durumu kontrolü için)
    this.progressBar = page.locator('#progressBarContainer');

    // Progress tamamlandıktan sonra reset butonu
    this.resetButton = page.getByRole('button', { name: 'Reset' });

    // =========================
    // SLIDER (TC_W02)
    // =========================

    // Slider değer input alanı (anlık değeri okumak için)
    this.sliderValueInput = page.locator('#sliderValue');

    // =========================
    // MULTI SELECT (TC_W03)
    // =========================

    // Multi-select dropdown input alanı
    this.multiSelectInput = page.locator('div')
      .filter({ hasText: /^Multiselect drop down$/ })
      .locator('input');

    // Seçilen değerlerin UI üzerinde badge olarak görünmesi
    this.selectedBadges = page.locator('div[class*="multiValue"]');

    // =========================
    // MENU (TC_W05)
    // =========================

    // Ana menü item (hover ile alt menü açılır)
    this.mainItem2 = page.getByRole('link', { name: 'Main Item 2' });

    // Sub menu içindeki SUB SUB LIST linki
    this.subSubList = page.locator('a', { hasText: 'SUB SUB LIST' }); // FIX

    // En alt seviye menu item (click yapılır)
    this.subSubItem1 = page.getByRole('link', { name: 'Sub Sub Item 1' });
  }

  // =========================
  // PROGRESS BAR ACTIONS
  // =========================

  // Progress bar sayfasına gider
  async navigateToProgressBar() {
    await this.page.goto('https://demoqa.com/progress-bar');
  }

  // Progress bar başlatır
  async startProgress() {
    await this.startStopButton.click();
  }

  // Progress bar durdurur
  async stopProgress() {
    await this.startStopButton.click();
  }

  // =========================
  // SLIDER ACTIONS
  // =========================

  // Slider sayfasına gider
  async navigateToSlider() {
    await this.page.goto('https://demoqa.com/slider');
  }

  /// =========================
  // MENU ACTIONS 
  // =========================

  async navigateToMenu() {
    await this.page.goto('https://demoqa.com/menu');
  }

  async clickMenuSteps() {

  // 1. Ana menüyü hover ile aç 

  await this.mainItem2.hover();

  await this.mainItem2.click();

  // 2. Sub menu görünene kadar bekle

  await this.subSubList.waitFor({ state: 'visible' });

  // 3. Sub menu üzerine hover yap 

  await this.subSubList.hover();

  await this.subSubList.click();

  // 4. Final item görünene kadar bekle

  await this.subSubItem1.waitFor({ state: 'visible' });

 // 5. SON adım: click (asıl seçim burada yapılır)

  await this.subSubItem1.click();

} 

  // =========================
  // MULTI SELECT ACTIONS
  // =========================

  // Çoklu renk seçimi yapar
  async selectColors(colors) {
    const dropdownInput = this.page.locator('#react-select-4-input');
    
    for (const color of colors) {
      // Input'a odaklan
      await dropdownInput.click();

      // Renk yaz
      await dropdownInput.fill(color);

      // Dropdown seçim navigasyonu
      await this.page.keyboard.press('ArrowDown');
      await this.page.keyboard.press('Enter');

      // UI stabilitesi için kısa bekleme
      await this.page.waitForTimeout(1000);
    }
  }

  // Select Menu sayfasına gider
  async navigateToSelectMenu() {
    await this.page.goto('https://demoqa.com/select-menu');
  }
}

module.exports = { WidgetsPage };