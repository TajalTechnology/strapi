import {Model} from './model.js';
import * as views from './views.js';
import {splitHash} from './util.js';

window.addEventListener('modelUpdated',redraw);


function redraw() { 
    let posts = Model.getPosts();

    const hash = splitHash(window.location.hash);
    let content = "<p> Hello World </p>";

    switch(hash.path){

        case 'whatis':
            content = "<p> This is footer sections</p>";
            break;
            
        default:
            {
            const observations = Model.getRecentPosts(10);
            const users = Model.getPopularPosts(10);

            if(observations !== null){
                content = views.mainPageView(users, observations)
            }
        }
            break;
    }
    document.getElementById("target").innerHTML = content;
}
window.onhashchange = redraw;

window.onload = function() {
};


