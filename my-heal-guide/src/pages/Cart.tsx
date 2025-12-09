import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from "@/contexts/AuthContext";
import { placeMedicineOrder } from "@/lib/db"; // Import the DB function

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleCheckout = async () => {
    // 1. Check Authentication
    if (!user) {
      toast({
        variant: "destructive",
        title: "Login Required",
        description: "Please log in to place an order.",
      });
      navigate("/auth");
      return;
    }

    // 2. Prepare Order Data
    // Note: In a real app, you would add an input field for the address. 
    // For now, we are sending a placeholder or you could prompt the user.
    const deliveryAddress = "Dhaka, Bangladesh"; 

    try {
      // 3. Send to Firebase
      const result = await placeMedicineOrder(
        user.uid,
        cart,
        totalPrice,
        deliveryAddress
      );

      if (result.success) {
        // 4. Handle Success
        clearCart(); // Empty the cart locally
        toast({
          title: "Order Placed Successfully!",
          description: `Order ID: ${result.id}`,
        });
        navigate("/"); // Redirect to Home or Profile
      } else {
        throw new Error("Order creation failed");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Order Failed",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  // --- UI REMAINS THE SAME BELOW ---

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Shopping Cart" showBack />
        <div className="container py-20 text-center">
          <ShoppingBag className="h-20 w-20 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some medicines to get started</p>
          <Button onClick={() => navigate('/medicines')}>
            Browse Medicines
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Shopping Cart" showBack />
      
      <main className="container py-6 space-y-6">
        <div className="space-y-4">
          {cart.map(item => (
            <Card key={item.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{item.image}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-2xl font-bold text-primary mt-2">₹{item.price}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-3 mt-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium w-12 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="ml-auto text-lg font-bold">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-lg">
              <span>Subtotal:</span>
              <span className="font-semibold">₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Delivery:</span>
              <span className="font-semibold text-secondary">FREE</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-primary">₹{totalPrice}</span>
              </div>
            </div>
            <Button onClick={handleCheckout} className="w-full" size="lg">
              Place Order
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Cart;