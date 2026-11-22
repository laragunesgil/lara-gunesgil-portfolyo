(function () {
  "use strict";
  const records = [
    { title: "Örnek mahallede uygun fiyatlı konuta erişim", category: "Barınma", detail: "Kurgusal örnek: konut seçenekleri hakkında topluluk görüşmesi." },
    { title: "Gençlerin eğitim kaynaklarına ulaşması", category: "Eğitim", detail: "Kurgusal örnek: eğitim desteği ve bilgiye erişim." },
    { title: "Yeni gelenlerin yerel hizmetleri öğrenmesi", category: "Göç", detail: "Kurgusal örnek: hizmet bilgisi ve yönlendirme." },
    { title: "Gençler için güvenli kamusal alanlar", category: "Gençlik", detail: "Kurgusal örnek: ortak alan kullanımı." },
    { title: "Çalışanların işyeri hakları hakkında bilgi edinmesi", category: "Çalışma hayatı", detail: "Kurgusal örnek: hak bilgisine erişim." },
    { title: "Öğrenciler için barınma desteği bilgisi", category: "Barınma", detail: "Kurgusal örnek: destek seçeneklerini bulma." }
  ];
  const searchInput = document.getElementById("arama");
  const categorySelect = document.getElementById("kategori");
  const list = document.getElementById("kayit-listesi");
  const count = document.getElementById("sonuc-sayisi");
  const emptyMessage = document.getElementById("bos-sonuc");
  function renderRecords() {
    const query = searchInput.value.trim().toLocaleLowerCase("tr-TR");
    const category = categorySelect.value;
    const filtered = records.filter(function (record) {
      return record.title.toLocaleLowerCase("tr-TR").includes(query) &&
        (category === "hepsi" || record.category === category);
    });
    list.replaceChildren();
    count.textContent = filtered.length + " örnek kayıt gösteriliyor.";
    emptyMessage.hidden = filtered.length > 0;
    filtered.forEach(function (record) {
      const article = document.createElement("article");
      const tag = document.createElement("span");
      const heading = document.createElement("h3");
      const detail = document.createElement("p");
      article.className = "issue-card";
      tag.className = "tag";
      tag.textContent = record.category;
      heading.textContent = record.title;
      detail.textContent = record.detail;
      article.append(tag, heading, detail);
      list.append(article);
    });
  }
  searchInput.addEventListener("input", renderRecords);
  categorySelect.addEventListener("change", renderRecords);
  renderRecords();
}());
