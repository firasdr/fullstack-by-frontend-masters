const websocketOutput = document.querySelector('.output');
const inputBtn = document.querySelector('.input-box');

inputBtn.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        const query = event.target.value;
        event.target.value = '';
        sendQuery(query);
    }
});

let ws;
try {
    // local dev
    if (['localhost', '127.0.0.1', ''].includes(location.hostname)) {
        ws = new  WebSocket('ws://localhost:3000');
    }
} catch (e) {
    console.log('web socket init error', e)
}

function sendQuery(query) {
    ws.send(JSON.stringify({type: 'query', payload: query}))
}

ws.onmessage = function({ data }) {
    const msg = document.createElement('div');

    try {
        data = JSON.parse(data);
        const {type, payload} = data;

        switch(type) {
            case 'ping':
                console.log('pong')
                return;
            default: 
                msg.innerHTML = payload;
                webSocketOutput.prepend(msg); 
        }
    } catch (e) {
        console.log('websocket error', e)
    }
}