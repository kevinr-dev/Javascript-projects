const webSocketLink = 'ws://localhost:8080';

const webSocketTimeout = 5000;
let webSocket;
let connected = false;
let msgSent = false;
let isIntervalRunning = false;

const chat = document.getElementById("chat");
const messageInput = document.getElementById("message");
const statusText = document.getElementById('status');
const sendButton = document.getElementById("send");

connect();

function addMessage(messageContent, user)
{
    const message = document.createElement('div');
    message.classList.add("message",user);
    message.textContent = messageContent;
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
}

function checkConnection() {
    if(webSocket.readyState != WebSocket.OPEN) {
        connect();
    }
}

function connect()
{
    if(isIntervalRunning) {
        clearInterval(checkConnection);
    }
    webSocket = new WebSocket(webSocketLink);
    
    statusText.textContent =  "Connecting...";
    sendButton.disabled = true;
    if (!sendButton.classList.contains('disabled')) {
        sendButton.classList.add('disabled');
    }
    connected = false;

    const connectTimer = setTimeout(() => {
        if (!connected) {
          webSocket.close();
          connect();
        }
    }, webSocketTimeout);

    webSocket.onopen = () => {
        clearTimeout(connectTimer);
        connected = true;
        statusText.textContent = 'Connected';
        sendButton.disabled = false;
        sendButton.classList.remove('disabled');
        setInterval(checkConnection, 3000);
        isIntervalRunning = true;
    };
    webSocket.onmessage = (event) => {
        if (!msgSent)
        {
            handleReceivedBlob(event.data);
        }
        msgSent = false;
    };
}

function sendMessage() {
    const msg = messageInput.value.trim();
    if (!msg || !connected) return;
    msgSent = true;
    webSocket.send(msg);
    addMessage(msg, 'main');
    messageInput.value = '';
  }

  function handleReceivedBlob(blob) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const text = event.target.result;
        console.log('Received text:', text);
        addMessage(text, "other");
    };
    reader.onerror = function(error) {
        console.error('Error reading Blob:', error);
    };
    reader.readAsText(blob);
}