let dataBackdrop;

export default {
    addListener(movie) {
        console.log(movie)
        if(movie!==null){
            movie.addEventListener('mouseenter', setBackground)   
        }
    }
}

function setBackground(e) {
    const movie = e.target.dataset.backdrop
    const filtersContainer = document.querySelector('.filters-container');
    const overlay= document.querySelector('.overlay');

    overlay.style.opacity = '1';
    

    setTimeout(() => {
        filtersContainer.style.background = `url(${ movie }) no-repeat`;
        overlay.style.opacity = '0';
    }, 180)

}