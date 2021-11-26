const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});