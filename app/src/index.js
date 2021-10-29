import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import App from './App';
import { ApolloProvider} from 'react-apollo'
import { client} from './config/apollo'

export default () => (
    <ApolloProvider client={ client}>
        <App />
    </ApolloProvider>
)
