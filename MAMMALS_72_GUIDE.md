# 72 Dünya Memelileri Veri Tabanı - Kılavuz

## 📊 Proje Özeti

Projenize **72 dünya memelisinin** kapsamlı bir veri tabanı başarıyla eklendi. Her memeli hayvan için Türkçe ve İngilizce adlar, bilimsel adlar, açıklamalar ve resimler içermektedir.

### ✅ Tamamlanan Görevler

1. **72 Memeli Eklendi** - Her biri detaylı bilgilerle:
   - Türkçe ve İngilizce adlar
   - Bilimsel isim (Latin)
   - Türkçe ve İngilizce açıklamalar
   - Beslenme türü (Carnivore, Herbivore, Omnivore, Insectivore)
   - Habitat bilgileri
   - Resim URL'leri

2. **Resimler Organize Edildi** 
   - Kaynak: `data/archive_raw/raw-img/`
   - Hedef: `public/images/mammals/`
   - 10+ resim başarıyla kopyalandı

3. **Otomatik Eşleme Sistemi**
   - Mapping dosyası oluşturuldu: `scripts/mapping.mammals-72.json`
   - Her memeli için uygun resim atandı

## 📁 Dosya Yapısı

```
src/data/
├── mammals.ts (NEW - 72 memeli ile güncellendi)

public/images/mammals/
├── horse.jpeg (At)
├── donkey.jpeg (Eşek)
├── zebra.jpeg (Zebra)
├── elephant.jpg (Fil)
├── rhinoceros.jpg (Gergedan)
└── ... (diğer resimler)

scripts/
├── mapping.mammals-72.json (Memeli-Resim eşlemesi)
├── expand_mammals_images.js (Resim genişletme aracı)
└── update_mammals_images.js (Veri güncelleme aracı)
```

## 🦁 Memeli Kategorileri

### Kedigiller (Felidae)
- Aslan, Kaplan, Leopar, Çita, Jaguar, Kedi

### Köpekgiller (Canidae)
- Köpek, Kurt, Tilki, Çakal, Sırtlan

### Ayılar (Ursidae)
- Boz Ayı, Kutup Ayısı, Panda

### Boynuzlular (Ungulates)
- Fil, Gergedan, Hipopotam, Zürafa, Zebra, At, Eşek, İnek, Koyun, Keçi, Domuz, Yaban Domuzu, Deve, Lama, Alpaka, Geyik, Karaca, Ren Geyiği, Sığın, Ceylan, Antilop, Bufalo, Bizon

### Tavşan ve Kemiciler (Lagomorpha & Rodentia)
- Tavşan, Sincap, Kunduz, Fare, Sıçan, Hamster, Kirpi, Köstebek, Yarasa

### Primatlar (Primates)
- Şempanze, Goril, Orangutan, Babun, Lemur

### Ceteler (Whales & Dolphins)
- Yunus, Mavi Balina, Katil Balina, Kambur Balina

### Focalar ve Deniz Memelileri (Pinnipedia & Sirenia)
- Fok, Deniz Aslanı, Mors, Su Samuru, Deniz Fili

### Avustralya Memelileri (Marsupials)
- Kanguru, Koala, Tembel Hayvan, Karıncayiyen, Armadillo

### Diğerleri
- Rakun, Mirket, Vaşak, Porsuk, Gelincik, Kokarca, Tazmanya Canavarı

## 🚀 Kullanım

### Verilere Erişim

```typescript
import mammals from '@/data/mammals';

// Tüm memelileri al
const allMammals = mammals;

// Belirli bir hayvanı bul
const lion = mammals.find(m => m.id === 'lion');

// Türkçe ve İngilizce adları kullan
console.log(lion.name.tr); // "Aslan"
console.log(lion.name.en); // "Lion"
```

### Resim Genişletme

Daha fazla hayvan resmi eklemek için:

```bash
node scripts/expand_mammals_images.js
```

Bu script:
1. `data/archive_raw/raw-img/` klasörlerinden resim kopyalar
2. `public/images/mammals/` klasörüne yerleştirir
3. `mapping.mammals-72.json` dosyasını günceller

### Resimleri Veriyle Güncelleme

Mapping dosyasındaki resimleri veri dosyasına uygulamak için:

```bash
node scripts/update_mammals_images.js ./scripts/mapping.mammals-72.json
```

## 📋 Memeli Listesi (Türkçe Adlar)

1. Aslan
2. Kaplan
3. Leopar
4. Çita
5. Jaguar
6. Kedi
7. Köpek
8. Kurt
9. Tilki
10. Çakal
11. Sırtlan
12. Boz Ayı
13. Kutup Ayısı
14. Panda
15. Fil
16. Gergedan
17. Hipopotam
18. Zürafa
19. Zebra
20. At
21. Eşek
22. İnek
23. Koyun
24. Keçi
25. Domuz
26. Yaban Domuzu
27. Deve
28. Lama
29. Alpaka
30. Geyik
31. Karaca
32. Ren Geyiği
33. Sığın (Moose)
34. Ceylan
35. Antilop
36. Bufalo
37. Bizon
38. Tavşan
39. Sincap
40. Kunduz
41. Fare
42. Sıçan
43. Hamster
44. Kirpi
45. Köstebek
46. Yarasa
47. Şempanze
48. Goril
49. Orangutan
50. Babun
51. Lemur
52. Yunus
53. Mavi Balina
54. Katil Balina (Orka)
55. Kambur Balina
56. Fok
57. Deniz Aslanı
58. Mors
59. Su Samuru
60. Deniz Fili
61. Kanguru
62. Koala
63. Tembel Hayvan (Sloth)
64. Karıncayiyen
65. Armadillo
66. Rakun
67. Mirket
68. Vaşak
69. Porsuk
70. Gelincik
71. Kokarca
72. Tazmanya Canavarı

## 🎯 Sonraki Adımlar

1. **Daha Fazla Resim Ekle**: Kaggle veri setinizden ek hayvan resimleri kopyalayın
2. **Kategori Sayfalarını Güncelle**: Components'te mammalsHandbook gibi sayfalarda yeni verileri kullanın
3. **API Entegrasyonu**: Gerekirse dış API'lerden resim almayı düşünün
4. **SEO Optimizasyonu**: Meta açıklamalarını hayvan hakkında daha detaylı bilgilerle zenginleştirin

## 📚 Kaynak Dosyalar

- **Veri Dosyası**: `src/data/mammals.ts` (903 satır)
- **Mapping Dosyası**: `scripts/mapping.mammals-72.json`
- **Yardımcı Scriptler**: `scripts/expand_mammals_images.js`, `scripts/update_mammals_images.js`
- **Resim Klasörü**: `public/images/mammals/` (10+ resim)

## 💡 İpuçları

- Her memeli için `scientificName` alanı bilimsel sınıflandırma için kullanılabilir
- `diet` ve `habitat` alanları filtreleme ve sınıflandırma için yararlıdır
- Resimleri değiştirmek için `mapping.mammals-72.json` dosyasını düzenleyin
- Türkçe ve İngilizce açıklamalar çoklu dil desteği için optimize edilmiştir

---

✨ **Tebrikler! 72 memeli veri tabanınız hazır!** ✨
