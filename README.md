

# Piton & GNS Web Test Otomasyon Projesi

##  Proje Açıklaması
Bu proje, Piton Technology vaka çalışması kapsamında geliştirilmiştir. Amaç, Playwright kullanarak web UI test otomasyonu oluşturmak ve aynı zamanda keşif testi (exploratory testing) yaparak web uygulamalarını analiz etmektir.

Proje iki ana bölümden oluşmaktadır:
- Bölüm A: UI Test Otomasyonu (DemoQA)
- Bölüm B: Keşif Testi (Kurumsal Web Siteleri)

## Kullanılan Teknolojiler
- Node.js
- JavaScript
- Playwright
- Visual Studio Code
- Page Object Model (POM)

 Kurulum (Setup)
1-Projeyi klonlayın
git clone <repo-link>
cd piton-test-automation

2- Node.js bağımlılıklarını yükleyin
npm install

3- Playwright kurulumunu yapın
npx playwright install

 Testleri Çalıştırma
 Tüm testleri Chromium üzerinde (tek worker, headless)
npx playwright test --project=chromium --workers=1

  Tarayıcı açık (headed mode)
npx playwright test --project=chromium --headed


Test Kapsamı
 Bölüm A – DemoQA Otomasyon
•	Elements Modülü 
•	Forms Modülü 
•	Widgets Modülü 
•	Pozitif ve negatif test senaryoları 
 Bölüm B – Keşif Testi
Aşağıdaki sitelerde manuel keşif testi yapılmıştır:
•	https://www.gnsmetal.com/
•	https://piton.com.tr/ 

İncelenen alanlar:
•	UX (kullanıcı deneyimi) 
•	Navigasyon akışları 
•	Form validasyonları 
•	UI tutarlılığı 
•	Responsive tasarım 
•	Sayfa performansı 

Test Yaklaşımı

•	Page Object Model (POM) kullanılmıştır 
•	Kodlar modüler ve yeniden kullanılabilir yapıdadır 
•	Testler mantıksal olarak ayrıştırılmıştır 
•	Clean code prensiplerine uyulmuştur 
•	Page Object Model (POM) kullanılmıştır 
•	Hem positive hem negative senaryolar yazılmıştır 
•	Modüler ve tekrar kullanılabilir yapı hedeflenmiştir 
•	Keşif testleri kullanıcı bakış açısıyla gerçekleştirilmiştir 

Bulgular
Keşif testi ve otomasyon sırasında:
•	Form validasyon eksiklikleri 
•	UI iyileştirme alanları 
•	Dil tutarlılığı problemleri 
gibi çeşitli bulgular tespit edilmiştir.
	

 Video Kaydı
Projeye ait video burada paylaşılmıştır.
 Video Linki: https://drive.google.com/drive/folders/19PoXNn8aY0GWWNJglkXhazmobi-Zj7IW?usp=drive_link


 Raporlar
Projeye ait test senaryoları ve test sonuçları aşağıdaki dosyalarda yer almaktadır:
•	TestCases_.xlsx 
•	proje_raporu.docx


test
