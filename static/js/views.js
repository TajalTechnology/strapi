

function applyTemplate(template_id, data){
    let template = Handlebars.compile(document.getElementById(template_id).textContent)
    return template(data);
}

export function mainPageView(users, observations){
    return applyTemplate('main-page-template', { users:users, observations:observations});
}

export function footerPageView(template_id,whatis){
    return applyTemplate('footer-page-template',whatis);
}

export function error404View(message){
    return "<p>" + message + "</p>";
}
