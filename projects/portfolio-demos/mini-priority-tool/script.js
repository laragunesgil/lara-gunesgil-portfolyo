(function () {
  "use strict";
  const issues = [];
  const form = document.getElementById("sorun-formu");
  const nameField = document.getElementById("sorun-adi");
  const effectField = document.getElementById("etki");
  const reachField = document.getElementById("kapsam");
  const urgencyField = document.getElementById("aciliyet");
  const list = document.getElementById("sorun-listesi");
  const status = document.getElementById("durum");
  const clearButton = document.getElementById("temizle");
  function score(issue) { return issue.effect * 3 + issue.reach * 2 + issue.urgency; }
  function renderIssues() {
    list.replaceChildren();
    const sorted = issues.slice().sort(function (a, b) { return score(b) - score(a); });
    if (!sorted.length) { status.textContent = "Henüz sorun eklenmedi."; return; }
    status.textContent = sorted.length + " örnek sorun, puana göre sıralandı.";
    sorted.forEach(function (issue) {
      const item = document.createElement("li");
      const article = document.createElement("article");
      const heading = document.createElement("h3");
      const scoreText = document.createElement("p");
      const detail = document.createElement("p");
      article.className = "priority-card";
      heading.textContent = issue.name;
      scoreText.className = "score";
      scoreText.textContent = "Demo puanı: " + score(issue) + " / 30";
      detail.textContent = "Etki " + issue.effect + "/5 · Kapsam " + issue.reach + "/5 · Aciliyet " + issue.urgency + "/5";
      article.append(heading, scoreText, detail);
      item.append(article);
      list.append(item);
    });
  }
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = nameField.value.trim();
    if (!name) { nameField.setCustomValidity("Lütfen bir sorun adı yazın."); nameField.reportValidity(); return; }
    nameField.setCustomValidity("");
    issues.push({ name: name, effect: Number(effectField.value), reach: Number(reachField.value), urgency: Number(urgencyField.value) });
    form.reset();
    effectField.value = "3"; reachField.value = "3"; urgencyField.value = "3";
    renderIssues();
    nameField.focus();
  });
  nameField.addEventListener("input", function () { nameField.setCustomValidity(""); });
  clearButton.addEventListener("click", function () { issues.length = 0; renderIssues(); nameField.focus(); });
  renderIssues();
}());
