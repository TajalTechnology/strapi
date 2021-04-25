export { Model };

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
    if (a.p_likes > b.p_likes) {
        return -1;
    } else if (a.p_likes === b.p_likes) {
        return 0;
    } else {
        return 1;
    }
}

const Model = {
    posts_url: 'http://localhost:1337/posts',


    // this will hold the data stored in the model
    data: {
        posts: [],
    },

    getPosts: function () {
        //before that you may need to sort the posts by their timestamp
        return this.data.posts;
    },
    //getRandomPosts - return N random posts as an array
    getRandomPosts: function (N) {
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
    getRecentPosts: function (N) {
        const result = this.data.posts.slice();
        result.sort(orderByPublished);
        return result.slice(0, 10);
    },

    // getPopularPosts - return the N most popular as an array
    // posts, ordered by the number of likes
    getPopularPosts: function (N) {
        const result = this.data.posts.slice();
        result.sort(orderByLikes);
        result.reverse();
        return result.slice(0, 10);
    },

};
