const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textArea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
      image: './img/drink.jpg',
      text: "I'm Thirsty"
    },
    {
      image: './img/food.jpg',
      text: "I'm Hungry"
    },
    {
      image: './img/tired.jpg',
      text: "I'm Tired"
    },
    {
      image: './img/hurt.jpg',
      text: "I'm Hurt"
    },
    {
      image: './img/happy.jpg',
      text: "I'm Happy"
    },
    {
      image: './img/angry.jpg',
      text: "I'm Angry"
    },
    {
      image: './img/sad.jpg',
      text: "I'm Sad"
    },
    {
      image: './img/scared.jpg',
      text: "I'm Scared"
    },
    {
      image: './img/outside.jpg',
      text: 'I Want To Go Outside'
    },
    {
      image: './img/home.jpg',
      text: 'I Want To Go Home'
    },
    {
      image: './img/school.jpg',
      text: 'I Want To Go To School'
    },
    {
      image: './img/grandma.jpg',
      text: 'I Want To Go To Grandmas'
    }
  ];

data.forEach(createBox);

function createBox(item){

    const {image , text} = item;

    const boxEl = document.createElement('div');
    boxEl.classList.add('box');

    boxEl.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p>
    `;

    boxEl.addEventListener('click',()=>{
      setTextMessage(text);
      speakText();

      // Add Active classs
      boxEl.classList.add('active');
  
      setTimeout(()=> boxEl.classList.remove('active'),800);
    })

    main.appendChild(boxEl);
}

// Init speech synthesis
const message = new SpeechSynthesisUtterance();

// Store Voices
let voices= [];

function getVoices(){
  console.log('Hello')
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = `${voice.name}`;
        option.innerText = `${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option);
    })
};

// Set the Text
function setTextMessage(text){
  message.text = text;
}

// Speak the text
function speakText(){
  speechSynthesis.speak(message);
}

// Set the Voice of the message to the selected voice
function changeVoice(e){
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices change
speechSynthesis.addEventListener('voiceschanged' , getVoices)

// Event Listeners
toggleBtn.addEventListener('click', ()=> document.getElementById('text-box').classList.toggle('show'));

closeBtn.addEventListener('click', ()=> document.getElementById('text-box').classList.remove('show'));

voicesSelect.addEventListener('change', changeVoice);

readBtn.addEventListener('click' , (e)=>{
  setTextMessage(textArea.value);
  speakText();
})

getVoices();