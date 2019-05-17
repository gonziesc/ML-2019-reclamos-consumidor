const fs = require('fs'); 
const parse = require('csv-parse');

const shuffle = array => array.sort(() => Math.random() - 0.5);

const doesNotExistIn = (obj, list) => list.findIndex(elem => 
    elem.empresa == obj.empresa &&
    elem.rubro == obj.rubro &&
    elem.estado == obj.estado &&
    elem.provincia == obj.provincia) == -1

const csvData=[];
const empresas=[];
const rubros=[];

const nombres_empresas = ["Despegar.com.ar SA", "Directv Argentina SA", "Telecom Personal SA", "Latam Airlines Group SA", "Wal- Mart Argentina SR", "Ford Argentina Sca"];

fs.createReadStream('./reclamos-ingresados.csv')
    .pipe(parse({delimiter: ';'}))
    .on('data', function(csvrow) {
        const obj =  {
            empresa: csvrow[2],
            rubro: csvrow[7],
            estado: csvrow[11] || 'Pendiente',
            provincia: parseInt(csvrow[14] || -1 )  ,
        };
        if (
            doesNotExistIn(obj, csvData)        ) {
            if (!empresas.find(empresa => empresa == obj.empresa)) {
                empresas.push(obj.empresa);
            }
            if (!rubros.find(rubro => rubro == obj.rubro)) {
                rubros.push(obj.rubro);
            }
            csvData.push(obj);
        }
    })
    .on('end',function() {
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
        ...shuffle(completeDataset).filter(e => e.output[0] == 0).slice(1,1000),
        ...shuffle(completeDataset).filter(e => e.output[0] == 1).slice(0,1001)
       ]
       // const testSet = shuffle(completeDataset).slice(0,200)
       console.log(require('util').inspect(completeDataset, { maxArrayLength: null }));
       // console.log(require('util').inspect(testSet, { maxArrayLength: null }));

       console.log(completeDataset.length);

    });