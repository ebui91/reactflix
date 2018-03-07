import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CSSTransitionGroup } from 'react-transition-group';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";
import Sliders from "../Sliders/Sliders.js";
import data from "../../genres.js";
import hover from "./hover.js";
import "./MoviesList.css";


export default class MoviesList extends Component{
    constructor(props){
        super(props);

        this.state = {
            movieList: [],
            resultList: [],
            page: 1,
            year: {
                label: "year",
                min: 1990,
                max: 2018,
                step: 1,
                value: { min: 2015, max: 2018 }
            },
            rating: {
                label: "rating",
                min: 0,
                max: 10,
                step: 1,
                value: { min: 7, max: 10 }
            },
            runtime: {
                label: "runtime",
                min: 0,
                max: 200,
                step: 15,
                value: { min: 60, max: 120 }
            },
            genres: data.genres,
            selectedGenre: 28
        }
        this.onChange = this.onChange.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.pushRef = this.pushRef.bind(this);
    }

    // API call to generate currently popular movies each time the component mounts.
    componentDidMount(){
        axios.get("/api/movies").then(movies => {
            this.setState({ movieList: movies.data });
        });
    }

    // Method to handle user input for Sliders.
    onChange(data){
        this.setState({ [data.type]: { ...this.state[data.type], value: data.value } });
    }

    // Method to handle user input for genre dropdown menu.
    handleGenreChange(input){
        this.setState({ selectedGenre: input });
    }
    
    // Increments the current value of page and calls the submitSearch method for the next page of results.
    nextPage(){
        const { selectedGenre, year, rating, runtime } = this.state;
        setTimeout(() => {
            var page = this.state.page;
            page = page+1;
            axios.get("/api/filter", {
                params: {
                    genre: selectedGenre,
                    yearMin: year.value.min,
                    yearMax: year.value.max,
                    ratingMin: rating.value.min,
                    ratingMax: rating.value.max,
                    runtimeMin: runtime.value.min,
                    runtimeMax: runtime.value.max,
                    page: page
                }
            }).then(movies => {
                this.setState({ resultList: this.state.resultList.concat(movies.data) });
            });
        }, 1000);
    }

    // Sends a request to the server with user-inputted data.
    submitSearch(){
        const { selectedGenre, year, rating, runtime } = this.state;
        axios.get("/api/filter", {
            params: {
                genre: selectedGenre,
                yearMin: year.value.min,
                yearMax: year.value.max,
                ratingMin: rating.value.min,
                ratingMax: rating.value.max,
                runtimeMin: runtime.value.min,
                runtimeMax: runtime.value.max,
            }
        }).then(movies => {
            this.setState({ resultList: movies.data });
        });
    }

    // Pushing DOM element atrributes as a ref into external file so I can use the data.
    pushRef(ref){
        hover.addListener(ref);
    }

    render(){
        const imgURL = "http://image.tmdb.org/t/p/w342";
        const nowPlaying = this.state.movieList.map((movie, i) => {
            return(
                <Link key={i} to={ `/movies/${movie.id}` } style={{ textDecoration: "none", width: "20%"}}>
                    <div className= "movie-card" data-title= { movie.original_title } data-desc= { movie.overview } data-rating= { movie.vote_average } data-backdrop= { `http://image.tmdb.org/t/p/w1280${movie.backdrop_path}` } ref= {(ref) => { this.movie= ref; this.pushRef(ref); } }>
                        <div className= "movie-poster" style= {{ backgroundImage:`url(${ imgURL + movie.poster_path })`, height: "200px" , width: "100%" }}></div>
                        <h4>{ 
                                movie.original_title.length > 20 
                                ? movie.original_title.substring(0,21) + "..." 
                                : movie.original_title
                            }
                        </h4>

                        <div className= "movie-card-info">
                            <p>Release: { movie.release_date.substring(0,4) }</p>
                            <p>Rating: { movie.vote_average }</p>
                        </div>
                    </div>
                </Link>
            )
        });
        const results = this.state.resultList.map((movie, i)=> {
            return(
                <Link key={i} to={ `/movies/${movie.id}` } style={{ textDecoration: "none", width: "20%"}}>
                    <div className="movie-card" data-title={ movie.original_title } data-desc={ movie.overview } data-rating={ movie.vote_average } data-backdrop={ `http://image.tmdb.org/t/p/w1280${movie.backdrop_path}` } ref={(ref) => { this.movie=ref; this.pushRef(ref); } }>
                        <div className="movie-poster" style={{ backgroundImage:`url(${ imgURL + movie.poster_path })`, height:"200px" , width:"100%" }}></div>
                        <h4>{ 
                                movie.original_title.length > 20 ? movie.original_title.substring(0,21) + "..." 
                                : movie.original_title
                            }
                        </h4>

                        <div className="movie-card-info">
                            <p>Release: { movie.release_date.substring(0,4) }</p>
                            <p>Rating: { movie.vote_average }</p>
                        </div>
                    </div>
                </Link>
            )
        });
        
        return(
            <section className="moviesList-view">
                <div className="backdrop-container">
                    <div className="backdrop-gradient"></div>
                    <div className="overlay"></div>
                    <div className="backdrop-text">
                        <h1 className="backdrop-title" style={{ fontFamily:"Roboto", color: "#FFF", margin: "0px" }}>Title</h1>
                        <span className="backdrop-rating" style={{ color: "red" }}></span>
                        <p className="backdrop-desc" style={{ fontFamily:"Montserrat", color: "#999", width: "55%" }}>Hello, thank you for reading my source code :)</p>
                    </div>
                </div>
                
                <div className="movie-container">
                <InfiniteScroll    
                    pullDownToRefreshContent={
                        <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
                    }
                    releaseToRefreshContent={
                        <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
                    }
                    refreshFunction={ this.refresh }
                    hasMore={ true }
                    loader={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 14 32 4" width="100vw" height="8" fill="red" preserveAspectRatio="none">
                            <path opacity="0.8" transform="translate(0 0)" d="M2 14 V18 H6 V14z">
                                <animateTransform attributeName="transform" type="translate" values="0 0; 24 0; 0 0" dur="2s" begin="0" repeatCount="indefinite" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                            </path>
                            <path opacity="0.5" transform="translate(0 0)" d="M0 14 V18 H8 V14z">
                                <animateTransform attributeName="transform" type="translate" values="0 0; 24 0; 0 0" dur="2s" begin="0.1s" repeatCount="indefinite" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                            </path>
                            <path opacity="0.25" transform="translate(0 0)" d="M0 14 V18 H8 V14z">
                                <animateTransform attributeName="transform" type="translate" values="0 0; 24 0; 0 0" dur="2s" begin="0.2s" repeatCount="indefinite" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                            </path>
                        </svg>
                    }
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            No more movies!
                        </p>
                    }>
                    <h2 className="heading">Now Playing</h2>
                    <CSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={ 750 }
                        transitionLeaveTimeout={ 500 }>
                        <div className="nowplaying-container">
                        { nowPlaying }
                        </div>
                    </CSSTransitionGroup> 
                </InfiniteScroll>

                <InfiniteScroll    
                    pullDownToRefreshContent={
                        <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
                    }
                    releaseToRefreshContent={
                        <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
                    }
                    refreshFunction={ this.refresh }
                    next={ () => this.nextPage() }
                    hasMore={ true }
                    loader={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 14 32 4" width="100vw" height="8" fill="red" preserveAspectRatio="none">
                            <path opacity="0.8" transform="translate(0 0)" d="M2 14 V18 H6 V14z">
                                <animateTransform attributeName="transform" type="translate" values="0 0; 24 0; 0 0" dur="2s" begin="0" repeatCount="indefinite" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                            </path>
                            <path opacity="0.5" transform="translate(0 0)" d="M0 14 V18 H8 V14z">
                                <animateTransform attributeName="transform" type="translate" values="0 0; 24 0; 0 0" dur="2s" begin="0.1s" repeatCount="indefinite" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                            </path>
                            <path opacity="0.25" transform="translate(0 0)" d="M0 14 V18 H8 V14z">
                                <animateTransform attributeName="transform" type="translate" values="0 0; 24 0; 0 0" dur="2s" begin="0.2s" repeatCount="indefinite" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
                            </path>
                        </svg>
                    }
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            No more movies!
                        </p>
                    }>
                    <h2 className="heading">Results</h2>
                    <CSSTransitionGroup
                        className="results-container"
                        transitionName="fade"
                        transitionEnterTimeout={ 750 }
                        transitionLeaveTimeout={ 500 }>
                        { results }
                    </CSSTransitionGroup> 
                </InfiniteScroll>
                </div>

                <div className="filters">
                    <h1 id="reactflix">REACTFLIX</h1>
                    
                    <div className="genre-container">
                        <p style={{ fontFamily: "Montserrat", fontSize: "14px" }}>Genre</p>
                        <select className="genre-menu" value={ this.state.genre } onChange={ (e)=> this.handleGenreChange(e.target.value) }>
                            {
                                this.state.genres.map(genre=> (
                                    <option key={ genre.id } value={ genre.id }>{ genre.name }</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="sliders-container">
                        <Sliders 
                            onChange={ this.onChange } 
                            data={ this.state.year } 
                        />

                        <Sliders 
                            onChange={ this.onChange } 
                            data={ this.state.rating } 
                        />

                        <Sliders 
                            onChange={ this.onChange } 
                            data={ this.state.runtime } 
                        />
                    </div>

                    <button onClick={ () => this.submitSearch() } className="btn submit-btn">FIND MOVIES</button>   
                </div>
            </section>
        )
    }
}