import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Mail, Phone, MapPin, Package, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="My Profile" showBack />

      <main className="container py-6 space-y-6">
        {/* User Info Card */}
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.photoURL || ""} />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {user.displayName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            
            <h2 className="text-2xl font-bold">{user.displayName || "User"}</h2>
            <p className="text-muted-foreground">{user.email}</p>

          </CardContent>
        </Card>

        {/* Personal Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold px-1">Personal Details</h3>
          <Card>
            <CardContent className="p-0">
              <div className="flex items-center p-4 border-b">
                <User className="h-5 w-5 text-muted-foreground mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{user.displayName || "Not set"}</p>
                </div>
              </div>
              <div className="flex items-center p-4">
                <Mail className="h-5 w-5 text-muted-foreground mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Links */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="hover:bg-accent/5 transition-colors cursor-pointer">
            <CardContent className="pt-6 flex flex-col items-center">
              <Package className="h-8 w-8 text-primary mb-2" />
              <span className="font-medium">My Orders</span>
            </CardContent>
          </Card>
          <Card className="hover:bg-accent/5 transition-colors cursor-pointer">
            <CardContent className="pt-6 flex flex-col items-center">
              <Calendar className="h-8 w-8 text-primary mb-2" />
              <span className="font-medium">Appointments</span>
            </CardContent>
          </Card>
        </div>
        
            <Button 
              variant="outline" 
              className="mt-6 w-full text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
      </main>
    </div>
  );
};

export default Profile;