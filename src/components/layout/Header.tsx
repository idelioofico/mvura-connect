
import { useState, useEffect } from 'react';
import { Bell, Search, Mail, Moon, Sun, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type HeaderProps = {
  title: string;
  description?: string;
};

const Header = ({ title, description }: HeaderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const notifications = [
    {
      id: 1,
      title: 'Novo chamado criado',
      description: 'Cliente João Silva criou um novo chamado',
      time: '5 min atrás',
      unread: true,
    },
    {
      id: 2,
      title: 'Chamado atualizado',
      description: 'Carlos atualizou o status do chamado #1234',
      time: '1 hora atrás',
      unread: true,
    },
    {
      id: 3,
      title: 'Novo cliente registrado',
      description: 'Empresa ABC Ltda. foi registrada no sistema',
      time: 'Ontem',
      unread: false,
    },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 w-full items-center justify-between px-4 transition-all duration-300",
        isScrolled ? "glass shadow-sm" : "bg-transparent"
      )}
    >
      <div className="flex items-center gap-4">
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
        )}
        
        <div>
          <h1 className="text-xl font-semibold animate-fade-in">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground animate-fade-in animate-delay-100">{description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative md:w-64 hidden md:block animate-fade-in">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pesquisar..."
            className="w-full bg-background pl-8 rounded-full border-muted"
          />
        </div>

        <Button variant="ghost" size="icon" className="relative animate-fade-in animate-delay-200">
          <Mail className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          <span className="sr-only">Messages</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative animate-fade-in animate-delay-300">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notificações</span>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-xs font-normal text-mvura-500">
                Marcar todas como lidas
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer">
                <div className="flex items-start justify-between w-full">
                  <div className="font-medium text-sm flex items-center gap-2">
                    {notification.title}
                    {notification.unread && (
                      <span className="w-2 h-2 rounded-full bg-mvura-500" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="h-auto p-2 justify-center text-center cursor-pointer">
              <span className="text-xs text-mvura-600 font-medium">Ver todas as notificações</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="animate-fade-in animate-delay-400"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Avatar className="h-8 w-8 transition-all border-2 border-transparent hover:border-mvura-300 animate-fade-in animate-delay-500">
          <AvatarImage src="/placeholder.svg" alt="Admin" />
          <AvatarFallback className="bg-mvura-200 text-mvura-700">AD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
