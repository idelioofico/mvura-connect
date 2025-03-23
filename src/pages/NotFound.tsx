
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 p-4">
      <div className="text-center max-w-md mx-auto animate-fade-in">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-mvura-200 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute inset-4 bg-mvura-400 rounded-full opacity-80 animate-pulse animation-delay-300"></div>
          <div className="absolute inset-8 bg-mvura-600 rounded-full animate-pulse animation-delay-600"></div>
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">
            404
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Página não encontrada</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="gap-2" asChild>
            <Link to={-1 as any}>
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <Button className="gap-2" asChild>
            <Link to="/">
              <Home className="h-4 w-4" />
              Página Inicial
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
