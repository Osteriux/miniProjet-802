from zeep import Client

client = Client('http://localhost:8000/?wsdl')
result = client.service.calcTravelTime(463, 80, 1800, 100)

h = result//3600
m = (result%3600)//60
print(f"{int(h)}h{int(m)}") # affichage du temps de trajet en heures
