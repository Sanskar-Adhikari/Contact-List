const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
    const contacts = await req.db.getAllContacts();
    res.render('landingpage', {
        contacts
    });
});

router.get('/login', async (req, res) => {
    const check = await req.db.findUserByuname('cmps369');
    if (check === undefined) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync('rcnj', salt);
        await req.db.createUser('cmps', '369', 'cmps369', hash)
    }
    res.render('login', {
        hide_login: true
    })
})

router.post('/login', async (req, res) => {
    const uname = req.body.uname.trim();
    const p1 = req.body.password1.trim();
    const user = await req.db.findUserByuname(uname);
    if (user && bcrypt.compareSync(p1, user.password)) {
        req.session.user = user;
        res.redirect('/');
        return;
    } else {
        res.render('login', {
            hide_login: true,
            message: "Sorry, couldn't sign you in..."
        })
        return;
    }


})

router.get('/logout', async (req, res) => {
    req.session.user = undefined;
    res.redirect('/');
})

router.get('/signup', async (req, res) => {
    res.render('signup', {
        hide_login: true
    })
})

router.post('/signup', async (req, res) => {
    const fname = req.body.fname.trim();
    const lname = req.body.lname.trim();
    const uname = req.body.uname.trim();
    const p1 = req.body.password1.trim();
    const p2 = req.body.password2.trim();
    if (p1 != p2) {
        res.render('signup', {
            message: "Your passwords do not match"
        });
        return;

    }
    const user = await req.db.findUserByuname(uname)
    if (user) {
        res.render('signup', {
            hide_login: true,
            message: "An account with this username already exists"
        });
        return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(p1, salt);
    const id = await req.db.createUser(fname, lname, uname, hash);
    req.session.user = await req.db.findUserById(id);
    res.redirect('/');
})


module.exports = router;
