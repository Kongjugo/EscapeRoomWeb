const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const port = 3000;

// Static file serving
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // JSON 요청을 처리하기 위해 추가

// Main page route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'main.html'));
});

// POST 요청을 처리하여 cmd 명령어 실행 후 GET 요청으로 리다이렉트

// 여기 exex 코드 수정해야함
app.post('/FindStudent', (req, res) => {
    // cmd 명령어 실행 (예시: Get-Date)
    exec('cmd.exe /c "echo %date%"', (error, stdout, stderr) => {
        if (error) {
            res.status(500).send(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            res.status(500).send(`stderr: ${stderr}`);
            return;
        }

        // cmd 실행 결과는 출력하지 않지만 필요한 작업을 하고
        // 이후 findStudent.html로 리다이렉트
        console.log(`stdout: ${stdout}`);

        // 리디렉션을 통해 GET 요청으로 findStudent.html을 렌더링
        res.redirect('/FineStudent'); // /findStudent 경로로 리다이렉트
    });
});

// FindStudent 페이지를 위한 GET 요청 처리
app.get('/FineStudent', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'findStudent.html'));
});

app.get('/quiz', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'quiz.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
