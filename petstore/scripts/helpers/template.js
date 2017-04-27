import handlebars  from 'handlebars';
import $ from 'jquery';

function getTemplate(name) {
    var cache = {};
    name = 'dog-food';
    return new Promise(function (resolve, reject) {

        if (cache[name]) {
            resolve(cache[name]);
        } else {
            $.get(`../../templates/${name}.handlebars`, function (templateHtml) {
                var template = handlebars.compile(templateHtml);
                cache[name] = template;
                resolve(template);
            });
        }
    });
}

export { getTemplate };
