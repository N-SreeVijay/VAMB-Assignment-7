const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// Route imports
const registerRoute = require('./routes/regst'); 
const loginRoute = require('./routes/login');
const subscribeRoute = require('./routes/subscribe'); 
const usersubscribeRoute = require('./routes/usersubscriber');
const donationRouter = require('./routes/donation'); 
const userdonationRoute = require('./routes/userdonationRoute');
const profileRoute = require('./routes/profile');

// MongoDB connection setup
mongoose.connect('mongodb+srv://nsreevijay:Vijay%404447@cluster0.3zmit.mongodb.net/farm')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: '2f8d5c4b8b4eaa68c5b8c3b5a7e4d7f4b2e1e5c8f5f8e9f6a2e8e9f4b3c4a2e1',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Set secure cookies in production
        httpOnly: true, // Make sure cookies are not accessible via JavaScript
        maxAge: 24 * 60 * 60 * 1000, // Session expiry time (1 day)
    }
}));

// Set up Pug for templating
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/', registerRoute);
app.use('/', loginRoute);
app.use('/s', subscribeRoute); 
app.use('/user', usersubscribeRoute);
app.use('/d', donationRouter); 
app.use('/duser', userdonationRoute); 
app.use('/profile', profileRoute); 

const loadUsers = async () => {
    try {

        const users = await User.find();  
        return users;
    } catch (err) {
        console.error('Error loading users:', err);
        return [];  
    }
};

app.get('/details', async (req, res) => {
    if (!req.session.Name) {
      return res.redirect('/login');  
    }
  
    try {
      const user = await User.findOne({ name: req.session.Name });  
      
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.render('user/dashboard', { user });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).send('Server Error');
    }
  });

app.get('/', (req, res) => {
    if (req.session.Name) {
        res.redirect('/userindex');
    } else {
        res.redirect('/index');
    }
});

app.get('/s', (req, res) => {
    if (req.session.Name) {
        res.redirect('/usersubscriber');
    } else {
        res.redirect('/subscribe');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const users = await loadUsers();  // Use await to get the resolved users
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            req.session.Name = user.name;
            req.session.email = user.email;  // Store email in the session
            res.redirect('/userindex');
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (err) {
        res.status(500).send('Error loading users');
    }
});
// Page routes
app.get('/index', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('about'));
app.get('/visit', (req, res) => res.render('visit'));
app.get('/job', (req, res) => res.render('job'));
app.get('/contact', (req, res) => res.render('cont'));
app.get('/login', (req, res) => res.render('login'));
app.get('/reg', (req, res) => res.render('reg'));
app.get('/donation', (req, res) => res.render('donation'));

const userPages = [
    { route: '/userindex', view: 'user/userindex' },
    { route: '/usersubscriber', view: 'user/userindex' },
    { route: '/usercontact', view: 'user/usercont' },
    { route: '/userjob', view: 'user/userjob' },
    { route: '/userdonation', view: 'user/userdonation' },
    { route: '/userabout', view: 'user/userabout' },
    { route: '/uservisit', view: 'user/uservisit' },
];

userPages.forEach(page => {
    app.get(page.route, (req, res) => {
        if (!req.session.Name) {
            return res.redirect('/login');
        }
        res.render(page.view, { name: req.session.Name });
    });
});



app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/userindex');
        }
        res.redirect('/index');
    });
});

app.listen(4747, () => {
    console.log('Server is running on port 4747 link: http://localhost:4747');
});
