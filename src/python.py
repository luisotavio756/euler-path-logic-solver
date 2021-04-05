import sys
from pysat.solvers import Glucose4
from pysat.formula import CNF
from pysat.solvers import Solver

try:
  clauses = sys.argv[1].split('\n')
except:
  print('ERROR')
  sys.exit(1)

glucoseInstance = Glucose4()
formulaInFncFormat = CNF()

for f in clauses:
  formulaInFncFormat.append(eval(f))

glucoseInstance.append_formula(formulaInFncFormat)

print(glucoseInstance.solve())
print(glucoseInstance.nof_clauses())

for p in glucoseInstance.get_model():
  if p > 0:
    print(p)
