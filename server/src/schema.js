const { makeExecutableSchema, gql } = require('apollo-server')
//const { resolvers } = require('./resolvers')

const typeDefs = gql`

type Query {
    hello: String
}

`;

const resolvers = {
    Query: {
        hello: () => {
            return 'Hello World con Graphql'
        },
    }
    }

const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
})

