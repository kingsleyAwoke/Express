const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3500;


// get home page
app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

/// get a new page 
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});


// page redirctor
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, 'new-page.html');
});

// Route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('tempting to load html');
    next()
}, (req, res) => {
    res.send('Hello World');
});


// middleware handler
const one = (req, res, next) => {
    console.log('one');
    next();
}
const two = (req, res, next) => {
    console.log('two');
    next();
}
const three = (req, res) => {
    console.log('three');
    res.send('finished!');
}

app.get('./chain(.html)?', [one, two, three]);


//404 page render
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));