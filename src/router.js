import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Import components to be rendered.
import MoviesList from "../src/components/MoviesList/MoviesList.js";
import MovieInfo from "../src/components/MovieInfo/MovieInfo.js";


export default(
    <BrowserRouter>
        <Switch>
            <Route component={ MoviesList } exact path= "/" />
            <Route component={ MovieInfo } path="/movies/:id" />
        </Switch>
    </BrowserRouter>
)

