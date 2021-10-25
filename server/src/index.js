const { ApolloServer, gql } = require('apollo-server');

const Prisma = require('@prisma/client')
const prisma = new Prisma.PrismaClient();


const typeDefs = gql`

scalar ISODate 

type Car {
    id: String
    placa: String
}

type Trajectories {
    id: String
    created_at: ISODate
    latitude: Float
    longitude: Float
}

type Query {
    car(placa: String, date: String, dateT: String ): [Trajectories]
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

            const trajectories = await prisma.trajectories.findMany({
                where: {
                    id: taxi.id,
                    created_at: { gte: new Date(args.date), lt: new Date(args.dateT) }
                }
            })
            
            console.log('trajectories', trajectories)
            console.log('id', taxi.id)

            return trajectories;
        },
    }
    }

    // "2008-02-03"
    // "2008-02-04"


const server = new ApolloServer({typeDefs, resolvers})



server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
})