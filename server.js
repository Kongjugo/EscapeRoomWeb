const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'main.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const validUsername = "이성훈";
    const validPassword = "61011216";

    if (username === validUsername && password === validPassword) {
        res.redirect('/login');
    } else {
        res.send('Invalid username or password.');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
