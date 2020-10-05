import reddit from './redditapi';


const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

function truncate(text, limit){
    const shortened = text.indexOf('',limit);
    if(shortened == -1 ){ 
        return text;
    }

    return text.substring(0, shortened);
}


class UI {

    showMessage(message, styling) {
        const container = document.getElementById('search'); 
        const newErrorDiv = document.createElement("div");
        const errorMessage = document.createTextNode(message);
        newErrorDiv.appendChild(errorMessage);
        newErrorDiv.className = `alert ${styling}`;

        const form = document.getElementById("search-form");
        container.insertBefore(newErrorDiv,form);

        setTimeout(function(){
            newErrorDiv.remove();
        },3000);
    }

    clearfield(entry){
        entry.value = "";
    }

   


    displayResults(searchTerm,sortBy,searchLimit){
        reddit.search(searchTerm,sortBy,searchLimit)
            .then(results => {
                let output = `<div class="card-columns">`;
                results.forEach(post => {

                    let image = post.preview ? post.preview.images[0].source.url : 'https://cdn.vox-cdn.com/thumbor/SfU1irp-V79tbpVNmeW1N6PwWpI=/0x0:640x427/1200x800/filters:focal(0x0:640x427)/cdn.vox-cdn.com/uploads/chorus_image/image/45970810/reddit_logo_640.0.jpg';

                    output += `<div class="card">
                    <img class="card-img-top" src="${image}" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">${post.title}</h5>
                      <p class="card-text">${truncate(post.selftext, 200)}</p>
                      <a href="${post.url}" target="_blank" class="btn btn-primary">View Post</a>
                      <span class="badge badge-secondary">${post.subreddit}</span>
                      <span class="badge badge-dark">${post.score}</span>
                    </div>
                  </div>`;
                });
                output += `</div>`;
                document.getElementById('result').innerHTML = output;

                console.log(results);
            });
    }

   
}



searchForm.addEventListener('submit', function(ev){

    ev.preventDefault();
    const searchTerm = searchInput.value;
    const sortBy = document.querySelector('input[type="radio"][name="sortby"]:checked').value;
    const searchLimit = document.getElementById('limit').value;

    const ui = new UI;

    

    if (searchTerm == '') {
        ui.showMessage('Please add a search term', 'alert-danger');
    }else{
        
        ui.displayResults(searchTerm,sortBy,searchLimit);
        ui.clearfield(searchInput);
    }
});




