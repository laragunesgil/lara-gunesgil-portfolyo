(function () {
  "use strict";
  const form = document.getElementById("soru-formu");
  const theme = document.getElementById("tema");
  const focus = document.getElementById("odak");
  const group = document.getElementById("topluluk");
  const output = document.getElementById("soru-metni");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const topic = theme.value;
    const population = group.value.trim() || "seçilen topluluk";
    output.textContent = topic.charAt(0).toLocaleUpperCase("tr-TR") + topic.slice(1) +
      " konusunda " + population + " için " + focus.value + " nasıl şekillenmektedir?";
  });
}());
