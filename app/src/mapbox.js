import { gql, useQuery } from '@apollo/client';

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
    const { loading, error, data } = useQuery(recents, {
        variables: { placa }
    });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <select name="recent" onChange={onRecentSelected}>
            {data.recents.map(recent => (
                <option key={recent.id} value={recent.created_at}>
                    {dog.created_at}
                </option>
            ))}
        </select>
    );
}
