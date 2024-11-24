import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Den Smith' },
    { id: 3, name: 'Jane Doe' },
];

const products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
];

app.get('/', (req, res) => {
    res.status(201).send({ message: 'Hello World!' });
});

app.get('/api/users', (req, res) => {
    res.status(200).send(users);
});

app.get('/api/products', (req, res) => {
    res.status(200).send(products);
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});