import React from 'react';

import Button from 'react';
import {Switch,Route,Redirect} from "react-router-dom";
import Home from "../screens/Home";


export function AppNavigation(){
    return (
        <Switch>
            <Route exact path='/' component={Home} />

            <Redirect from="*" to="/" />
        </Switch>
    )
}
