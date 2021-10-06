import React, {FC} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {HomePage} from "./pages/HomePage";
import {WeatherCityPage} from './pages/WeatherCityPage';

const App: FC = () => {
    return <div className={"container"}>
        <BrowserRouter>
            <Switch>
                <Route path='/' exact>
                    <HomePage />
                </Route>
                <Route path='/weather/:id' exact>
                    <WeatherCityPage />
                </Route>
                <Redirect to={"/"}></Redirect>
            </Switch>
        </BrowserRouter>
    </div>
}

export default App;
