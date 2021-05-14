import * as views from './views.js'
import {Model} from './model.js'
import { Auth } from './service.js';

window.addEventListener("modelUpdated", function(e) {
    
    console.log('modelUpdated triggered')
    let people = Model.getPosts();
    let popularPost = Model.getPopularPosts();
    let recentPosts = Model.getRecentPosts();
    let random = Model.getRandomPosts();
    // console.log('11',random);
    views.listPeopleView("list", people, popularPost,recentPosts,random)
    bindings();
})

window.addEventListener("personAdded", function(e) {
    
    console.log('personAdded triggered')
    let people = Model.getPosts();
    views.listPeopleView("list", people)
    bindings();
}
);

window.addEventListener("commentAdded", function(e) {
    
    console.log('commentAdded triggered')
    let people = Model.getPosts();
    views.listPeopleView("list", people)
    bindings();
}
);

window.addEventListener('userLogin', function(e) {
    console.log('userLgin triggered')
    console.log('the user name is ', Auth.getUser())
    views.loginView('login', Auth.getUser())
})

function person_click_handler () {

    let id = this.dataset.id
    console.log('the type of id is', typeof(id))

    let person = Model.getPost(Number(id))
    console.log(person);

    views.personView("person", person)
    
}

function person_form_handler(event){
    
    event.preventDefault()
    console.log(this)

    const p_author = this.elements['p_author'].value
    const p_likes = this.elements['p_likes'].value
    const p_url = this.elements['p_url'].value
    const p_caption = this.elements['p_caption'].value

    const p_image = this.elements['p_image'].files[0]

    const personData = {
        "p_author": p_author,
        "p_likes": p_likes,
        "p_url": p_url,
        "p_caption": p_caption,
    }
    const pictureData = new FormData()
    pictureData.append("files", p_image)

    Model.addPost(pictureData, personData)

}

// comment 
function comment_form_handler(event){
    
    event.preventDefault()
    console.log(this)

    const c_content = this.elements['c_content'].value
    const c_post = this.elements['c_post'].value

    const commentData = {
        "c_content": c_content,
        "c_post": c_post,
    }


    Model.addComment(commentData)

}

function login_form_handler (event) {
    event.preventDefault()
    console.log('the login form is ', this)

    const username = this.elements['username'].value
    const password = this.elements['password'].value

    const authInfo = {
        'identifier': username,
        'password': password
    }

    //send authInfo to backend for user authentication
    Auth.login(authInfo)
}


function bindings() {
    
    let names = document.getElementsByClassName("person-name")
    for (let i=0; i<names.length; i++) {
        names[i].onclick = person_click_handler
    }

    let form = document.getElementById('person-form')
    form.onsubmit = person_form_handler

    

    if (!Auth.getUser()) {
        let loginform = document.getElementById('login-form')
        loginform.onsubmit = login_form_handler
    }

    let commentForm = document.getElementById('comment-form')
    console.log('132',commentForm);
    if(commentForm){
        commentForm.onsubmit = comment_form_handler
    }
    
    

}


window.onload = function (){
    Model.load();
    views.loginView('login', Auth.getUser())
}