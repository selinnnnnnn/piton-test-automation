// tests/pages/ElementsPage.js

class ElementsPage {
  constructor(page) {
    // Playwright page objesi: tüm sayfa etkileşimleri bunun üzerinden yapılır
    this.page = page;
    
    // =========================
    // TEXT BOX SAYFASI ELEMENTLERİ
    // =========================
    
    // Kullanıcının adını girdiği alan
    this.fullNameInput = page.getByRole('textbox', { name: 'Full Name' });
    
    // Email input alanı (placeholder üzerinden yakalanıyor)
    this.emailInput = page.getByRole('textbox', { name: 'name@example.com' });
    
    // Kullanıcının geçici adresi
    this.currentAddressInput = page.getByRole('textbox', { name: 'Current Address' });
    
    // Kalıcı adres alanı (ID ile seçiliyor)
    this.permanentAddressInput = page.locator('#permanentAddress');
    
    // Formu gönderen buton
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    
    // =========================
    // WEB TABLES SAYFASI ELEMENTLERİ
    // =========================
    
    // Yeni kayıt ekleme butonu
    this.addButton = page.getByRole('button', { name: 'Add' });
    
    // Yeni kullanıcı ekleme formu alanları
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' }); 
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.ageInput = page.getByRole('textbox', { name: 'Age' });
    this.salaryInput = page.getByRole('textbox', { name: 'Salary' });
    this.departmentInput = page.getByRole('textbox', { name: 'Department' });
    
    // =========================
    // DOĞRULAMA / OUTPUT ALANLARI
    // =========================
    
    // Tablo satırlarının bulunduğu ana container
    this.tableRows = page.locator('.rt-tbody');
    
    // Form submit sonrası ekranda gösterilen bilgiler
    this.outputName = page.locator('#output #name');
    this.outputEmail = page.locator('#output #email');
    
    
    this.outputCurrentAddress = page.locator('#output #currentAddress');
    this.outputPermanentAddress = page.locator('#output #permanentAddress');
    
    // Double click testi için buton
    this.doubleClickButton = page.getByRole('button', { name: 'Double Click Me' });
    
    // Double click sonrası çıkan mesaj
    this.doubleClickMessage = page.locator('#doubleClickMessage');

    // =========================
    // LINKS SAYFASI ELEMENTLERİ (TC_E03)
    // =========================
    
    // 404/Not Found sayfasına giden link
    this.notFoundLink = page.getByRole('link', { name: 'Not Found' });
    
    // Link tıklanınca dönen response mesajı
    this.linkResponseResponse = page.locator('#linkResponse');
  }

  // =========================
  // SAYFA NAVİGASYON FONKSİYONLARI
  // =========================
  
  // Text Box sayfasına gider
  async navigateToTextBox() {
    await this.page.goto('https://demoqa.com/text-box');
  }

  // =========================
  // FORM İŞLEMLERİ
  // =========================
  
  // Text Box formunu doldurur ve submit eder
  async fillTextBoxForm(name, email, currentAddress, permanentAddress) {
    await this.fullNameInput.fill(name);
    await this.emailInput.fill(email);
    await this.currentAddressInput.fill(currentAddress);
    await this.permanentAddressInput.fill(permanentAddress);
    await this.submitButton.click();
  }

  // Web Table formunu doldurur ve yeni kayıt ekler
  async fillWebTableForm(firstName, lastName, email, age, salary, department) {
    await this.addButton.click();
    await this.firstNameInput.fill(firstName); // First Name alanı
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.ageInput.fill(age);
    await this.salaryInput.fill(salary);
    await this.departmentInput.fill(department);
    await this.submitButton.click();
  }

  // =========================
  // ETKİLEŞİM TESTLERİ
  // =========================
  
  // Double click ve right click simülasyonu
  async clickDoubleClickButton() {
    // Sağ tık işlemi (context menu tetikleme)
    await this.doubleClickButton.click({ button: 'right' });
    
    // Normal sol tıklama
    await this.doubleClickButton.click();
  }

  // "Not Found" linkine tıklar
  async clickNotFoundLink() {
    await this.notFoundLink.click();
  }
}

module.exports = { ElementsPage };