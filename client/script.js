import bot from './assets/bot.svg';
import user from './assets/user.svg';

// ---- Element Selection ----
const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');
const textarea = document.querySelector('textarea');

// ---- Utility Functions ----

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);
  return `id-${timestamp}-${hexadecimalString}`;
}

function loader(element) {
  element.textContent = '';
  loadInterval = setInterval(() => {
    element.textContent += '.';
    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;
  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function chatStripe(isAi, value, uniqueId) {
  return (
    `
    <div class='wrapper ${isAi ? 'ai' : ''}'>
      <div class='chat'>
        <div class='profile'>
          <img src='${isAi ? bot : user}' alt='${isAi ? 'bot' : 'user'}' />
        </div>
        <div class='message' id=${uniqueId}>${value}</div>
      </div>
    </div>
    `
  );
}

// ---- Event Handlers ----

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
  form.reset();
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  const messageDiv = document.getElementById(uniqueId);
  loader(messageDiv);

  const response = await fetch('https://webbot-9587.onrender.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: data.get('prompt') })
  });

  clearInterval(loadInterval);
  messageDiv.innerHTML = ' ';

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();
    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();
    messageDiv.innerHTML = 'Something Went Wrong';
    alert(err);
  }
};

// ---- Speech Recognition Logic ----

let recognition;
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  let finalTranscript = '';

  recognition.onresult = function(event) {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }
    textarea.value = finalTranscript + interimTranscript;
  };

  recognition.onspeechend = function() {
    recognition.stop();
    if (textarea.value.trim() !== "") {
      handleSubmit(new Event('submit'));
    }
  };

  recognition.onerror = function(event) {
    console.error(event.error);
  };

  textarea.addEventListener('click', function() {
    finalTranscript = '';
    recognition.start();
  });
}

// ---- Event Listeners ----

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    handleSubmit(e);
  }
});
