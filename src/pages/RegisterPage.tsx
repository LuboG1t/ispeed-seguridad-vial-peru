
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    ruc: "",
    address: "",
    phone: "",
    email: "",
    contactName: "",
    contactPhone: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      toast({
        title: "Registro exitoso",
        description: "Empresa registrada correctamente. Ahora puedes iniciar sesión.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al registrar la empresa",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ispeed-gray to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/9baf5382-54f1-43c5-b500-c287567327f9.png" 
            alt="iSpeed Logo" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-ispeed-black">
            Registrar Empresa
          </h1>
          <p className="text-gray-600 mt-2">
            Únete a iSpeed y mejora la seguridad de tu flota
          </p>
        </div>

        <Card className="border-2 border-gray-100">
          <CardHeader>
            <CardTitle className="text-center text-ispeed-black">Datos de la Empresa</CardTitle>
            <CardDescription className="text-center">
              Completa la información para registrar tu empresa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName" className="text-ispeed-black font-medium">
                    Nombre de la Empresa *
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Transportes ABC S.A.C."
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="ruc" className="text-ispeed-black font-medium">
                    RUC *
                  </Label>
                  <Input
                    id="ruc"
                    name="ruc"
                    value={formData.ruc}
                    onChange={handleChange}
                    placeholder="20123456789"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-ispeed-black font-medium">
                  Dirección *
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Av. Principal 123, Distrito, Provincia, Departamento"
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-ispeed-black font-medium">
                    Teléfono de la Empresa *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01-2345678"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-ispeed-black font-medium">
                    Correo Electrónico *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contacto@empresa.com"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-ispeed-black mb-4">
                  Datos del Responsable
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactName" className="text-ispeed-black font-medium">
                      Nombre del Responsable *
                    </Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="Juan Pérez"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactPhone" className="text-ispeed-black font-medium">
                      Teléfono del Responsable *
                    </Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      placeholder="987654321"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-ispeed-black mb-4">
                  Configurar Acceso
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password" className="text-ispeed-black font-medium">
                      Contraseña *
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-ispeed-black font-medium">
                      Confirmar Contraseña *
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-ispeed-red hover:bg-red-700 text-white"
                disabled={loading}
              >
                {loading ? "Registrando..." : "Registrar Empresa"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-ispeed-red hover:underline font-medium"
                >
                  Iniciar sesión
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
