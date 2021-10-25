const Prisma = require('@prisma/client')
const prisma = new Prisma.PrismaClient();

module.exports ={ resolvers: {
Query: {
    hello: () => {
        return 'Hello World con Graphql'
    }
}
}
}