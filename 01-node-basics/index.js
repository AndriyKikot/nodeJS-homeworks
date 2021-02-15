import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} from './modules/contacts.js';
import program from './libs/commander.js';

program.parse(process.argv);
const options = program.opts();


function invokeOptions(options) {
    if (options.list) {
        listContacts();
    } else if (options.get) {
        const id = Number(options.get);
        getContactById(id);
    } else if (options.delete) {
        const id = Number(options.delete);
        removeContact(id);
    } else if (options.add) {
        const { name, email, phone } = options;
        addContact(name, email, phone);
    } else {
        console.warn('\x1B[31m Unknown action type!');
    }
}

invokeOptions(options);