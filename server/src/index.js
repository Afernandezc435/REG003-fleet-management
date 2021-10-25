const { ApolloServer, gql } = require('apollo-server');

const Prisma = require('@prisma/client')
const prisma = new Prisma.PrismaClient();


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
        async car (parent, args, ctx) {

            console.log('que es?', args.placa)
            const taxi = await prisma.taxis.findFirst({
                where: {
                    placa: args.placa,
                },
            })

            return taxi
        },
    }
    }



const server = new ApolloServer({typeDefs, resolvers})



server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
})