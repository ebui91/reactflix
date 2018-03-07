# REACTFLIX #

This project utilizes themoviedb.org API, which can be accessed here: https://www.themoviedb.org/documentation/api. 
<br />
A live version of the project can be viewable here: http://192.241.222.142:3001/

![alt text](https://github.com/ebui91/reactflix/blob/master/src/assets/screenshots/main-view.png)


To run this application locally, you can also fork and clone this repository. 
<br />
To install depencies, navigate to the source directory:
```
npm install --save
```


Start up the React application:
```
cd src/ && npm start 
```

Initialize the server by typing in your console:
```
node server/
```

You'll also need to request an API key from themoviedb.org. Afterwards, you can create a .env file in the source directory:
```
touch .env
```
![alt text](https://github.com/ebui91/reactflix/blob/master/src/assets/screenshots/env.png)

### Description ###
The three Components for this project are: 
- `MoviesList.js`
- `MovieInfo.js`
- `Sliders.js`

I decided not to use Redux for this project because it was fairly small in scale, and managing state was not an issue with only three components. Component architecture is a little messy. For example, the MoviesList component could definitely be more compartmentalized and split up, but since there was a 3 component restriction, it ended up being a bit bigger than how I would normally structure my components.

![alt text](https://github.com/ebui91/reactflix/blob/master/src/assets/screenshots/detailed-view.png)

The app itself is pretty simple. The sliders on the right hand side allow you filter movie results by genre, movie length, runtime, and rating (`Sliders.js`). There are two rows of data being displayed. The top row being the current movies out in theatres, and the bottom row being movies that are filtered by the search results (`MoviesList.js`). 
<br />
Each movie is "clickable" and will redirect you to that movie's detailed view (`MovieInfo.js`), which gives more information about the selected movie.


### Dependencies ###
A quick rundown of some dependencies I used for this project:
- `react-router`: React Router was implemented so that I could render a “detailed view” for movies. With a larger scale project, it would be more useful in rendering additional views.
- `axios`: Promise based HTTP client for the browser and node.js
- `jest-mock-axios`: used to integrate axios calls with the Jest testing framework.
- `react-infinite-scroll-component`: super easy built-in infinite scroll component for React
- `react-input-range`: InputRange is a React component allowing users to input numeric values within a specific range. It can accept a single value, or a range of values (min/max). By default, basic styles are applied, but can be overridden depending on your design requirements.
- `react-transition-group`: helps to apply animations to components by managing their state.


### Unit Testing ###
I implemented a few unit tests using Jest. The tests can be viewed in the functions.js and functions.test.js files, which are in the src/ directory.
![alt text](https://github.com/ebui91/reactflix/blob/master/src/assets/screenshots/unit-tests.png)


### Final Thoughts ###
This was a FUN project, and I learned a lot from doing it. I ended up using DOM manipulation for some of the effects/animations. I understand this may be an anti-pattern within React's framework, but it's functional and it looks nice :).
<br />
One thing I struggled with was figuring out how to render "Now Playing" movies each time the component mounts, but also replace that data whenever the sliders changed. This was difficult due to the way I had everything set up in the `submitSearch()` method, which was also linked to the `nextPage()` method used by `react-infinite-scroll`.
<br />
I ended up separating the two data sets and using two different queries for each set of movies. Ideally I would have liked to create a separate component just for receiving and displaying the data, that way I could pass each set of data to the components individually as props.
<br />
Here are some things I would have done, or plan on adding in the future:
- Fully implement `GraphQL` to hit the API instead of using a normal query.
- Add a "Random Movie" button that selects a movie randomly from the API (could also be based on the user-input).
- Search functionality, including a Search Bar. I know how to implement this already, but since I was restricted to just 3 components, I left this feature out.
- Mobile responsiveness. The app was designed to be a desktop web app. The original UI I came up with was more mobile friendly, but I completely redesigned it at the last minute. While I'm happy with the final result, I would like to make this app mobile friendly in the future.
- Look into other fonts. Roboto and Montserrat are my "safe" fonts, but I would definitely mess around with other fonts if I had more time.


