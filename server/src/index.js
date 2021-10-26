const { ApolloServer, gql } = require('apollo-server');

const Prisma = require('@prisma/client')
const prisma = new Prisma.PrismaClient();

const typeDefs = gql`
scalar ISODate 
type Car {
    id: String
    placa: String
    trajectories: [Trajectories]
}
type Trajectories {
    id: String
    created_at: ISODate
    latitude: Float
    longitude: Float
    taxi: Car!
    
}
type Query {
    car(placa: String, date: String, dateT: String ): [Trajectories]
    taxis(placa: String, date: String, dateT: String ): [Car]
    recents(placa: String, date: String, dateT: String ): [Trajectories]
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
        async recents (parent, args, ctx) {
            if(!args.placa) {
                return []
            }
            const trajectories = await prisma.trajectories.findMany({
                where: {
                    taxi: {
                        placa: args.placa
                    },
                },
                orderBy: [{
                    created_at: 'desc'
                }],
                include: {
                    taxi: true,
                },
                take: 100,
            })

            return trajectories;
        },
        async taxis (parent, args, ctx) {
            const taxis = await prisma.taxis.findMany({
                orderBy: [{
                    placa: 'asc'
                }]
            })
            return taxis;
        },
    }
}
// "2008-02-03"
// "2008-02-04"


const server = new ApolloServer({typeDefs, resolvers})



server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
})
