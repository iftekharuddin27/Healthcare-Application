import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input'; // Assuming you have an input for address
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { bookLabTest } from '@/lib/db'; // Import our DB function

const BookTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock test name based on ID (In real app, fetch this from DB)
  const testName = id === '1' ? "Complete Blood Count" : 
                   id === '2' ? "Diabetes Screening" : "Thyroid Profile";
  const price = 500; // Mock price

  const handleConfirm = async () => {
    // 1. Validation
    if (!user) {
      toast({ variant: "destructive", title: "Login Required", description: "Please login to book a test." });
      navigate('/auth');
      return;
    }
    if (!date) {
      toast({ variant: "destructive", title: "Date Required", description: "Please select a date." });
      return;
    }
    if (!address) {
      toast({ variant: "destructive", title: "Address Required", description: "Please enter your address." });
      return;
    }

    setLoading(true);

    // 2. Send to Firebase
    const result = await bookLabTest(user.uid, testName, date, address);

    setLoading(false);

    // 3. Handle Result
    if (result.success) {
      toast({
        title: "Booking Confirmed!",
        description: "Our sample collector will contact you soon.",
      });
      navigate('/');
    } else {
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Book Test" showBack />
      
      <main className="container py-6 space-y-6">
        {/* Test Details Card */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-2">{testName}</h2>
            <p className="text-primary font-bold text-lg">৳ {price}</p>
          </CardContent>
        </Card>

        {/* Date Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Date</label>
          <div className="border rounded-md p-4 bg-card">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border mx-auto"
              disabled={(date) => date < new Date()} // Disable past dates
            />
          </div>
        </div>

        {/* Address Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Collection Address</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Enter your full address" 
              className="pl-9"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        {/* Summary & Button */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between">
              <span>Test Fee</span>
              <span>৳ {price}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-4">
              <span>Total Payble</span>
              <span>৳ {price}</span>
            </div>
            
            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BookTest;