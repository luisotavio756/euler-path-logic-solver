interface IDict {
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

    this.predicates.forEach((actual) => {
      this.predicates.forEach((other) => {
        if(actual !== other && actual[0] === other[0]) {
          const formulaToAppend: [string, string] = [`¬${actual}`,`¬${other}`];

          _formulas.push(formulaToAppend);
        }
      })
    });

    this.formulas.push(..._formulas);

    return _formulas;
  }

  public generateTipThree(): string[][] {
    const _formulas: [string, string][] = [] as any;

    this.predicates.forEach((actual, i) => {
      this.predicates.forEach((other) => {
        if(actual !== other) {
          if(actual.substring(2) === other.substring(2)) {
            const formulaToAppend: [string, string] = [`¬${actual}`,`¬${other}`];

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

    this.predicates.forEach((actual, i) => {
      this.predicates.forEach((other) => {
        if(actual !== other) {
          const toCompareString = other.substring(2);
          const invertedString = toCompareString
            .split('')
            .map((char, i) => toCompareString[toCompareString.length - (i + 1)])
            .join('');

          if(actual.substring(2) === invertedString) {
            const formulaToAppend: [string, string] = [`¬${actual}`,`¬${other}`];

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

    this.predicates.forEach((actual) => {
      let aux: string[] = [`¬${actual}`];

      this.predicates.forEach((other) => {
        if(actual !== other) {
          const actualIndex = parseInt(actual[0], 10);
          const otherIndex = parseInt(other[0], 10);

          const actualLastChar = actual[actual.length - 1];
          const otherSecondLastChar = other[other.length - 2];

          if(
            ((actualIndex + 1) === otherIndex) &&
            (actualLastChar === otherSecondLastChar) &&
            actual[2] !== other[3]
          ) {
            aux.push(other);
          }
        }
      })

      if (aux.length > 1) {
        _formulas.push(aux);
      }
    });

    this.formulas.push(..._formulas);

    return _formulas;
  }

  public generateDictionary(): IDict {
    const dictionary: IDict = {};

    this.predicates.forEach((predicado) => {
      const edge = predicado.substring(2);
      const invertedEdge = edge
        .split('')
        .map((_, i) => edge[edge.length - (i + 1)])
        .join('');

      if (dictionary[edge]) {
        dictionary[edge].push(predicado);
      } else if (dictionary[invertedEdge]) {
        dictionary[invertedEdge].push(predicado);
      } else {
        dictionary[edge] = [predicado];
      }
    });

    Object.keys(dictionary).forEach((item) => {
      this.formulas.push(dictionary[item]);
    });

    return dictionary;
  }

  public getSatFormat() {
    const _formulas: number[][] = [];

    this.formulas.forEach((formula) => {
      const formulaGlucose: number[] = [];

      formula.forEach((predicate: string) => {
        if (this.predicates.indexOf(predicate) > -1) {
          formulaGlucose.push(this.predicates.indexOf(predicate) + 1);
        } else if ('¬' === predicate[0]) {
          formulaGlucose.push((this.predicates.indexOf(predicate.substring(1)) + 1) * -1);
        }
      });

      _formulas.push(formulaGlucose);
    });

    return _formulas;
  }

  public solve() {
      this.generatePredicates();
      this.generateTipTwo();
      this.generateTipThree();
      this.generateFormulasBacking();
      this.generateFormulasNext();
      this.generateDictionary();
  }
}

export default EulerSatGenerator;
