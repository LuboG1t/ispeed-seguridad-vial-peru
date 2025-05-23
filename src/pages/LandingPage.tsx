
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, TrendingDown, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-ispeed-gray to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-ispeed-black/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-ispeed-black mb-6">
              iSpeed
              <span className="text-ispeed-red"> IA</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Sistema de inteligencia artificial diseñado para mejorar la seguridad vial 
              en el transporte interprovincial terrestre del Perú
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/register')}
                className="bg-ispeed-red hover:bg-red-700 text-white px-8 py-3 text-lg"
              >
                Comenzar Ahora
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-ispeed-red text-ispeed-red hover:bg-ispeed-red hover:text-white px-8 py-3 text-lg"
              >
                Iniciar Sesión
              </Button>
            </div>
          </div>
        </div>
        
        {/* Road Animation */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gray-800 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-1 bg-white animate-road-move opacity-60"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ispeed-black mb-4">
              Prevención de Accidentes en Tiempo Real
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Analizamos velocidad, ubicación GPS y condiciones climáticas para emitir 
              alertas inteligentes que salvan vidas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 border-gray-100 hover:border-ispeed-red transition-colors">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-ispeed-red mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-ispeed-black mb-2">
                  Seguridad Avanzada
                </h3>
                <p className="text-gray-600">
                  Alertas por voz en tiempo real cuando se detectan condiciones peligrosas
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-ispeed-red transition-colors">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-ispeed-red mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-ispeed-black mb-2">
                  Análisis Instantáneo
                </h3>
                <p className="text-gray-600">
                  Procesamiento de múltiples variables simultáneamente para decisiones precisas
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-ispeed-red transition-colors">
              <CardContent className="p-6 text-center">
                <TrendingDown className="h-12 w-12 text-ispeed-red mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-ispeed-black mb-2">
                  Reducción de Riesgo
                </h3>
                <p className="text-gray-600">
                  Monitoreo continuo del comportamiento del conductor y registro de reacciones
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 hover:border-ispeed-red transition-colors">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-12 w-12 text-ispeed-red mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-ispeed-black mb-2">
                  Reportes Detallados
                </h3>
                <p className="text-gray-600">
                  Informes completos post-viaje para supervisores y conductores
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-ispeed-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ispeed-black mb-4">
              ¿Cómo Funciona iSpeed?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-ispeed-red text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-ispeed-black mb-3">
                Configuración Inicial
              </h3>
              <p className="text-gray-600">
                El supervisor registra la empresa, conductores y destinos habilitados
              </p>
            </div>

            <div className="text-center">
              <div className="bg-ispeed-red text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-ispeed-black mb-3">
                Monitoreo en Tiempo Real
              </h3>
              <p className="text-gray-600">
                Durante el viaje, iSpeed analiza velocidad, GPS y clima emitiendo alertas inteligentes
              </p>
            </div>

            <div className="text-center">
              <div className="bg-ispeed-red text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-ispeed-black mb-3">
                Reportes Automáticos
              </h3>
              <p className="text-gray-600">
                Al finalizar, se genera un reporte detallado del comportamiento del conductor
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ispeed-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Únete a la Revolución de la Seguridad Vial
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Protege a tus conductores y pasajeros con tecnología de inteligencia artificial
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/register')}
            className="bg-ispeed-red hover:bg-red-700 text-white px-8 py-3 text-lg"
          >
            Empezar Gratis
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/9baf5382-54f1-43c5-b500-c287567327f9.png" 
              alt="iSpeed Logo" 
              className="h-8 w-auto"
            />
          </div>
          <p className="text-gray-600">
            © 2024 iSpeed. Todos los derechos reservados. Seguridad vial inteligente para el Perú.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
