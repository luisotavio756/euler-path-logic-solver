import EulerSatGenerator from './implementations/EulerSatGenerator';

const vertices = ['A', 'B', 'C', 'D'];
const edges = ['AB', 'AC', 'BA', 'BC', 'BD', 'CA', 'CB', 'CD', 'DB', 'DC'];
const steps = 5;

const Euler = new EulerSatGenerator(edges, vertices, steps);

Euler.solve();

