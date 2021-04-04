import sys
from pysat.solvers import Glucose4
from pysat.formula import CNF
from pysat.solvers import Solver

try:
  formulas_glucose = sys.argv[1].split('\n')
except:
  print('ERROR')
  sys.exit(1)

g = Glucose4()
formula = CNF()

for f in formulas_glucose:
  formula.append(eval(f))

g.append_formula(formula)

print(g.solve())

print(g.solve())
print(g.get_status())
print(g.nof_clauses())
print(g.nof_vars())
for p in g.get_model():
  if p > 0:
    print(p)
