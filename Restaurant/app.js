const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const app = express();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Directory to save uploaded files
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage: storage });

// Create MySQL connection
const connection = mysql.createConnection({
        // host: 'localhost',
        // user: 'root',
        // password: '',
        // database: 'c237_restaurant'
        host: 'mysql-foodexpress.alwaysdata.net',
        user: '371283',
        password: 'p@ssw0rd', // << Not his pw
        database: 'foodexpress_2024'
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Set up view engine
app.set('view engine', 'ejs');
// enable static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
// Define routes
// Example:

app.get('/', (req, res) => {    
    res.render('index');
});

app.get('/home', (req, res) => {
    res.render('index');
});

app.get('/menu', (req, res) => {
    const sql = 'SELECT * FROM menu';
    // Fetch data from MySQL
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving items');
        }
        // Render HTML page with data
        res.render('menu', { menu: results });
    });
});

app.get('/item/:id', (req, res) => {
    const itemId = req.params.id;
    const sql = 'SELECT * FROM menu WHERE itemId = ?';
    connection.query(sql, [itemId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving item by ID');
        }
        if (results.length > 0) {
            res.render('item', { item: results[0] });
        } else {
            res.status(404).send('Item not found');
        }
    });
});

app.get('/contact', function(req, res) {
    res.render('contact');
});

app.post('/submit', (req, res) => {
    const { name, email, contactNo, comment } = req.body;
    
    res.render('submitted', {name, email, contactNo, comment})
});

app.get('/additem', (req, res) => {
    res.render('addItem');
});

app.post('/addItem', upload.single('image'), (req, res) => {
    // Extract item data from the request body
    const { name, category, price } = req.body;
    let image;
    if (req.file) {
        image = req.file.filename;
    } else {
        image = null;
    }
    
    const sql = 'INSERT INTO menu (name, category, price, image) VALUES (?, ?, ?, ?)';
    // Insert the new item into the database
    connection.query(sql, [name, category, price, image], (error, results) => {
        if (error) {
            console.error('Error adding item:', error);
            res.status(500).send('Error adding item');
        } else {
            // Redirect to the menu page
            res.redirect('/menu');
        }
    });
});

app.get('/editItem/:id', (req, res) => {
    const itemId = req.params.id;
    const sql = 'SELECT * FROM menu WHERE itemId = ?';
    connection.query( sql, [itemId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving item by ID');
        }
        if (results.length > 0) {
            res.render('editItem', { menu: results[0] });
        } else {
            res.status(404).send('Item not found');
        }
    });
});

app.post('/editItem/:id', upload.single('image'), (req, res) => {
    const itemId = req.params.id;  
    const { name, category, price } = req.body;
    let image = req.body.currentImage; 
    if (req.file) { 
        image = req.file.filename; 
    }

    const sql = 'UPDATE menu SET name = ?, category = ?, price = ?, image =? WHERE itemId = ?';

    connection.query( sql, [name, category, price, image, itemId], (error, results) => {
        if (error) {
            console.error('Error updating item:', error);
            res.status(500).send('Error updating item');
        } else {
            res.redirect('/menu');
        }
    });
});

app.get('/deleteItem/:id', (req, res) => {
    const itemId = req.params.id;
    const sql = 'DELETE FROM menu WHERE itemId = ?';
    connection.query( sql, [itemId], (error, results) => {
        if (error) {
            console.error('Error deleting item:', error);
            res.status(500).send('Error deleting item');
        } else {
            res.redirect('/menu');
        }
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));