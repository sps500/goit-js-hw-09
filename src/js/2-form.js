document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.feedback-form');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');

  // Перевірка стану локального сховища під час завантаження сторінки
  function checkLocalStorage() {
    const savedFormData = localStorage.getItem('feedback-form-state');
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      emailInput.value = formData.email;
      messageInput.value = formData.message;
    } else {
      emailInput.value = '';
      messageInput.value = '';
    }
  }

  checkLocalStorage(); // Викликаємо функцію перевірки при завантаженні сторінки

  // Функція для зберігання даних у локальне сховище
  function saveFormData() {
    const formData = {
      email: emailInput.value.trim(),
      message: messageInput.value.trim(),
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  }

  // Відстеження подій input і збереження даних
  form.addEventListener('input', saveFormData);

  // Обробник події сабміту форми
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Перевірка на наявність даних у полях форми перед відправкою
    if (email && message) {
      console.log({ email, message });

      // Очищення сховища і полів форми
      localStorage.removeItem('feedback-form-state');
      emailInput.value = '';
      messageInput.value = '';
    } else {
      alert('Please fill in all fields before submitting.');
    }
  });
});
