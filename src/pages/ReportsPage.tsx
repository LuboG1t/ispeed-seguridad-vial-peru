
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Search, Filter, Download, ArrowLeft } from "lucide-react";

const ReportsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    driver: "",
    destination: "",
    status: ""
  });

  // Datos simulados de reportes
  const reports = [
    {
      id: 1,
      driver: "Juan Pérez",
      destination: "Lima - Arequipa",
      date: "2024-01-15",
      duration: "8h 30m",
      alerts: 12,
      responses: 11,
      score: 85,
      status: "Completado"
    },
    {
      id: 2,
      driver: "María García",
      destination: "Lima - Cusco",
      date: "2024-01-14",
      duration: "10h 15m",
      alerts: 8,
      responses: 8,
      score: 92,
      status: "Completado"
    },
    {
      id: 3,
      driver: "Carlos López",
      destination: "Lima - Trujillo",
      date: "2024-01-14",
      duration: "6h 45m",
      alerts: 15,
      responses: 12,
      score: 78,
      status: "Completado"
    },
    {
      id: 4,
      driver: "Ana Rodríguez",
      destination: "Arequipa - Cusco",
      date: "2024-01-13",
      duration: "7h 20m",
      alerts: 5,
      responses: 5,
      score: 95,
      status: "Completado"
    }
  ];

  const drivers = ["Juan Pérez", "María García", "Carlos López", "Ana Rodríguez"];
  const destinations = ["Lima - Arequipa", "Lima - Cusco", "Lima - Trujillo", "Arequipa - Cusco"];

  if (!user) {
    navigate('/login');
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return "border-green-500 text-green-700";
    if (score >= 70) return "border-yellow-500 text-yellow-700";
    return "border-red-500 text-red-700";
  };

  const getResponseRate = (alerts: number, responses: number) => {
    return Math.round((responses / alerts) * 100);
  };

  return (
    <div className="min-h-screen bg-ispeed-gray">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-ispeed-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost"
                onClick={() => navigate(user.role === 'supervisor' ? '/supervisor-dashboard' : '/driver-dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <img 
                src="/lovable-uploads/9baf5382-54f1-43c5-b500-c287567327f9.png" 
                alt="iSpeed Logo" 
                className="h-10 w-auto mr-4"
              />
              <div>
                <h1 className="text-xl font-semibold text-ispeed-black">Reportes de Viajes</h1>
                <p className="text-sm text-gray-600">Análisis detallado de viajes</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-ispeed-black">
              <Filter className="w-5 h-5 mr-2" />
              Filtros de Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="dateFrom">Fecha Desde</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="dateTo">Fecha Hasta</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                  className="mt-1"
                />
              </div>

              {user.role === 'supervisor' && (
                <div>
                  <Label htmlFor="driver">Conductor</Label>
                  <Select value={filters.driver} onValueChange={(value) => setFilters(prev => ({ ...prev, driver: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {drivers.map((driver) => (
                        <SelectItem key={driver} value={driver}>
                          {driver}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="destination">Destino</Label>
                <Select value={filters.destination} onValueChange={(value) => setFilters(prev => ({ ...prev, destination: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {destinations.map((destination) => (
                      <SelectItem key={destination} value={destination}>
                        {destination}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button className="w-full bg-ispeed-red hover:bg-red-700 text-white">
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-ispeed-black">Resultados</h2>
            <p className="text-gray-600">{reports.length} reportes encontrados</p>
          </div>
          <Button variant="outline" className="border-ispeed-red text-ispeed-red hover:bg-ispeed-red hover:text-white">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>

        {/* Reports Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-semibold text-ispeed-black">Fecha</th>
                    {user.role === 'supervisor' && (
                      <th className="text-left p-4 font-semibold text-ispeed-black">Conductor</th>
                    )}
                    <th className="text-left p-4 font-semibold text-ispeed-black">Destino</th>
                    <th className="text-left p-4 font-semibold text-ispeed-black">Duración</th>
                    <th className="text-left p-4 font-semibold text-ispeed-black">Alertas</th>
                    <th className="text-left p-4 font-semibold text-ispeed-black">Respuesta</th>
                    <th className="text-left p-4 font-semibold text-ispeed-black">Puntuación</th>
                    <th className="text-left p-4 font-semibold text-ispeed-black">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 text-gray-900">{report.date}</td>
                      {user.role === 'supervisor' && (
                        <td className="p-4 text-gray-900">{report.driver}</td>
                      )}
                      <td className="p-4 text-gray-900">{report.destination}</td>
                      <td className="p-4 text-gray-900">{report.duration}</td>
                      <td className="p-4 text-gray-900">{report.alerts}</td>
                      <td className="p-4">
                        <span className="text-gray-900">{report.responses}/{report.alerts}</span>
                        <span className="text-sm text-gray-500 ml-1">
                          ({getResponseRate(report.alerts, report.responses)}%)
                        </span>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className={getScoreColor(report.score)}>
                          {report.score} pts
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-ispeed-red text-ispeed-red hover:bg-ispeed-red hover:text-white"
                        >
                          Ver Detalle
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
