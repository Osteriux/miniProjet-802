import spyne as sp
from wsgiref.simple_server import make_server
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication
import lxml
from wsgiref.util import setup_testing_defaults

class CalcService(sp.Service):
    # distance (km), vitesse (km/h), temps de charge (s), nombre de charge (km)
    @sp.rpc(sp.Float, sp.Float, sp.Integer, sp.Integer, _returns=sp.Float)
    def calcTravelTime(self, distance, speed, chargeTime, nbCharge):
        travelTime = (distance / speed) * 3600 # calcul du temps de trajet en secondes
        travelTime += nbCharge * chargeTime # ajout du temps de charge
        return travelTime

application = sp.Application([CalcService], 'miniprojet.soap.calcservice', # definition de l'application utilisant la classe HelloWorldService
    in_protocol= Soap11(validator='lxml'), # definition du protocole d'entree
    out_protocol= Soap11()) # definition du protocole de sortie

def simple_cors_middleware(app):
    def middleware(environ, start_response):
        setup_testing_defaults(environ)
        if environ['REQUEST_METHOD'] == 'OPTIONS':
            start_response('200 OK', [
                ('Access-Control-Allow-Origin', '*'),
                ('Access-Control-Allow-Methods', 'POST, GET, OPTIONS'),
                ('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Origin'),
            ])
            return [b'']
        else:
            def custom_start_response(status, headers, exc_info=None):
                headers.append(('Access-Control-Allow-Origin', '*'))
                return start_response(status, headers, exc_info)
            return app(environ, custom_start_response)
    return middleware

wsgi_application = simple_cors_middleware(WsgiApplication(application)) # definition de l'application wsgi pour le serveur
server = make_server('127.0.0.1', 8000, wsgi_application)
print("soap listening on 127.0.0.1:8000")
server.serve_forever()
