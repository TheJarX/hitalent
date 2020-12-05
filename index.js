require('dotenv').config()
const express = require('express');  
const mongoose = require('mongoose'); 
const path = require('path');
const routes = require('./src/routes')
const app = express();

app.use(express.static(path.join(require.main.path, 'public')));

app.use('/api', routes);

app.get('/', (req, res) => {
    res.sendFile('index.html')
});

app.use((req, res) => {
	res.status(404).sendFile(path.join(require.main.path, 'public', '404.html'));
});

try {
    mongoose.connect(
        `mongodb+srv://admin:${process.env.MONGODB_PW}@hitalent-cluster.aoai9.mongodb.net/hitalenttemp?retryWrites=true&w=majority`, 
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );
} catch (error) {
    console.error(error);
}

app.listen(process.env.PORT || 3000);
