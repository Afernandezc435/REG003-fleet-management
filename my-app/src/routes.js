import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Ubication from './ubications'
import NotFound from './NotFound'

function Application() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={App} />
                <Route path="/ubication" component={Ubication} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Application
