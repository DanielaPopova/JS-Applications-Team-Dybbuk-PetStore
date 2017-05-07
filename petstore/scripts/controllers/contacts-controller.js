import handlebars from 'handlebars';
import $ from 'jquery';
import { getTemplate } from 'templates';

class ContactsController {

    getAcademyLocation() {
        let location = new Promise(function(resolve, reject){
            let latitude = 42.650880,
                longitude = 23.379507,
                source = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}
                          &zoom=17
                          &size=400x400
                          &markers=color:red%7Clabel:HHH%7C${latitude},${longitude}
                          &sensor=false`;
            resolve(source);
        }).then(function(source) {
            $('#map-image').attr("src", source);
        }); 
    }

    loadContacts() {
        getTemplate('contacts').then((template) => {
            $('#main-content-container').html(template());
            this.getAcademyLocation();			
        })
    }
}

const contactsController = new ContactsController();

export { contactsController };