export {listPeopleView, personView, loginView,}

//applyTemplate - apply a template to some data
// and insert into the pge
// targetid - id of the element to insert content
// templateid - id of the element containing the template
// data - data to pass to the template
function applyTemplate (targetid, templateid, data) {
    let target = document.getElementById(targetid)
    
    let template = Handlebars.compile(
        document.getElementById(templateid).textContent
    )

    target.innerHTML = template(data)
}

//listPeopleView - generate a view of a list of people
// and insert it as 'targetid' in the document
function listPeopleView (targetid,  people,popularPost,recentPosts,random) {
    console.log('views');
    applyTemplate(targetid, "people-list-template", {"people": people, "popularPost":popularPost,"recentPosts":recentPosts,"random":random})

}

//listPersonView - generate a view of an individual person
// and insert it as 'targetid' in the document
function personView(targetid, person) {

    applyTemplate(targetid, "person-template", person)

}

// function personAddView() {

//     applyTemplate("person-add-template")

// }

//loginView - display the username or loginform based on the login status
function loginView (targetid, user) {
    applyTemplate(targetid, 'login-template', {"user": user})
}


// function randomPostView (targetid, user) {

//     console.log('47',user);
//     applyTemplate(targetid, 'random-template', {"user": user})
// }