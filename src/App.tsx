import React, {FC} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {HomePage} from "./pages/WeatherCityPage";
import { WeatherCityFullPage } from './pages/WeatherCityFullPage';

const App: FC = () => {
    return <div className={"container"}>
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={HomePage}/>
                <Route path='/weather/:id' component={WeatherCityFullPage}/>
                <Redirect to={"/"}></Redirect>
            </Switch>
        </BrowserRouter>
    </div>
}

export default App;
