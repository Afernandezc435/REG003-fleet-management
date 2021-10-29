import { gql, useQuery} from '@apollo/client'
import {Layer, Feature} from 'react-mapbox-gl'
const recents = gql `
query Query($placa: String) {
recents(placa: $placa){
id
created_at
latitude
longitude
taxi {
placa
}
}
}
`;
function Recents({plca}) {
    const { loading, error, data} = useQuery(recents, {
        variables: { plca}
    })
    if (loading) return 'Loading..'
    if (error) return `Error! ${error.menssage}`;
    return (
        <Layer
        type="symbol"
        id="marker"
        layout={{'icon-image': 'marker-15'}}>
            {
                data.recents.map(pin => (
                    pins.map(pin => (
                        <Feature
                    key={pin.longitude + pin.latitude}
                    coordinates={[pin.longitude, pin.latitude]}
                    />
                    ))

            }

</Layer>
    )
}
