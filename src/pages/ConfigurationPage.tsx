import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Plus, Trash2, Mail, MapPin, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ConfigurationPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState(1);
  
  // Datos de la empresa
  const [companyData, setCompanyData] = useState({
    name: "Transportes ABC S.A.C.",
    ruc: "20123456789",
    address: "Av. Principal 123, Lima",
    phone: "01-2345678"
  });

  // Lista de conductores
  const [drivers, setDrivers] = useState([
    { id: 1, name: "Juan Pérez", email: "juan@empresa.com", phone: "987654321", status: "Invitado" },
    { id: 2, name: "María García", email: "maria@empresa.com", phone: "987654322", status: "Activo" }
  ]);

  // Lista de ciudades/sucursales
  const [cities, setCities] = useState([
    { id: 1, name: "Lima", address: "Terminal Terrestre Lima, Av. Javier Prado Este 1056" },
    { id: 2, name: "Arequipa", address: "Terminal Terrestre Arequipa, Av. Andrés Avelino Cáceres" }
  ]);

  // Formularios para nuevos registros
  const [newDriver, setNewDriver] = useState({ name: "", email: "", phone: "" });
  const [newCity, setNewCity] = useState({ name: "", address: "" });

  if (!user || user.role !== 'supervisor') {
    navigate('/login');
    return null;
  }

  const addDriver = () => {
    if (!newDriver.name || !newDriver.email || !newDriver.phone) {
      toast({
        title: "Error",
        description: "Completa todos los campos del conductor",
        variant: "destructive",
      });
      return;
    }

    const driver = {
      id: drivers.length + 1,
      ...newDriver,
      status: "Pendiente"
    };

    setDrivers([...drivers, driver]);
    setNewDriver({ name: "", email: "", phone: "" });
    
    toast({
      title: "Conductor agregado",
      description: `Se enviará una invitación a ${newDriver.email}`,
    });
  };

  const removeDriver = (id: number) => {
    setDrivers(drivers.filter(driver => driver.id !== id));
    toast({
      title: "Conductor eliminado",
      description: "El conductor ha sido removido de la lista",
    });
  };

  const addCity = () => {
    if (!newCity.name || !newCity.address) {
      toast({
        title: "Error",
        description: "Completa todos los campos de la ciudad",
        variant: "destructive",
      });
      return;
    }

    const city = {
      id: cities.length + 1,
      ...newCity
    };

    setCities([...cities, city]);
    setNewCity({ name: "", address: "" });
    
    toast({
      title: "Ciudad agregada",
      description: "La ciudad ha sido agregada correctamente",
    });
  };

  const removeCity = (id: number) => {
    setCities(cities.filter(city => city.id !== id));
    toast({
      title: "Ciudad eliminada",
      description: "La ciudad ha sido removida de la lista",
    });
  };

  const finishConfiguration = () => {
    toast({
      title: "Configuración completada",
      description: "Tu empresa está lista para usar iSpeed",
    });
    navigate('/supervisor-dashboard');
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
                onClick={() => navigate('/supervisor-dashboard')}
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
                <h1 className="text-xl font-semibold text-ispeed-black">Configuración</h1>
                <p className="text-sm text-gray-600">Configurar datos de la empresa</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: "Datos Empresa", icon: Users },
              { step: 2, title: "Conductores", icon: Users },
              { step: 3, title: "Ciudades", icon: MapPin }
            ].map(({ step, title, icon: Icon }) => (
              <div 
                key={step}
                className={`flex items-center space-x-2 cursor-pointer ${
                  activeStep === step ? "text-ispeed-red" : "text-gray-400"
                }`}
                onClick={() => setActiveStep(step)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeStep === step ? "bg-ispeed-red text-white" : "bg-gray-200"
                }`}>
                  {step}
                </div>
                <Icon className="w-5 h-5" />
                <span className="font-medium">{title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Company Data */}
        {activeStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-ispeed-black">Datos de la Empresa</CardTitle>
              <CardDescription>
                Información básica de tu empresa de transportes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Nombre de la Empresa</Label>
                  <Input
                    id="companyName"
                    value={companyData.name}
                    onChange={(e) => setCompanyData(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="ruc">RUC</Label>
                  <Input
                    id="ruc"
                    value={companyData.ruc}
                    onChange={(e) => setCompanyData(prev => ({ ...prev, ruc: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Dirección</Label>
                <Textarea
                  id="address"
                  value={companyData.address}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, address: e.target.value }))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={companyData.phone}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-1"
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => setActiveStep(2)}
                  className="bg-ispeed-red hover:bg-red-700 text-white"
                >
                  Siguiente
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Drivers */}
        {activeStep === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-ispeed-black">Agregar Conductor</CardTitle>
                <CardDescription>
                  Agrega los conductores que tendrán acceso al sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label htmlFor="driverName">Nombre Completo</Label>
                    <Input
                      id="driverName"
                      value={newDriver.name}
                      onChange={(e) => setNewDriver(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Juan Pérez"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="driverEmail">Correo Electrónico</Label>
                    <Input
                      id="driverEmail"
                      type="email"
                      value={newDriver.email}
                      onChange={(e) => setNewDriver(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="juan@correo.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="driverPhone">Teléfono</Label>
                    <Input
                      id="driverPhone"
                      value={newDriver.phone}
                      onChange={(e) => setNewDriver(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="987654321"
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={addDriver}
                  className="bg-ispeed-red hover:bg-red-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Conductor
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-ispeed-black">Conductores Registrados</CardTitle>
                <CardDescription>
                  Lista de conductores con acceso al sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {drivers.map((driver) => (
                    <div key={driver.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold text-ispeed-black">{driver.name}</h3>
                        <p className="text-sm text-gray-600">{driver.email} • {driver.phone}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={driver.status === "Activo" ? "default" : "secondary"}
                          className={driver.status === "Activo" ? "bg-green-500" : ""}
                        >
                          {driver.status}
                        </Badge>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => removeDriver(driver.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-6">
                  <Button 
                    variant="outline"
                    onClick={() => setActiveStep(1)}
                    className="border-gray-300 text-gray-600"
                  >
                    Anterior
                  </Button>
                  <Button 
                    onClick={() => setActiveStep(3)}
                    className="bg-ispeed-red hover:bg-red-700 text-white"
                  >
                    Siguiente
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Cities */}
        {activeStep === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-ispeed-black">Agregar Ciudad</CardTitle>
                <CardDescription>
                  Configura las ciudades donde tu empresa tiene sucursales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="cityName">Ciudad</Label>
                    <Input
                      id="cityName"
                      value={newCity.name}
                      onChange={(e) => setNewCity(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Lima"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cityAddress">Dirección de Sucursal</Label>
                    <Input
                      id="cityAddress"
                      value={newCity.address}
                      onChange={(e) => setNewCity(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Terminal Terrestre, Av. Principal 123"
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={addCity}
                  className="bg-ispeed-red hover:bg-red-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Ciudad
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-ispeed-black">Ciudades Configuradas</CardTitle>
                <CardDescription>
                  Ciudades donde tu empresa tiene sucursales habilitadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cities.map((city) => (
                    <div key={city.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold text-ispeed-black">{city.name}</h3>
                        <p className="text-sm text-gray-600">{city.address}</p>
                      </div>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => removeCity(city.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-6">
                  <Button 
                    variant="outline"
                    onClick={() => setActiveStep(2)}
                    className="border-gray-300 text-gray-600"
                  >
                    Anterior
                  </Button>
                  <Button 
                    onClick={finishConfiguration}
                    className="bg-ispeed-red hover:bg-red-700 text-white"
                  >
                    Finalizar Configuración
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigurationPage;
