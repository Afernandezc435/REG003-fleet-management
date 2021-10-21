const fs = require('fs');
const lr = require('readline');

// Evaluando si la ruta es directorio
const isDir = (route) => {
    const exist = fs.existsSync(route);
    let isDirectory;
    if (exist === true) {
      const stats = fs.statSync(route);
      isDirectory = stats.isDirectory(route);
    } else {
      isDirectory = undefined;
    }
    return isDirectory;
  };

// Identifica la extension del archivo
const extMD = (route) => path.extname(route);

// Lee el directorio y extrae .txt
const readDir = (route) => {
    let allTxt = [];
    const dataDir = fs.readdirSync(route);
    dataDir.forEach((files) => {
      const filePath = path.join(route, files);
      if (extMD(filePath) === '.txt') {
        allMD.push(filePath);
      } else if (isDir(filePath) === true) {
        allTxt = allTxt.concat(readDir(filePath));
      }
    });
    return allTxt;
  };


const readFile = async (route) => {
let data= [];
const obj = [];
const lineReader= lr.createInterface({
  input: fs.createReadStream(route)
});

await lineReader.on('line', function (line) {
    //console.log('que es esto', line.length)
    if (line.length <= 16) {
    let [ id, placa] = line.split(',');
    obj[Object.keys(obj).length || 0] = {id, placa};
    } else {
    let [ id_location, fecha_hora, latitud, longitud] = line.split(',');
    obj[Object.keys(obj).length || 0] = {id_location, fecha_hora, latitud, longitud};
    }

});

await lineReader.on('close', ()=>{
     data = JSON.stringify(obj);
     // console.log('data', data)
     
});
 
return data;
}

module.exports = {readFile}