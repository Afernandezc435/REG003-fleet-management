const { ApolloServer, gql } = require('apollo-server');


const typeDefs = gql`

type Query {
    upcomingEvents: [Event!]!
}
type Event {
name: String!
date: String!
location: Location
}
type Location {
name: String!
}
`;

const resolvers = {
    Query: {
        hello: () => {
            return 'Hello World con Graphql'
        },
    }
    }



const server = new ApolloServer({typeDefs, resolvers})



server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
})
