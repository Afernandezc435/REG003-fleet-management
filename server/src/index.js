const { readFile } = require("../../data/devFlow")

console.log('q ', readFile('/home/rocio/LIM014/REG003-fleet-management/server/src/dummy.txt'))
const otrafuncion = async () => {
    console.log(await readFile('/home/rocio/LIM014/REG003-fleet-management/server/src/dummy.txt'))
}

// console.log('aaaaaaa', otrafuncion())

otrafuncion()