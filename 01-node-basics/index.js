import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} from './modules/contacts.js';
import program from './libs/commander.js';

import { handleError } from './lib/handlerror.js'

program.parse(process.argv);
console.log(program.opts());


