const express = require('express');
const app = express();
const PORT = 8000;

const tarotCards = {
    'magician': {
        'name': 'The Magician',
        'image': '/images/a01.jpg',
        'description': 'This is the Magician.'
    },
    'popess': {
        'name': 'The Popess',
        'image': '/images/a02.jpg',
        'description': 'This is the Popess.'
    }
};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/api/:tarotCard', (req, res) => {
    const card = req.params.tarotCard.toLowerCase(); 
    tarotCards[card] ? res.json(tarotCards[card]) : res.json('Not found');
})

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}.`);
})
