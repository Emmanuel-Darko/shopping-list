const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const path = require('path');
const config = require('config');

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();

// bodyParser middleware, now in express
app.use(express.json());

// DB config
const db = config.get('mongoURI');

// connect db
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(() => console.log('Database connected...'))
.catch(err => console.log(err))

// use Router
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

// serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started`));