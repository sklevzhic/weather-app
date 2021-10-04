import React, {FC} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import './App.scss';
import {HomePage} from "./pages/home";
import { WeatherFullPage } from './pages/WeatherFullPage';

const App: FC = () => {
    return <div className={"container"}>
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={HomePage}/>
                <Route path='/weather/:id' component={WeatherFullPage}/>
            </Switch>
        </BrowserRouter>
    </div>
}

export default App;
