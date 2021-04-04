import EulerSatGenerator from './implementations/EulerSatGenerator';
import { Options, PythonShell, PythonShellError } from 'python-shell';

const vertices = ['A', 'B', 'C', 'D'];
const edges = ['AB', 'AC', 'BA', 'BC', 'BD', 'CA', 'CB', 'CD', 'DB', 'DC' ];
const steps = 5;

const Euler = new EulerSatGenerator(edges, vertices, steps);

Euler.generatePredicates();
Euler.generateTipTwo();
Euler.generateTipThree();
Euler.generateFormulasBacking();
Euler.generateFormulasNext();
Euler.generateDictionary();

const satFormat = Euler.getSatFormat();
const parsedData = satFormat.join('\n');
const predicates = Euler.getPredicates();

let options: Options = {
  mode: 'text',
  pythonOptions: ['-u'],
  args: [parsedData, ],
};

PythonShell.run('./src/python.py', options, function (err, results: any[] | undefined) {
  if (err) throw err;
    if(results && results[0]) {
      console.log('Valid: True');
      console.log(`Clauses: ${results[3]}`);
      console.log(`Vars: ${results[4]}\n`);

      for(let i = 5; i < results.length; i++) {
        const parsedResult = parseInt(results[i]);

        console.log(`${parsedResult} = ${predicates[parsedResult]}\n`);
      }
    }
});
