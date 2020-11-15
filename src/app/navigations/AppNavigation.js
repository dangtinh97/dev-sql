import React from 'react';

import Button from 'react';
import {Switch,Route,Redirect} from "react-router-dom";
import Home from "../screens/Home";
import SongDetail from "../screens/SongDetail";
// import '../../../public/assets/footer.scss';

export function AppNavigation(){
    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/bai-hat/:id' component={SongDetail} />
            <Redirect from="*" to="/" />
        </Switch>
    )
}
