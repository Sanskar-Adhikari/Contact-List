require('dotenv').config();
const Database = require('dbcmps369');

class contactDB {
    constructor() {
        this.db = new Database();
    }

    async initialize() {
        await this.db.connect();

        await this.db.schema('Contact', [{
                name: 'id',
                type: 'INTEGER'
            },
            {
                name: 'First_Name',
                type: 'TEXT'
            },
            {
                name: 'Last_Name',
                type: 'TEXT'
            },
            {
                name: 'Phone_Number',
                type: 'TEXT'
            },
            {
                name: 'Email_Address',
                type: 'TEXT'
            },
            {
                name: 'Street',
                type: 'TEXT'
            },
            {
                name: 'City',
                type: 'TEXT'
            },
            {
                name: 'State',
                type: 'TEXT'
            },
            {
                name: 'Zip',
                type: 'TEXT'
            },
            {
                name: 'Country',
                type: 'TEXT'
            },
            {
                name: 'Contact_By_Email',
                type: 'BOOLEAN'
            },
            {
                name: 'Contact_By_Phone',
                type: 'BOOLEAN'
            },
            {
                name: 'Contact_By_Mail',
                type: 'BOOLEAN'
            }
        ], 'ID');

        await this.db.schema('Users', [{
                name: 'id',
                type: 'INTEGER'
            },
            {
                name: 'fname',
                type: 'TEXT'
            },
            {
                name: 'lname',
                type: 'TEXT'
            },
            {
                name: 'uname',
                type: 'TEXT'
            },
            {
                name: 'password',
                type: 'TEXT'
            }
        ], 'ID');
    }

    //create user 
    async createUser(fname, lname, uname, password) {
        const id = await this.db.create('Users', [{
                column: 'fname',
                value: fname
            },
            {
                column: 'lname',
                value: lname
            },
            {
                column: 'uname',
                value: uname
            },
            {
                column: 'password',
                value: password
            },
        ])
        return id;
    }

    //create contact 
    async createContact(firstName, lastName, phone, email, street, city, state, zip, country, contactByPhone, contactByEmail, contactByMail) {
        const id = await this.db.create('Contact', [{
                column: 'First_Name',
                value: firstName
            },
            {
                column: 'Last_Name',
                value: lastName
            },
            {
                column: 'Phone_Number',
                value: phone
            },
            {
                column: 'Email_Address',
                value: email
            },
            {
                column: 'Street',
                value: street
            },
            {
                column: 'City',
                value: city
            },
            {
                column: 'State',
                value: state
            },
            {
                column: 'Zip',
                value: zip
            },
            {
                column: 'Country',
                value: country
            },
            {
                column: 'Contact_By_Phone',
                value: contactByPhone
            },
            {
                column: 'Contact_By_Email',
                value: contactByEmail
            },
            {
                column: 'Contact_By_Mail',
                value: contactByMail
            }
        ]);
        return id;
    }
    //find by user-name
    async findUserByuname(uname) {
        const us = await this.db.read('Users', [{
            column: 'uname',
            value: uname
        }]);
        if (us.length > 0) return us[0];
        else {
            return undefined;
        }
    }

    //find user by id
    async findUserById(id) {
        const us = await this.db.read('Users', [{
            column: 'ID',
            value: id
        }]);
        if (us.length > 0) return us[0];
        else {
            return undefined;
        }
    }

    //get all contacts
    async getAllContacts() {
        const contacts = await this.db.read('Contact', []);
        return contacts;
    }


    //find contact by id
    async findContactById(id) {
        const us = await this.db.read('Contact', [{
            column: 'id',
            value: id
        }]);
        if (us.length > 0) return us[0];
        else {
            return undefined;
        }
    }



    //update contact
    async updateContact(id, firstName, lastName, phone, email, street, city, state, zip, country, contactByPhone, contactByEmail, contactByMail) {
        await this.db.update('Contact',
            [{
                    column: 'First_Name',
                    value: firstName
                },
                {
                    column: 'Last_Name',
                    value: lastName
                },
                {
                    column: 'Phone_Number',
                    value: phone
                },
                {
                    column: 'Email_Address',
                    value: email
                },
                {
                    column: 'Street',
                    value: street
                },
                {
                    column: 'City',
                    value: city
                },
                {
                    column: 'State',
                    value: state
                },
                {
                    column: 'Zip',
                    value: zip
                },
                {
                    column: 'Country',
                    value: country
                },
                {
                    column: 'Contact_By_Phone',
                    value: contactByPhone
                },
                {
                    column: 'Contact_By_Email',
                    value: contactByEmail
                },
                {
                    column: 'Contact_By_Mail',
                    value: contactByMail
                }
            ],
            [{
                column: 'id',
                value: id
            }]
        );
        return;
    }

    //delete contact
    async deleteById(id) {
        await this.db.delete('Contact', [{
            column: 'id',
            value: id
        }]);
        return
    }

}

module.exports = contactDB;