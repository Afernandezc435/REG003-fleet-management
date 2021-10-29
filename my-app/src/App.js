import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import { DisplayMapClass } from './DisplayMapClass'

import ReactDOM from 'react-dom';
import './App.css';

import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";

/*const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

client
.query({
  query: gql`
  query{
      car (placa:"PAOF-6727", date:"2008-02-05", dateT:"2008-02-06") {
        id,
        latitude
        created_at
        longitude
      ,
      }

    }
  `
})
.then(result => console.log(result));
*/

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9jaW92YWxlbnRpbiIsImEiOiJja3Y3a3FmOGk5bDA5MnFuemFkYW04ZTFhIn0.l4fpHj8g8-aLdR2df0YemA';

const Marker = ({ onClick, children, feature }) => {
  const _onClick = (e) => {
    onClick(feature.properties.description);
  };

  return (
    <button onClick={_onClick} className="marker">
      {/** <img alt = '' style={fontSize: '16px'} src='https://cdn-icons.flaticon.com/png/512/4620/premium/4620349.png?token=exp=1635398252~hmac=33119adbd51a55865c511edb105d56d9' /> **/}
      {children}
    </button>
  );
};


function App() {
  const [data, setData] = useState([])

  useEffect(()=> {

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache()
    });

    client
        .query({
          query: gql`
      query{
          car (placa:"PAOF-6727", date:"2008-02-05", dateT:"2008-02-06") {
            id
            latitude
            created_at
            longitude
            taxi {
              placa
            }
          }
        }
      `
        })
        .then(result => setData(result));

  }, [])

  console.log('eeeeeee', (data.data || {}).car)

  const mapContainerRef = useRef(null);
    // const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

     // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
    // Render custom marker components
      ((data.data || {}).car || []).forEach((feature) => {
        // Create a React ref
        const ref = React.createRef();
        // Create a new DOM node and save it to the React ref
        ref.current = document.createElement('div');
        // Render a Marker Component on our new DOM node
        let point = {
          type: "Feature",
          properties: {
            title: feature.id,
            description: feature.taxi.placa
          },
          geometry: {
            coordinates: [feature.latitude, feature.longitude],
            type: "Point"
          }
        }
        ReactDOM.render(
            <Marker onClick={markerClicked} feature={point} />,
            ref.current
        );
      // Create a Mapbox Marker at our new DOM node
      new mapboxgl.Marker(ref.current)
        .setLngLat(point.geometry.coordinates)
        .addTo(map);
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const markerClicked = (title) => {
    window.alert(title);
  };


      return (
        <div>
      <div className="sidebarStyle">
      <input type='text' />
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
      );
}
export default App;
