import { Model } from './model.js';
import * as views from './views.js';
import { splitHash } from './util.js';

window.addEventListener('modelUpdated', redraw);

function redraw() {
    let posts = Model.getPosts();
    const hash = splitHash(window.location.hash);
    let content = "<p> Hello World </p>";

    switch (hash.path) {

        case 'whatis':
            console.log('t');
            content = views.footerPageView();
            break;

        default:
            {
                let singlePost = Model.getPost();
                const recentPosts = Model.getRecentPosts();
                const popularPosts = Model.getPopularPosts();
                const random = Model.getRandomPosts();

                if (recentPosts !== null && singlePost === null) {
                    content = views.mainPageView(popularPosts, recentPosts, random) + views.footerPageView();
                }else if(singlePost !== null){
                    console.log(singlePost.id);
                    content = (singlePost.p_likes);
                }
                 else {
                    document.getElementById("target").innerHTML = content;
                }
            }
            break;
    }
    document.getElementById("target").innerHTML = content;
}
window.onhashchange = redraw;



window.onload = function () {
    const updatePosts = Model.updatePosts();
};