import sys
from pysat.solvers import Glucose4
from pysat.formula import CNF

try:
  clauses = sys.argv[1].split('\n')
except:
  print('ERROR')
  sys.exit(1)

glucoseInstance = Glucose4()
formulaInFncFormat = CNF()

for clause in clauses:
  formulaInFncFormat.append(eval(clause))

glucoseInstance.append_formula(formulaInFncFormat)

print(glucoseInstance.solve())
print(glucoseInstance.nof_clauses())

for result in glucoseInstance.get_model():
  if result > 0:
    print(result)

