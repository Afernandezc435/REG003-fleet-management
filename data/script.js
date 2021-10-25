const Prisma = require('@prisma/client')
const lineReader = require("line-reader");
const fs = require("fs");

const prisma = new Prisma.PrismaClient();

async function main() {
    /* carga de taxis*/
    let root = 'C:\\Users\\HP\\Downloads\\taxis'
    let files = fs.readdirSync(root)//.splice(0,1)
    for (let file of files) {
        const lines = fs.readFileSync(root+'\\'+file, 'utf-8').split('\n')
        let taxis = []
        for (let line of lines/*.splice(0,2)*/) {
            // do whatever you want with line...
            let [ id, placa] = line.split(',');
            if (id && placa) {
                taxis.push({id, placa})
            }
        }
        await prisma.taxis.createMany({data:taxis, skipDuplicates: true})
        console.log("File: ", root+'\\'+file, " loaded in postgres ");
    }

    /* carga de trayectoria*/
    root = 'C:\\Users\\HP\\Downloads\\trajectories'
    files = fs.readdirSync(root)//.splice(0,1)
    for (let file of files) {
        const lines = fs.readFileSync(root+'\\'+file, 'utf-8').split('\n')
        let trajectories = []
        for (let line of lines/*.splice(0,2)*/) {
            // do whatever you want with line...
            let [ id, created_at, latitude, longitude] = line.split(',');
            if (id && created_at) {
                trajectories.push({
                    id: id,
                    created_at: new Date(created_at),
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude)
                })
            }
        }
        await prisma.trajectories.createMany({data:trajectories, skipDuplicates: true})
        console.log("File: ", root+'\\'+file, " loaded in postgres");
    }
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
module.exports ={prisma}
