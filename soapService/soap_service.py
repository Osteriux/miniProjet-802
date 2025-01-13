from wsgiref.simple_server import make_server
import spyne as sp
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication
import lxml

class CalcService(sp.Service):
    # distance (km), vitesse (km/h), temps de charge (s), distance de charge (km)
    @sp.rpc(sp.Float, sp.Float, sp.Integer, sp.Float, _returns=sp.Float)
    def calcTravelTime(self, distance, speed, chargeTime, chargeDistance):
        travelTime = (distance / speed) * 3600 # calcul du temps de trajet en secondes
        nbCharge = distance // chargeDistance # calcul du nombre de charge
        travelTime += nbCharge * chargeTime # ajout du temps de charge
        return travelTime

application = sp.Application([CalcService], 'spyne.examples.hello.soap', # definition de l'application utilisant la classe HelloWorldService
    in_protocol= Soap11(validator='lxml'), # definition du protocole d'entree
    out_protocol= Soap11()) # definition du protocole de sortie


wsgi_application = WsgiApplication(application) # definition de l'application wsgi pour le serveur
server = make_server('127.0.0.1', 8000, wsgi_application)
server.serve_forever()
