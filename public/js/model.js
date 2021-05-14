export {Model};
import {Auth} from './service.js'

function orderByPublished(a, b) {
    if (a.published_at > b.published_at) {
        return -1;
    } else if (a.published_at === b.published_at) {
        return 0;
    } else {
        return 1;
    }
}

function orderByLikes(a, b) {
    if (a.p_likes < b.p_likes) {
        return -1;
    } else if (a.p_likes === b.p_likes) {
        return 0;
    } else {
        return 1;
    }
}

const Model = {

    people_url: "/people",
    posts_url:"/posts",
    comments_url:"/comments",
    upload_url: "/upload",

    data:{
        people: [],
        posts:[],
        comments:[],
    },

    load: function(){
        fetch(this.posts_url)
        .then(
            function(response){
            //parse it into json and return it back
                return response.json(); 
            }
        )
        .then(
            (data) => {

                //Model.data.people = data
                this.data.posts = data
                let event = new CustomEvent("modelUpdated",{detail:this});
                window.dispatchEvent(event)
            }
        )
    }, 
        // addComment - add a comment to a post 
    //      by submitting a POST request to the server API
    //      commentData is an object containing the content of the comment, the author and the postid
    // when the request is resolved, creates an "commentAdded" event
    addComment: function (commentData) {
        fetch(this.comments_url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(commentData)
        })
        .then((response) =>{
            return response.json();
        })
        .then((data)=>{
            this.comments.push(data);
            let event = new CustomEvent('commentAdded');
            window.dispatchEvent(event)
        })
    },

    addPost: function (pictureData, personData){
        fetch(this.upload_url, {
            method: 'POST',
            // headers: {
            //     Authorization: `bearer ${Auth.getJWT()}`
            // },
            body: pictureData
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log('the data is ', data)
            personData = {...personData, "p_image": data[0]}
            return fetch(this.posts_url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                // Authorization: `bearer ${Auth.getJWT()}`
                },
                body: JSON.stringify(personData)
            })
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            this.data.posts.push(data)
            let event = new CustomEvent('personAdded');
            window.dispatchEvent(event)
        })
    },

    getPosts: function() {
        return this.data.posts
    },

    getPost: function(id){
        let people =  this.getPosts()

        for(let i=0; i<people.length; i++) {
            if (people[i].id === id) {
                return people[i]
            }
        }
    },

    setPosts: function(posts) {
        this.data.posts = posts;
    },

    getRandomPosts: function(){
        fetch(this.posts_url)
        .then(
            function(response){
            //parse it into json and return it back
                return response.json(); 
            }
        )
        .then((myArrays) => { 
            this.data.posts = myArrays
        })
        // console.log('123',this.data.posts);
        // var randomNums = [];
        var myArray = this.data.posts;
        var myNewArray = [];
        for (var i = 0; i < 3; i++) {
            myNewArray.push(myArray.splice(Math.random() * (myArray.length - 1), 3).pop());
        }
        return myNewArray;

    },

    // getRecentPosts - return the N most recent as an array
    //  posts, ordered by timestamp, most recent first
    getRecentPosts: function(N) {
        const result = this.data.posts.slice();
        result.sort(orderByPublished);
        return result.slice(0, 10);
    },

    // getPopularPosts - return the N most popular as an array
    // posts, ordered by the number of likes
    getPopularPosts: function(N) {
        const result = this.data.posts.slice();
        result.sort(orderByLikes);
        result.reverse();
        return result.slice(0, 10);
    },
}