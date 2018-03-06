# REACTFLIX #

This project utilizes themoviedb.org API, which can be accessed here: https://www.themoviedb.org/documentation/api. 
A live version of the project can be viewable here:

* project pic here*

You can also fork and clone this repository, and in the source directory, type: 
```
npm install --save
```
to install all depencies. 

Navigate to the src/ directory and type:
```
cd src/ && npm start 
```

Initialize the server by typing in your console:
```
node server/
```

### Description ###
The three Components for this project are: 
- MoviesList
- MovieInfo
- Sliders

I decided not to use Redux for this project because it was fairly small in scale, and managing state was not an issue with only three components.
Component architecture is a little messy up. For example, the MoviesList component could definitely be more compartmentalized and split up, but since there was a 3 component restriction, it ended up being a bigger component than how I would normally structure my components.



### Dependencies ###

- react-router: React Router was implemented so that we could render a “detailed view” for movies. With a larger scale project, it would be more useful in rendering additional views.
- axios: Promise based HTTP client for the browser and node.js
- jest-mock-axios: used to integrate axios calls with the Jest testing framework.
- react-infinite-scroll-component: super easy built-in infinite scroll component for React
- react-input-range: InputRange is a React component allowing users to input numeric values within a specific range. It can accept a single value, or a range of values (min/max). By default, basic styles are applied, but can be overridden depending on your design requirements.
- react-transition-group: helps to apply animations to components by managing their state.


### Unit Testing ###
I implemented a few unit tests using Jest. The tests can be viewed in the functions.js and functions.test.js files, which are in the src/ directory.
* testing pic here*

### Final Thoughts ###

This was a FUN project, and I learned a lot from doing it. I used DOM manipulation for some of the effects/animations. I understand this may be an anti-pattern within React's framework.
One thing I struggled with was finding out how to render "Now Playing" movies each time the component mounts, but also replace that data whenever the sliders changed. This was difficult due to the way I had everything set up in the submitSearch() method, which was also linked to the nextPage() method used by React-Infinite-Scroll.
If I had more time, I think I would implement some sort of "store" to keep track of whether or not the query parameters have changed, and then determine whether I need to completely wipe the resultList array to replace with new data, or just append the existing array with more data from pagination.
Some things I would like to add to this project in the future:
- fully implement graphQL to hit the API instead of using a normal query
- I really wanted to make this app mobile responsive, but ran out of time. Certain UI elements made this difficult. 
- look into other fonts. Roboto and Montserrat are my "safe" fonts, but I would definitely mess around with other fonts if I had more time.
- Would have liked to add “search” functionality, but that would have required a separate component for the search bar.
- Would have added a “RANDOM MOVIE” feature if I had more time.

