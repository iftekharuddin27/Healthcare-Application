import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Stethoscope, Pill, FileText, TestTube, User, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: Stethoscope,
      title: 'Doctors',
      description: 'Find and book appointments with specialists',
      path: '/doctors',
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Pill,
      title: 'Medicines',
      description: 'Order medicines online with doorstep delivery',
      path: '/medicines',
      color: 'bg-secondary/10 text-secondary',
    },
    {
      icon: FileText,
      title: 'Articles',
      description: 'Read health tips and medical articles',
      path: '/articles',
      color: 'bg-accent/50 text-accent-foreground',
    },
    {
      icon: TestTube,
      title: 'Lab Tests',
      description: 'Book diagnostic tests and view reports',
      path: '/tests',
      color: 'bg-primary/10 text-primary',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header title="Medico" showCart />
      
      <main className="container py-6 space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-primary-foreground">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="h-6 w-6" />
            <h2 className="text-xl font-bold">Welcome, {user?.name}!</h2>
          </div>
          <p className="text-primary-foreground/90 text-sm">
            Your health journey starts here. Explore our services below.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => (
            <Card
              key={feature.path}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(feature.path)}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Profile Card */}
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/profile')}
        >
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <User className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>View your profile and settings</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </main>
    </div>
  );
};

export default Home;
