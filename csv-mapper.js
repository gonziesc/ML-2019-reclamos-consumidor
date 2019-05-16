const fs = require('fs'); 
const parse = require('csv-parse');

const csvData=[];
const empresas=[];
const rubros=[];

const nombres_empresas = ["Despegar.com.ar SA", "Directv Argentina SA", "Telecom Personal SA", "Latam Airlines Group SA", "Wal- Mart Argentina SR", "Ford Argentina Sca"];

fs.createReadStream('./reclamos-ingresados.csv')
    .pipe(parse({delimiter: ';'}))
    .on('data', function(csvrow) {
        const obj =  {
            empresa: csvrow[2],
            rubro: csvrow[4],
            estado: csvrow[11] || 'Pendiente',
            provincia: parseInt(csvrow[14] || -1 )  ,
        };
        if (nombres_empresas.includes(obj.empresa) ) {
            csvData.push(obj);
        }
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
      const completeDataset = [];
      csvData.forEach(elem => {
          if (empresas.findIndex(e => e === elem.empresa) === 56 || // Empresas no identificadas por consumidor
              elem.provincia == -1) return;
          completeDataset.push({
            input: [empresas.findIndex(e => e === elem.empresa), 
                  rubros.findIndex(e => e === elem.rubro),
                    elem.provincia],
            output: [elem.estado === 'Pendiente' ? 1 : 0]
         });

      })
       const dataset = [
        ...completeDataset.filter(e => e.output[0] == 0).slice(1,5),
        ...completeDataset.filter(e => e.output[0] == 1).slice(0,5)
       ]
       console.log(require('util').inspect(dataset, { maxArrayLength: null }));
       console.log(dataset.length);

    });