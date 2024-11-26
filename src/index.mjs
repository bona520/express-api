import express from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const users = [
    { id: 1, name: 'matina', username: "matina123" },
    { id: 2, name: 'thim', username: "thim123" },
    { id: 3, name: 'nath', username: "nath123" },
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
    console.log(req.query)
    const { query: { filter, value } } = req;
    console.log(filter, value);
    if (filter && value) return res.status(200).send(users.filter(user => user[filter].includes(value)));
    return res.status(200).send(users);
});
app.post('/api/users', (req, res) => {
    console.log(req.body);
    const { body } = req;
    const newUser = { id: users[users.length - 1].id + 1, ...body };
    users.push(newUser);
    return res.status(201).send(newUser);
});

app.put('/api/users/:id', (req, res) => {
    console.log(req.params, req.body);
    const passedId = parseInt(req.params.id);
    if (isNaN(passedId)) return res.status(400).send({ message: 'Invalid ID supplied' });

    const findUser = users.find(user => user.id === passedId);
    if (!findUser) return res.status(404).send({ message: 'User not found' });

    const { body } = req;
    const updatedUser = { ...findUser, ...body };
    users[passedId - 1] = updatedUser;
    console.log('this users[passedId - 1]', users[passedId - 1])
    res.status(200).send(updatedUser);
});

app.patch('/api/users/:id', (req, res) => {
    console.log(req.params, req.body);
    const passedId = parseInt(req.params.id);
    if (isNaN(passedId)) return res.status(400).send({ message: 'Invalid ID supplied' });

    const findUser = users.find(user => user.id === passedId);
    if (!findUser) return res.status(404).send({ message: 'User not found' });

    const { body } = req;
    const updatedUser = { ...findUser, ...body };
    users[passedId - 1] = updatedUser;
    res.status(200).send(updatedUser);
});

app.delete('/api/users/:id', (req, res) => {
    console.log(req.params)
    const passedId = parseInt(req.params.id);
    if (isNaN(passedId)) return res.status(400).send({ message: 'Invalid ID supplied' });

    const findUser = users.find(user => user.id === passedId);
    if (!findUser) return res.status(404).send({ message: 'User not found' });

    users.splice(passedId - 1, 1);
    res.status(204).send();
});
app.get('/api/users/:id', (req, res) => {
    console.log(req.params)
    const passedId = parseInt(req.params.id);
    if (isNaN(passedId)) return res.status(400).send({ message: 'Invalid ID supplied' });

    const findUser = users.find(user => user.id === passedId);
    if (!findUser) return res.status(404).send({ message: 'User not found' });
    res.status(200).send(findUser);
});

app.get('/api/products', (req, res) => {
    res.status(200).send(products);
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});