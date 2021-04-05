import { Options, PythonShell } from "python-shell";

interface IObject {
  [key: string]: string[]
};

class EulerSatGenerator {
  private edges: string[];
  private vertices: string[];
  private steps: number;
  private predicates: string[] = [];
  private formulas: string[][] = [];

  constructor(edges: string[], vertices: string[], steps: number) {
    this.edges = edges;
    this.vertices = vertices;
    this.steps = steps;
  }

  public getFormulas(): string[][] {
    return this.formulas;
  }

  public getPredicates(): string[] {
    return this.predicates;
  }

  public generatePredicates() {
    let predicates: string[] = [];

    for(let aresta in this.edges) {
      let j = 1;

      while (j <= this.steps) {
        predicates.push(`${j}_${this.edges[aresta]}`);
        j += 1;
      }
    }

    this.predicates = predicates;

    let i = 0;

    for (let predicate in this.predicates) {
      console.log(`${i+1} = ${this.predicates[predicate]}\t`);

      if ((i+1) % this.steps === 0) {
        console.log('\n')
      }
      i++;
    }

    return predicates;
  }

  public generateTipTwo(): string[][] {

    const _formulas: [string, string][] = [] as any;

    this.predicates.forEach((p1) => {
      this.predicates.forEach((p2) => {
        if(p1 !== p2 && p1[0] === p2[0]) {
          const formulaToAppend: [string, string] = [`¬${p1}`,`¬${p2}`];

          _formulas.push(formulaToAppend);
        }
      })
    });

    this.formulas.push(..._formulas);

    return _formulas;
  }

  public generateTipThree(): string[][] {
    const _formulas: [string, string][] = [] as any;

    this.predicates.forEach((p1, i) => {
      this.predicates.forEach((p2) => {
        if(p1 !== p2) {
          if(p1.substring(2) === p2.substring(2)) {
            const formulaToAppend: [string, string] = [`¬${p1}`,`¬${p2}`];

            _formulas.push(formulaToAppend);
          }
        }
      })
    });

    this.formulas.push(..._formulas);

    return _formulas;
  }

  public generateFormulasBacking(): string[][] {
    const _formulas: [string, string][] = [] as any;

    this.predicates.forEach((p1, i) => {
      this.predicates.forEach((p2) => {
        if(p1 !== p2) {

          const toCompareString = p2.substring(2);
          const invertedString = toCompareString
            .split('')
            .map((char, i) => toCompareString[toCompareString.length - (i + 1)])
            .join('');

          if(p1.substring(2) === invertedString) {
            const formulaToAppend: [string, string] = [`¬${p1}`,`¬${p2}`];

            _formulas.push(formulaToAppend);
          }
        }
      })
    });

    this.formulas.push(..._formulas);

    return _formulas;
  }

  public generateFormulasNext(): string[] {
    const _formulas = [] as any;

    this.predicates.forEach((p1) => {
      let array: string[] = [`¬${p1}`];

      this.predicates.forEach((p2) => {
        if(p1 !== p2) {
          const p1Index = parseInt(p1[0], 10);
          const p2Index = parseInt(p2[0], 10);

          // 1_AB
          // 2_BC
          const p1LastChar = p1[p1.length - 1];
          const p2SecondLastChar = p2[p2.length - 2];

          if(
            ((p1Index + 1) === p2Index) && // 1 + 1 === 2
            (p1LastChar === p2SecondLastChar) && //
            p1[2] !== p2[3]
          ) {
            array.push(p2);
          }
        }
      })

      if (array.length > 1) {
        _formulas.push(array);
      }
    });

    this.formulas.push(..._formulas);

    return _formulas;
  }

  public generateFormulasPositives(): IObject {
    const _formulas: IObject = {};

    this.predicates.forEach((predicate) => {
      const edge = predicate.substring(2);
      const invertedEdge = edge
        .split('')
        .map((_, i) => edge[edge.length - (i + 1)])
        .join('');

      if (_formulas[edge]) {
        _formulas[edge].push(predicate);
      } else if (_formulas[invertedEdge]) {
        _formulas[invertedEdge].push(predicate);
      } else {
        _formulas[edge] = [predicate];
      }
    });

    Object.keys(_formulas).forEach((item) => {
      this.formulas.push(_formulas[item]);
    });

    return _formulas;
  }


  public getSatFormat() {
    const _formulas: number[][] = [];

    this.formulas.forEach((formula) => {
      const formulasInSatFormat: number[] = [];

      formula.forEach((predicate: string) => {
        if (this.predicates.indexOf(predicate) > -1) {
          formulasInSatFormat.push(this.predicates.indexOf(predicate) + 1);
        } else if ('¬' === predicate[0]) {
          formulasInSatFormat.push((this.predicates.indexOf(predicate.substring(1)) + 1) * -1);
        }
      });

      _formulas.push(formulasInSatFormat);
    });

    return _formulas;
  }

  public solve() {
    this.generatePredicates();
    this.generateTipTwo();
    this.generateTipThree();
    this.generateFormulasBacking();
    this.generateFormulasNext();
    this.generateFormulasPositives();

    const satFormat = this.getSatFormat();
    const parsedData = satFormat.join('\n');
    const predicates = this.getPredicates();

    let options: Options = {
      mode: 'text',
      pythonOptions: ['-u'],
      args: [parsedData],
    };

    PythonShell.run('./src/python.py', options, function (err, results: any[] | undefined) {
      if (err) {
        throw err
      };

      if(results && results[0] === 'True') {
        console.log('Valid: True');
        console.log(`Clauses: ${results[1]}\n`);
        console.log('Eulerian Path:');
        console.log('--------------\n');

        for(let i = 2; i < results.length; i++) {
          const parsedResult = parseInt(results[i]);

          console.log(`${parsedResult} = ${predicates[parsedResult]}\n`);
        }

        console.log('--------------');
      }
    });
  }
}

export default EulerSatGenerator;
