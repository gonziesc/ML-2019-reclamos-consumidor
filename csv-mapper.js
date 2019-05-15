const fs = require('fs'); 
const parse = require('csv-parse');

const csvData=[];
const empresas=[];
const rubros=[];

fs.createReadStream('./reclamos-ingresados.csv')
    .pipe(parse({delimiter: ';'}))
    .on('data', function(csvrow) {
        const obj =  {
            empresa: csvrow[2],
            rubro: csvrow[6],
            estado: csvrow[11] || 'Pendiente',
        };   
        csvData.push(obj);
    })
    .on('end',function() {
        csvData.forEach(elem => {
            if (!empresas.find(empresa => empresa == elem.empresa)) {
                empresas.push(elem.empresa);
            }
            if (!rubros.find(rubro => rubro == elem.rubro)) {
                rubros.push(elem.rubro);
            }
        });
      const dataset = [];
      csvData.forEach(elem => {
          if (empresas.findIndex(e => e === elem.empresa) === 56) return; // Empresas no identificadas por consumidor
          dataset.push({
            input: [empresas.findIndex(e => e === elem.empresa), rubros.findIndex(e => e === elem.rubro)],
            output: [elem.estado === 'Pendiente' ? 1 : 0]
         });
      })
       console.log(require('util').inspect(dataset, { maxArrayLength: null }));
       console.log(dataset.length);
    });