export {Model};
/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements ...">
 *
 * Student Name:
 * Student Number:
 *
 */

/* 
 * Model class to support the FlowTow application
 * this object provides an interface to the web API and a local
 * store of data that the application can refer to.
 * The API generates different events:
 *   "modelUpdated" event when new data has been retrieved from the API
 *   "postAdded" event when a request to add a new post returns
 *   "likeAdded" event when a request to add a new like returns
 *   "commentAdded" event when a request to add a new comment returns 
*/

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
    posts_url: '/posts', 
    uploadUrl: '/upload',  
    commentsUrl: '/comments',
    
    //this will hold the post data stored in the model
    data: {
        posts: []
    },

    // updatePosts - retrieve the latest list of posts from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    updatePosts: function() {
        fetch(this.posts_url)
        .then((response) =>{
            return response.json();
        })
        .then((data)=>{
            this.data.posts = data;
            const event = new CustomEvent("modelUpdated", {detail:this});
            window.dispatchEvent(event);
        })
    },

    // getPosts - return an array of post objects
    getPosts: function() {
        //before that you may need to sort the posts by their timestamp
        return this.data.posts;
    },

    // getPost - return a single post given its id
    getPost: function(postid) {

        for(const post of this.data.posts){
            if(post.id == postid){
                return post;
            }
        }
        return null;

    },

    setPosts: function(posts) {
        this.data.posts = posts;
    },

    // addPost - add a new post by submitting a POST request to the server API
    // postData is an object containing all fields in the post object (e.g., p_caption)
    // when the request is resolved, creates an "postAdded" event
    addPost: function(postData) {
        fetch(this.posts_url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then((response) =>{
            return response.json();
        })
        .then((data)=>{
            console.log('1',data);
            this.posts.push(data);
        })
    },

    // getUserPosts - return just the posts for one user as an array
    getUserPosts: function(userid) {
        
    },

    // addLike - increase the number of likes by 1 
    //      by submitting a PUT request to the server API
    //      postId - is the id of the post
    // when the request is resolved, creates an "likeAdded" event
    addLike: function (postId) {
        fetch(this.posts_url/postId,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then((response) =>{
            return response.json();
        })
        .then((data)=>{
            console.log('1',data);
            this.posts.push(data);
        })
    },

    // addComment - add a comment to a post 
    //      by submitting a POST request to the server API
    //      commentData is an object containing the content of the comment, the author and the postid
    // when the request is resolved, creates an "commentAdded" event
    addComment: function (commentData) {
        
    },

    //getRandomPosts - return N random posts as an array
    getRandomPosts: function(N){
        var randomNums = [];
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