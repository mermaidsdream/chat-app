import express from 'express';

const app = express();

const PORT = process.env.PORT || 5000;

app.use('/', (request, response) => {
    response.send('Server is running.');
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});



