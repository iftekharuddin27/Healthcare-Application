import { Moon, Sun, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showCart?: boolean;
}

export const Header = ({ title, showBack = false, showCart = false }: HeaderProps) => {
  const { isDark, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b shadow-sm">
      {/* This div creates the space for the Status Bar/Notch */}
      <div style={{ height: 'env(safe-area-inset-top)' }} className="w-full bg-card/95" />
      
      {/* Actual Header Content */}
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-xl font-bold text-foreground truncate">{title}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          {showCart && location.pathname !== '/cart' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/cart')}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};