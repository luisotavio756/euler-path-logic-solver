
<h1 align="">
  Eulerian Problem Logic Solver
</h1>
<h4 align="center">
  This project use the logic principies to model the euler path problem in logic language, so, the problem is solved using a SAT SOLVER developer in Python.
  The project was developed to my university Computer Logic Work.
</h4>
<p align="center">
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;
</p>

## :rocket: Technologies

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Python Shell](https://www.npmjs.com/package/python-shell)

## :information_source: How To Use

**NOTE**: Consider already installed the **python**, **pysat** and maybe the **pytest**.
- To install Python, [Click Here](https://python.org.br/instalacao-windows/)

```bash
  # To install Python-Sat
  $ pip install python-sat

  # To install pyteste(if neccessary)
  $ pip install pytest
```

---

```bash
# Clone this repository
$ git clone https://github.com/luisotavio756/euler-path-logic-solver.git

# Go into the repository
$ cd euler-path-logic-solver

# Install packages
$ yarn install or npm install

# Run Script
$ yarn start

# Enjoy!
```

### After the instalation

Open the index.ts file, in src folder.
Put the vertices and edges that made a eulerian path. **If it's a graph, else, a error will happen in console**

```ts
const vertices = ['A', 'B', 'C', 'D'];
const edges = ['AB', 'AC', 'BA', 'BC', 'BD', 'CA', 'CB', 'CD', 'DB', 'DC' ];
const steps = 5;

const Euler = new EulerSatGenerator(edges, vertices, steps);

Euler.solve();
```

---

Made with ♥ by Luis Otávio :wave:

