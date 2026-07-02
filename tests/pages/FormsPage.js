// tests/pages/FormsPage.js

class FormsPage {
  constructor(page) {
    // Playwright page instance: tüm UI etkileşimleri buradan yapılır
    this.page = page;
    
    // =========================
    // FORM SAYFASI ELEMENTLERİ
    // =========================

    // Şehir seçim container'ı (dropdown/select yapı)
    this.cityContainer = page.locator('div').filter({ hasText: /^Select City$/ }).first();

    // Kişisel bilgi input alanları
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });

    // Gender radio button 
    this.genderRadio = page.getByRole('radio', { name: 'Female' });

    // Telefon numarası input alanı
    this.userNumberInput = page.getByRole('textbox', { name: 'Mobile Number' });

    // Form submit butonu
    this.submitButton = page.getByRole('button', { name: 'Submit' });

    // Submit sonrası açılan başarı modalı
    this.successModal = page.locator('.modal-content');

    // Modal kapatma butonu
    this.closeModalButton = page.getByRole('button', { name: 'Close' });

    // =========================
    // HOBBIES (CHECKBOX) ELEMENTLERİ
    // =========================

    // Checkbox label elementleri (UI üzerinden tıklama için)
    this.sportsCheckbox = page.getByText('Sports', { exact: true });
    this.readingCheckbox = page.getByText('Reading', { exact: true });

    // Checkbox input elementleri (DOM seviyesinde doğrulama için)
    this.sportsInput = page.locator('#hobbies-checkbox-1');
    this.readingInput = page.locator('#hobbies-checkbox-2');

    // =========================
    // FILE UPLOAD ELEMENTLERİ (TC_F04)
    // =========================

    // Dosya yükleme butonu (file input trigger)
    this.uploadButton = page.getByRole('button', { name: 'Choose File' });
  }

  // =========================
  // NAVİGASYON
  // =========================
  
  // Practice Form sayfasına gider
  async navigateToPracticeForm() {
    await this.page.goto('https://demoqa.com/automation-practice-form');
  }

  // =========================
  // FORM İŞLEMLERİ
  // =========================
  
  // Geçerli veri ile formu doldurur ve submit eder
  async submitValidForm(firstName, lastName, mobileNumber) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);

    // Cinsiyet seçimi (Female radio button)
    await this.genderRadio.check();

    await this.userNumberInput.fill(mobileNumber);

    // Submit butonu bazen ekran dışında olabildiği için scroll yapılır
    await this.submitButton.scrollIntoViewIfNeeded();

    // Force click: overlay veya UI engeli varsa bile tıklar
    await this.submitButton.click({ force: true });
  }

  // =========================
  // MODAL İŞLEMLERİ
  // =========================
  
  // Başarı modalını kapatır
  async closePreviewModal() {
    await this.closeModalButton.scrollIntoViewIfNeeded();
    await this.closeModalButton.click({ force: true });
  }

  // =========================
  // CHECKBOX İŞLEMLERİ
  // =========================
  
  // Hobi checkbox'larını seçer
  async selectHobbies() {
    await this.sportsCheckbox.click();
    await this.readingCheckbox.click();
  }

  // =========================
  // FILE UPLOAD TESTİ
  // =========================
  
  // Geçersiz dosya yükleme senaryosu
  async uploadInvalidFile(fileName) {
    await this.uploadButton.setInputFiles(fileName);
  }
}

module.exports = { FormsPage };