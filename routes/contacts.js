const express = require('express')
const router = express.Router();

router.get('/create', (req, res) => {
    const contacts=req.db.getAllContacts();
    res.render('create-contact',{contacts});
  });

router.post('/create', async (req, res) => {
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

    // Create the contact in the database
    const contact = await req.db.createContact(firstName, lastName, phone, email, street, city, state, zip, country, contactByPhone, contactByEmail, contactByMail);
    res.redirect('/');
});



// display contact with id = :id
router.get('/:id', async (req, res) => {
    const contact = await req.db.findContactById(req.params.id);
    if (contact !== undefined) {
        res.render('contactData', {
            contact
        });
    }
});


module.exports = router;
