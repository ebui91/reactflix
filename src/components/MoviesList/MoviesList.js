import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CSSTransitionGroup } from 'react-transition-group';
import InfiniteScroll from 'react-infinite-scroll-component';
import Sliders from "../Sliders/Sliders.js";
import data from "../../genres.js";
import hover from "./hover.js";
import "./MoviesList.css";


export default class MoviesList extends Component{
    constructor(props){
        super(props);

        this.state= {
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
        this.onChange= this.onChange.bind(this);
        this.handleGenreChange= this.handleGenreChange.bind(this);
        this.nextPage= this.nextPage.bind(this);
        this.submitSearch= this.submitSearch.bind(this);
        this.pushRef= this.pushRef.bind(this);
    }

    // API call to generate currently popular movies each time the component mounts.
    componentDidMount(){
        axios.get("/api/movies").then(movies=> {
            console.log(movies.data);
            this.setState({ movieList: movies.data });
        });
    }

    // Method to handle user input for Sliders.
    onChange(data){
        this.setState({ [data.type]: { ...this.state[data.type], value: data.value } });
    };

    // Method to handle user input for genre dropdown menu.
    handleGenreChange(input){
        this.setState({ selectedGenre: input });
    }
    
    // Increments the current value of page and calls the submitSearch method for the next page of results.
    nextPage(){
        setTimeout(() => {
            var page= this.state.page++;
            this.submitSearch(page);
        }, 1000);
    }

    // Sends a request to the server with user-inputted data.
    submitSearch(page){
        axios.get("/api/filter", {
            params: {
                genre: this.state.selectedGenre,
                yearMin: this.state.year.value.min,
                yearMax: this.state.year.value.max,
                ratingMin: this.state.rating.value.min,
                ratingMax: this.state.rating.value.max,
                runtimeMin: this.state.runtime.value.min,
                runtimeMax: this.state.runtime.value.max,
                page: page
            }
        }).then(movies=> {
            this.setState({ movieList: this.state.movieList.concat(movies.data) });
        });
    }

    pushRef(ref){
        console.log("pushed");
        hover.addListener(ref);
    }

    render(){
        const imgURL= "http://image.tmdb.org/t/p/w342";
        const movies= this.state.movieList.map((movie, i)=> {
            return(
                <Link key={i} to={ `/movies/${movie.id}` } style={{ textDecoration: "none", width: "16%"}}>
                    <div className="movie-card" data-backdrop={ `http://image.tmdb.org/t/p/w1280${movie.backdrop_path}` } ref={(ref) => { this.movie= ref; this.pushRef(ref); } }>
                        <img className="movie-poster" src={ imgURL + movie.poster_path } style={{ width:"100%" }} alt="movie poster"></img>
                        <h4>{ movie.original_title }</h4>

                        <div className="movie-card-info">
                            <p>Release: <span>{ movie.release_date.substring(0,4) }</span></p>
                            <p>Rating: <span>{ movie.vote_average }/10</span></p>
                        </div>
                    </div>
                </Link>
            )
        });
        return(
            <section className="moviesList-view">
                <div className="filters-container">
                    <div className="overlay"></div>
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

                    <div className="genre-container">
                        <p style={{ fontFamily:"Montserrat", fontSize:"14px" }}>Genre</p>
                        <select className="genre-menu" value={ this.state.genre } onChange={ (e)=> this.handleGenreChange(e.target.value) }>
                            {
                                this.state.genres.map(genre=> (
                                    <option key={ genre.id } value={ genre.id }>{ genre.name }</option>
                                ))
                            }
                        </select>

                        <button onClick={ ()=> this.submitSearch() } className="btn submit-btn">FIND MOVIES</button>
                    </div>
                </div>
                
                <InfiniteScroll    
                    pullDownToRefreshContent={
                        <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
                    }
                    releaseToRefreshContent={
                        <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
                    }
                    refreshFunction={ this.refresh }
                    next={ ()=> this.nextPage() }
                    hasMore={ true }
                    loader={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 14 32 4" width="100vw" height="10" fill="red" preserveAspectRatio="none">
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
                    <CSSTransitionGroup
                        className="movies-container"
                        transitionName="example"
                        transitionEnterTimeout={ 500 }
                        transitionLeaveTimeout={ 300 }>
                        { movies }
                    </CSSTransitionGroup> 
                </InfiniteScroll>
            </section>
        )
    }
}