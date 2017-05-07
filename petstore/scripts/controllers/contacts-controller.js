import handlebars from 'handlebars';
import $ from 'jquery';
import { getTemplate } from 'templates';

class ContactsController {
    loadContacts() {
        getTemplate('contacts').then((template) => {
            $('#main-content-container').html(template());			
        })
    }
}

const contactsController = new ContactsController();

export { contactsController };