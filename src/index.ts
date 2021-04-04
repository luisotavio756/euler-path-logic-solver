import EulerSatGenerator from './implementations/EulerSatGenerator';
import {Options, PythonShell} from 'python-shell';

const vertices = ['A', 'B', 'C', 'D'];
const edges = ['AB', 'AC', 'BA', 'BC', 'BD', 'CA', 'CB', 'CD', 'DB', 'DC' ];
const steps = 5;

const Euler = new EulerSatGenerator(edges, vertices, steps);

// Euler.generatePredicates();
// Euler.generateTipTwo();
// Euler.generateTipThree();
// Euler.generateFormulasBacking();
// Euler.generateFormulasNext();
// Euler.generateDictionary();

// console.log(Euler.getSatFormat());

let options: Options = {
    mode: 'text',
    pythonOptions: ['-u'],
    args: ['value1', 'value2', 'value3']
};

PythonShell.run('./src/python.py', options, function (err, results) {
  if (err) throw err;
    // Results is an array consisting of messages collected during execution
    console.log('results: %j', results);
});
