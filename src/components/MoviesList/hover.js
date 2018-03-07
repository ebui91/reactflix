// This external file handles all of the functionality for the "hover" effect on the splash screen. 
// I exported these functions to make the MoviesList component more readable.

export default {
    addListener(movie) {
        if(movie!==null){
            movie.addEventListener("mouseenter", setBackground);   
        }
    }
}

function setBackground(e) {
    // Variable assignments for data attributes from React refs in MoviesList component.
    const backdrop = e.target.dataset.backdrop;
    const title = e.target.dataset.title;
    const desc = e.target.dataset.desc;
    
    // Query Selectors for Backdrop elements.
    const backdropContainer = document.querySelector(".backdrop-container");
    const backdropText = document.querySelector(".backdrop-text");
    const backdropTitle = document.querySelector(".backdrop-title");
    const backdropDesc = document.querySelector(".backdrop-desc");
    const overlay = document.querySelector(".overlay");

    overlay.style.opacity = "1";
    setTimeout(() => {
        backdropContainer.style.background = `url(${ backdrop }) no-repeat`;
        backdropTitle.innerHTML = title;
        backdropDesc.innerHTML = desc;
        backdropText.style.opacity = "1";
        overlay.style.opacity = "0";
    }, 250);
}