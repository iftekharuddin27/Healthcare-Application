import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, LogOut, Settings, Bell, Heart, FileText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const menuItems = [
    { icon: Settings, label: 'Account Settings', action: () => {} },
    { icon: Bell, label: 'Notifications', action: () => {} },
    { icon: Heart, label: 'My Appointments', action: () => {} },
    { icon: FileText, label: 'My Orders', action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header title="Profile" showBack showCart />
      
      <main className="container py-6 space-y-6">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl text-primary-foreground">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl">{user?.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-2">
                  <Mail className="h-4 w-4" />
                  {user?.email}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Menu Items */}
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {menuItems.map((item, index) => (
              <div key={item.label}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={item.action}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Button>
                {index < menuItems.length - 1 && <Separator className="my-1" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          variant="destructive"
          className="w-full"
          size="lg"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          <p>HealthCare App v1.0</p>
          <p className="mt-1">© 2024 All rights reserved</p>
        </div>
      </main>
    </div>
  );
};

export default Profile;
