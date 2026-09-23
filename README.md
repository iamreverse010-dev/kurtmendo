# 🎉 Doğum Günü Sürpriz Web Sitesi - Kullanım Kılavuzu

Arkadaşın için hazırlanan bu özel doğum günü sitesi, hiçbir kuruluma (Node.js, python vs.) ihtiyaç duymadan doğrudan çalışır!

---

## 🚀 Hemen Başlatma (Nasıl Açarım?)

1. Bu klasördeki **`index.html`** dosyasına **çift tıkla**.
2. Web sitesi doğrudan varsayılan tarayıcında (Chrome, Edge, Safari vb.) açılacaktır!
3. Ekrana gelen hediye kutusuna veya **"Hediyeyi Aç 🎁"** butonuna basarak kutlamayı başlatabilirsin.

---

## ✍️ Arkadaşına Göre Nasıl Özelleştirirsin?

Proje klasöründeki **`config.js`** dosyasını Not Defteri veya herhangi bir metin editörüyle açarak aşağıdaki alanları kolayca değiştirebilirsin:

1. **Arkadaşının İsmi (`friendName`)**:
   - Varsayılan: `"Canım Arkadaşım"`
   - Örneğin: `"Ayşe"`, `"Emre"`, `"Zeynep"` vb. yazabilirsin. Sitedeki tüm başlıklarda, kutlamalarda ve teşekkürlerde otomatik güncellenir.
2. **Kutlama Başlığı ve Alt Yazısı (`heroSubtitle`)**:
   - İçinden gelen samimi bir mesaj yazabilirsin.
3. **Kendi Fotoğraflarınızı Ekleme (`memories`)**:
   - Birlikte çekildiğiniz fotoğrafları `assets/images/` klasörüne kopyala (örneğin: `resim1.jpg`, `resim2.png`).
   - `config.js` içindeki `image: "assets/images/memory1.svg"` kısmını `image: "assets/images/resim1.jpg"` olarak değiştir.
4. **Kazı-Kazan Kartları (`scratchCards`)**:
   - Arkadaşının parmağıyla/faresiyle kazıyıp altını göreceği sürprizleri ve esprili kuponları dilediğin gibi yazabilirsin.
5. **Duygusal Mektup (`letter`)**:
   - Mektubun paragraflarını ve en alttaki imzanı istediğin gibi düzenleyebilirsin.
6. **Müzik (`backgroundMusicUrl`)**:
   - Dilersen sevdiğiniz bir şarkının `.mp3` dosyasını klasöre atıp adını buraya yazabilirsin (örneğin: `sarki.mp3`).
   - Boş bırakırsan sitenin yerleşik sevimli müzik kutusu doğum günü melodisi çalar!

---

## 🌟 Sitedeki Eğlenceli Özellikler

- 🎁 **3D Hediye Paketi Açılışı**: İlk açılışta heyecan uyandıran interaktif kutu.
- 🎂 **İnteraktif Doğum Günü Pastası**: Pastaya veya butona tıklandığında mumlar söner, duman efekti çıkar ve dilek mesajı parıldar.
- 🪙 **Kazı-Kazan Kartları**: Gerçek kazı-kazan gibi fare veya parmak hareketiyle kazınarak açılan sürpriz mesajlar.
- 📸 **Polaroid Duvarı**: Nostaljik mandallı/bantlı fotoğraflar, tıklandığında büyük boyutta anı hikayesini gösterir.
- 🎊 **Canlı Konfeti & Havai Fişek**: Sağ üstteki butonlar veya ana ekrandaki butonla gökyüzünde havai fişek patlatma.
- 📱 **Tam Mobil Uyumlu**: Hem bilgisayarda hem de telefonda kusursuz çalışır.

---

## 🌐 Arkadaşına Nasıl Gönderebilirsin?

1. **Klasörü Gönderme**: Bu klasörü `.zip` yapıp arkadaşına atabilirsin (çift tıklayıp açabilir).
2. **Ücretsiz İnternete Yükleme (Link ile Gönderme)**:
   - [Netlify Drop](https://app.netlify.com/drop) veya [Vercel](https://vercel.com) sitesine bu klasörü sürükleyip bırakarak 10 saniyede ücretsiz bir internet linki (örn: `ahmetin-surprizi.netlify.app`) alabilir ve arkadaşına WhatsApp'tan gönderebilirsin!
