import React, {useState} from 'react'
import ReactMapGl from 'react-map-gl'



// api key here "2gbJYzD9mbRmi7NIvnLBumblv9BmLbZ_IGakIXynUIw"

export const DisplayMapClass = () => {
    const [viewport, setViewport] = useState ({
      latitude: 45.4211,
      longitude: -75.7903,
      width: window.innerWidth,
      heigth: window.innerHeight,
      zoom: 10,
      bearing:0,
      pitch:0,
      mapboxApiAccessToken:'pk.eyJ1Ijoicm9jaW92YWxlbnRpbiIsImEiOiJja3Y3a3FmOGk5bDA5MnFuemFkYW04ZTFhIn0.l4fpHj8g8-aLdR2df0YemA'
    }) 
    return <div> 
      <ReactMapGl
      //mapStyle="mapbox://styles/leighhalliday/cjufmjn1r2kic1fl9wxg7u1l4"
      //mapStyle="mapbox://styles/mapbox/dark-v9"
      {...viewport}  
      onViewportChange={newView => {
          setViewport(newView);
        }}
      >
      </ReactMapGl> 
      </div>
}