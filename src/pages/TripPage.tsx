
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Mic, Square } from "lucide-react";

const TripPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tripStarted, setTripStarted] = useState(false);
  const [destination, setDestination] = useState("");
  const [currentTime] = useState(new Date().toLocaleString('es-PE'));
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [tripData, setTripData] = useState({
    alerts: 0,
    responses: 0,
    duration: 0
  });

  const destinations = [
    "Lima - Arequipa",
    "Lima - Cusco", 
    "Lima - Trujillo",
    "Lima - Piura",
    "Lima - Huancayo",
    "Arequipa - Cusco",
    "Cusco - Puno"
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (tripStarted) {
      interval = setInterval(() => {
        setTripData(prev => ({
          ...prev,
          duration: prev.duration + 1
        }));

        // Simular alertas aleatorias
        if (Math.random() < 0.05) { // 5% de probabilidad cada segundo
          setIsAlertActive(true);
          setTripData(prev => ({
            ...prev,
            alerts: prev.alerts + 1
          }));
          
          setTimeout(() => {
            setIsAlertActive(false);
            setTripData(prev => ({
              ...prev,
              responses: prev.responses + 1
            }));
          }, 2000);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [tripStarted]);

  if (!user || user.role !== 'driver') {
    navigate('/login');
    return null;
  }

  const startTrip = () => {
    if (!destination) return;
    setTripStarted(true);
  };

  const endTrip = () => {
    setTripStarted(false);
    // Simular finalización de viaje y mostrar reporte
    navigate('/driver-dashboard');
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!tripStarted) {
    return (
      <div className="min-h-screen bg-ispeed-gray flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 border-gray-100">
          <CardHeader className="text-center">
            <img 
              src="/lovable-uploads/9baf5382-54f1-43c5-b500-c287567327f9.png" 
              alt="iSpeed Logo" 
              className="h-12 w-auto mx-auto mb-4"
            />
            <CardTitle className="text-2xl text-ispeed-black">Iniciar Nuevo Viaje</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="destination" className="text-ispeed-black font-medium">
                Destino
              </Label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecciona tu destino" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem key={dest} value={dest}>
                      {dest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="datetime" className="text-ispeed-black font-medium">
                Fecha y Hora
              </Label>
              <Input
                id="datetime"
                value={currentTime}
                readOnly
                className="mt-1 bg-gray-50"
              />
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="outline"
                onClick={() => navigate('/driver-dashboard')}
                className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Cancelar
              </Button>
              <Button 
                onClick={startTrip}
                disabled={!destination}
                className="flex-1 bg-ispeed-red hover:bg-red-700 text-white"
              >
                Comenzar Viaje
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ispeed-black to-gray-800 text-white">
      {/* Header */}
      <header className="bg-ispeed-black/90 backdrop-blur-sm border-b border-ispeed-red p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Viaje en Curso</h1>
            <p className="text-gray-300">{destination}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono">{formatTime(tripData.duration)}</div>
            <p className="text-sm text-gray-300">Duración</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-8">
          {/* Voice Animation */}
          <div className="relative">
            <div 
              className={`w-32 h-32 mx-auto rounded-full border-4 border-ispeed-red flex items-center justify-center transition-all duration-300 ${
                isAlertActive ? 'animate-voice-pulse bg-ispeed-red/20 scale-110' : 'bg-ispeed-red/10'
              }`}
            >
              <Mic className="w-16 h-16 text-ispeed-red" />
            </div>
            
            {isAlertActive && (
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-ispeed-red text-white px-4 py-2 rounded-lg text-sm font-medium animate-pulse">
                  ¡Reduce la velocidad!
                </div>
              </div>
            )}
          </div>

          {/* Status */}
          <div>
            <h2 className="text-3xl font-bold mb-2">Copiloto Virtual Activo</h2>
            <p className="text-gray-300 text-lg">
              Monitoreando tu conducción en tiempo real
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-ispeed-red">{tripData.alerts}</div>
              <div className="text-sm text-gray-300">Alertas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{tripData.responses}</div>
              <div className="text-sm text-gray-300">Respuestas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {tripData.alerts > 0 ? Math.round((tripData.responses / tripData.alerts) * 100) : 100}%
              </div>
              <div className="text-sm text-gray-300">Efectividad</div>
            </div>
          </div>

          {/* End Trip Button */}
          <Button 
            onClick={endTrip}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4"
          >
            <Square className="w-5 h-5 mr-2" />
            Finalizar Viaje
          </Button>
        </div>
      </div>

      {/* Road Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gray-700 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-1 bg-white animate-road-move opacity-60"></div>
        </div>
      </div>
    </div>
  );
};

export default TripPage;
