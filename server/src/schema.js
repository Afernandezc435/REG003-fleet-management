const { makeExecutableSchema, gql } = require('apollo-server')
//const { resolvers } = require('./resolvers')

const typeDefs = gql`

type Car {
    id: String
    placa: String
}

type Query {
    car(placa: String): Car
}



`;

const resolvers = {
    Query: {
        car: (_, args) => {
            return 'Hello World con Graphql ${args.placa}'
        },
    }
    }

const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
})

