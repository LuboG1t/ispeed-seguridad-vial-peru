
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg border-b-2 border-ispeed-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/lovable-uploads/9baf5382-54f1-43c5-b500-c287567327f9.png" 
              alt="iSpeed Logo" 
              className="h-10 w-auto"
            />
          </div>
          
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="border-ispeed-red text-ispeed-red hover:bg-ispeed-red hover:text-white"
            >
              Iniciar Sesión
            </Button>
            <Button 
              onClick={() => navigate('/register')}
              className="bg-ispeed-red hover:bg-red-700 text-white"
            >
              Registrarse
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
