
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart3, Users, MapPin, AlertTriangle, TrendingUp, Settings } from "lucide-react";

const SupervisorDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isConfigured, setIsConfigured] = useState(true); // Simular empresa ya configurada

  // Datos simulados
  const dashboardData = {
    totalDrivers: 24,
    activeTrips: 8,
    totalDestinations: 12,
    weeklyTrips: 156,
    averageScore: 87,
    alertsThisWeek: 43,
    responseRate: 94
  };

  const recentTrips = [
    { id: 1, driver: "Juan Pérez", destination: "Lima - Arequipa", status: "En curso", score: null },
    { id: 2, driver: "María García", destination: "Lima - Cusco", status: "Completado", score: 92 },
    { id: 3, driver: "Carlos López", destination: "Lima - Trujillo", status: "Completado", score: 78 },
    { id: 4, driver: "Ana Rodríguez", destination: "Arequipa - Cusco", status: "Completado", score: 95 }
  ];

  if (!user || user.role !== 'supervisor') {
    navigate('/login');
    return null;
  }

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-ispeed-gray flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 border-ispeed-red">
          <CardHeader className="text-center">
            <img 
              src="/lovable-uploads/9baf5382-54f1-43c5-b500-c287567327f9.png" 
              alt="iSpeed Logo" 
              className="h-12 w-auto mx-auto mb-4"
            />
            <CardTitle className="text-2xl text-ispeed-black">Configuración Inicial</CardTitle>
            <CardDescription>
              Tu empresa necesita configuración inicial para comenzar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/configuration')}
              className="w-full bg-ispeed-red hover:bg-red-700 text-white"
            >
              Comenzar Configuración
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ispeed-gray">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-ispeed-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/9baf5382-54f1-43c5-b500-c287567327f9.png" 
                alt="iSpeed Logo" 
                className="h-10 w-auto mr-4"
              />
              <div>
                <h1 className="text-xl font-semibold text-ispeed-black">Panel de Supervisor</h1>
                <p className="text-sm text-gray-600">Bienvenido, {user.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => navigate('/reports')}
                className="border-ispeed-red text-ispeed-red hover:bg-ispeed-red hover:text-white"
              >
                Ver Reportes
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/configuration')}
                className="border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </Button>
              <Button 
                variant="outline"
                onClick={logout}
                className="text-gray-600 hover:text-ispeed-red"
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-ispeed-red">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Conductores Activos</CardTitle>
              <Users className="h-4 w-4 text-ispeed-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ispeed-black">{dashboardData.totalDrivers}</div>
              <p className="text-xs text-gray-600">{dashboardData.activeTrips} en viaje</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Viajes Esta Semana</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ispeed-black">{dashboardData.weeklyTrips}</div>
              <p className="text-xs text-green-600">+12% vs semana anterior</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Puntuación Promedio</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ispeed-black">{dashboardData.averageScore}</div>
              <Progress value={dashboardData.averageScore} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Alertas Esta Semana</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ispeed-black">{dashboardData.alertsThisWeek}</div>
              <p className="text-xs text-gray-600">{dashboardData.responseRate}% atendidas</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-ispeed-red hover:bg-ispeed-red hover:text-white transition-colors cursor-pointer">
            <CardHeader className="text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2" />
              <CardTitle>Gestionar Destinos</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm opacity-80">{dashboardData.totalDestinations} destinos configurados</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer">
            <CardHeader className="text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <CardTitle>Gestionar Conductores</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm opacity-80">{dashboardData.totalDrivers} conductores registrados</p>
            </CardContent>
          </Card>

          <Card 
            className="border-2 border-green-500 hover:bg-green-500 hover:text-white transition-colors cursor-pointer"
            onClick={() => navigate('/reports')}
          >
            <CardHeader className="text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-2" />
              <CardTitle>Ver Reportes</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm opacity-80">Análisis detallado de viajes</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Trips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-ispeed-black">Viajes Recientes</CardTitle>
            <CardDescription>
              Últimos viajes realizados por tu flota
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTrips.map((trip) => (
                <div key={trip.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold text-ispeed-black">{trip.driver}</h3>
                    <p className="text-sm text-gray-600">{trip.destination}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {trip.score && (
                      <Badge 
                        variant="outline"
                        className={trip.score >= 85 ? "border-green-500 text-green-700" : 
                                  trip.score >= 70 ? "border-yellow-500 text-yellow-700" : 
                                  "border-red-500 text-red-700"}
                      >
                        {trip.score} pts
                      </Badge>
                    )}
                    <Badge 
                      variant={trip.status === "En curso" ? "default" : "secondary"}
                      className={trip.status === "En curso" ? "bg-ispeed-red" : ""}
                    >
                      {trip.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button 
                variant="outline"
                onClick={() => navigate('/reports')}
                className="border-ispeed-red text-ispeed-red hover:bg-ispeed-red hover:text-white"
              >
                Ver Todos los Reportes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
