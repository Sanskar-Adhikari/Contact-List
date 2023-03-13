const express = require('express')
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
    const contact = await req.db.findContactById(req.params.id);
    if (contact !== undefined) {
        res.render('contactData', {
            contact
        });
    }
});

router.get('/edit', async (req, res) => {
    if (req.session.user != undefined) {
    const contact = await req.db.findContactById(req.params.id);
    res.render('edit', {
        contact: contact
    })
}
else{
    res.render('notAuth', { hide_login: true});
}
});

router.post('/edit', async (req, res) => {

    const id = req.params.id;
    const firstName = req.body.first.trim();
    const lastName = req.body.last.trim();
    const phone = req.body.phone.trim();
    const email = req.body.email.trim();
    const street = req.body.street.trim();
    const city = req.body.city.trim();
    const state = req.body.state.trim();
    const zip = req.body.zip.trim();
    const country = req.body.country.trim();
    const contactByPhone = req.body.Contact_By_Phone ? true : false;
    const contactByEmail = req.body.Contact_By_Email ? true : false;
    const contactByMail = req.body.Contact_By_Mail ? true : false;

    req.db.updateContact(id, firstName, lastName, phone, email, street, city, state, zip, country, contactByPhone, contactByEmail, contactByMail);
    res.redirect(`/${req.params.id}`);
    return;
});


router.get('/delete', async (req, res) => {
    const contact = await req.db.findContactById(parseInt(req.params.id));
    res.render('deletepage', {
        contact
    });
})

router.post('/delete', async (req, res) => {
    if (req.session.user != undefined) {
        await req.db.deleteById(req.params.id);
        res.redirect('/');
    } else {
        res.render('notAuth', {hide_login: true});
    }

})

module.exports = router;
