import { Query} from 'react-apollo'
import { gql } from 'apollo-boost'


const recents = gql`
  query Query($placa: String) {
  recents(placa: $placa) {
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
function Recents({placa}) {
    return (
        <Query query={recents} variables={{placa}}>
            {({ loading, error, data}) => {
                if (loading) return <p> loading...</p>
                if (error) return <p> Sorry, we have an error...</p>

                return (
                    <div className="gifts__container">
                        {data.giphy.search.map(
                            ({id , created_at,latitude, longitude }) => (
                                <img key={id}/>
                            )
                        )}
                    </div>
                )
            }}
        </Query>
    )
}
