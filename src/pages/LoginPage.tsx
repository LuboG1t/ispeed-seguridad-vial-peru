
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"supervisor" | "driver">("supervisor");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password, role);
      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido como ${role === 'supervisor' ? 'supervisor' : 'conductor'}`,
      });
      
      if (role === "supervisor") {
        navigate("/supervisor-dashboard");
      } else {
        navigate("/driver-dashboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Credenciales incorrectas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ispeed-gray to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/9baf5382-54f1-43c5-b500-c287567327f9.png" 
            alt="iSpeed Logo" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-ispeed-black">
            Iniciar Sesión
          </h1>
          <p className="text-gray-600 mt-2">
            Accede a tu cuenta de iSpeed
          </p>
        </div>

        <Card className="border-2 border-gray-100">
          <CardHeader>
            <CardTitle className="text-center text-ispeed-black">Bienvenido</CardTitle>
            <CardDescription className="text-center">
              Selecciona tu tipo de usuario
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label className="text-ispeed-black font-medium">Tipo de Usuario</Label>
                <RadioGroup value={role} onValueChange={(value) => setRole(value as "supervisor" | "driver")} className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="supervisor" id="supervisor" />
                    <Label htmlFor="supervisor">Supervisor de Empresa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="driver" id="driver" />
                    <Label htmlFor="driver">Conductor</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="email" className="text-ispeed-black font-medium">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-ispeed-black font-medium">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-1"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-ispeed-red hover:bg-red-700 text-white"
                disabled={loading}
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ¿No tienes cuenta?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-ispeed-red hover:underline font-medium"
                >
                  Registra tu empresa
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
