import * as fs from "fs/promises";
import * as path from "path";
import { uuid } from 'uuidv4';

import { handleError } from '../libs/handlerror.js';
import createDirname from '../libs/dirname.js';

const { __dirname } = createDirname(import.meta.url);
const contactsPath = path.join(__dirname, '../db/contacts.json');


export async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        const parseData = JSON.parse(data.toString());
        console.table(parseData);
    } catch (error) {
        handleError(error)
    }
};

export async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const parseData = JSON.parse(data.toString());
        const contact = parseData.find(contact => contact.id === contactId);

        if (!contact) {
            console.error('Contact was not found!');
        } else {
            console.table(contact);
        }
    } catch (error) {
        handleError(error);
    }
};

export async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const parseData = JSON.parse(data.toString());
        const contact = parseData.filter(contact => contact.id === contactId);

        if (contact.length !== parseData.length) {
            fs.writeFile(contactsPath, JSON.stringify(contact));
            console.log("Contact was removed.");
        } else {
            console.log("Contact was not found.");
            return;
        }
    } catch (error) {
        handleError(error);
    }
};

export async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath);
        const parseData = JSON.parse(data.toString());

        parseData.push({ id: uuid(), name, email, phone });
        fs.writeFile(contactsPath, JSON.stringify(parseData));
        console.log("Contact was added.");
    } catch (error) {
        handleError(error);
    }
}

// export default { listContacts, getContactById, removeContact, addContact };