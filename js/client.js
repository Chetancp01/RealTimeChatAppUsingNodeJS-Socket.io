const socket = io('http://localhost:8000',{ transports : ['websocket'] });

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
let audio = new Audio('notification.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left') {
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '';
});

let Fname = prompt("Enter Your Name To Join");
socket.emit('new-user-joined',Fname);

socket.on('user-joined', name => {
    append(`${name} joined the chat`,'right')
});

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`,'left')
});

socket.on('left', name => {
    append(`${name} : left the chat`,'left')
});