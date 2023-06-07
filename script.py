from pyomo.environ import *

# Données du problème
num_customers = 5
num_vehicles = 2

# Coordonnées des clients
customer_coords = {
    1: (1, 1),
    2: (2, 2),
    3: (3, 3),
    4: (4, 4),
    5: (5, 5)
}

# Coordonnées du dépôt (départ et arrivée des véhicules)
depot_coord = (0, 0)

# Capacité des véhicules
vehicle_capacity = {
    1: 10,
    2: 8
}

# Demande des clients
customer_demand = {
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    5: 1
}

# Création du modèle d'optimisation
model = ConcreteModel()

# Ensembles
model.customers = Set(initialize=range(1, num_customers + 1))
model.vehicles = Set(initialize=range(1, num_vehicles + 1))

# Variables de décision
model.x = Var(model.customers, model.customers, model.vehicles, domain=Binary)
model.y = Var(model.customers, model.vehicles, domain=Binary)

# Fonction objectif
model.objective = Objective(
    expr=sum(model.x[i, j, k] for i in model.customers for j in model.customers for k in model.vehicles),
    sense=minimize
)

# Contraintes
def demand_constraint_rule(model, customer):
    return sum(model.y[customer, k] * customer_demand[customer] for k in model.vehicles) >= customer_demand[customer]

model.demand_constraint = Constraint(model.customers, rule=demand_constraint_rule)

def capacity_constraint_rule(model, vehicle):
    return sum(model.y[i, vehicle] * customer_demand[i] for i in model.customers) <= vehicle_capacity[vehicle]

model.capacity_constraint = Constraint(model.vehicles, rule=capacity_constraint_rule)

def flow_constraint_rule(model, customer):
    return sum(model.x[i, customer, k] for i in model.customers for k in model.vehicles if i != customer) == 1

model.flow_constraint = Constraint(model.customers, rule=flow_constraint_rule)

def flow_in_constraint_rule(model, customer):
    return sum(model.x[customer, i, k] for i in model.customers for k in model.vehicles if i != customer) == 1

model.flow_in_constraint = Constraint(model.customers, rule=flow_in_constraint_rule)

# Solveur
solver = SolverFactory('cbc')
results = solver.solve(model)
print('exemple')
# Affichage des résultats
print("Status:", results.solver.status)
print("Objective value:", model.objective())
for k in model.vehicles:
    print(f"Route du véhicule {k}:")
    route = [i for i in model.customers if model.y[i, k].value == 1]
    print(route)
