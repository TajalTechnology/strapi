/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements view functions...">
 *
 * Student Name:
 * Student Number:
 *
 */


function applyTemplate(template_id, data){
    let template = Handlebars.compile(document.getElementById(template_id).textContent)
    return template(data);
}


export function mainPageView(popularPosts, recentPosts,random){
    return applyTemplate('main-page-template', {popularPosts, recentPosts,random});
}

export function footerPageView(){
    return applyTemplate('footer-page-template');
}

// export function loginPageView(){
//     return applyTemplate('login-template');
// }

// postFormView();
// export function postFormView(){
//     return applyTemplate('registration-page-template');
// }

export function singlePostView(singlePost){
    return applyTemplate('single-page-template', singlePost);
}

export function error404View(message){
    return "<p>" + message + "</p>";
}