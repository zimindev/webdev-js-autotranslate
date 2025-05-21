let translations = {};

// Завантаження JSON-файлу з перекладами
fetch('json/translations.json')
  .then(response => response.json())
  .then(data => {
    translations = data;

    // Після завантаження — активуємо кнопки
    document.querySelectorAll('.translate-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const block = e.target.closest('.block');
        const textEl = block.querySelector('.text');
        const id = textEl.dataset.id;
        const translated = translations[id];

        if (!translated) return;

        button.disabled = true;
        button.style.opacity = '0.5';
        typeWriterEffect(textEl, translated, 40);
        setTimeout(() => {
          button.style.display = 'none';
        }, translated.length * 40 + 400);
      });
    });
  });

// Функція для ефекту "друкарської машинки"
function typeWriterEffect(element, text, speed = 40) {
  element.textContent = "";
  let i = 0;

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  element.appendChild(cursor);

  const typing = setInterval(() => {
    if (i < text.length) {
      element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
      i++;
    } else {
      clearInterval(typing);
      cursor.remove();
    }
  }, speed);
}
