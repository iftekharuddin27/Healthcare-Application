import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const timeSlots = [
  '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM',
  '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM'
];

const BookTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [location, setLocation] = useState<string>('home');

  const handleBooking = () => {
    if (!date || !selectedTime) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please select both date and time",
      });
      return;
    }

    toast({
      title: "Test Booked!",
      description: `Your test is scheduled for ${date.toDateString()} at ${selectedTime}${location === 'home' ? ' (Home Collection)' : ' (Lab Visit)'}`,
    });
    
    navigate('/tests');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Book Test" showBack />
      
      <main className="container py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Collection Type</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={location} onValueChange={setLocation}>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="home" id="home" />
                <Label htmlFor="home" className="flex-1 cursor-pointer">
                  <div className="font-medium">Home Collection</div>
                  <div className="text-sm text-muted-foreground">Sample collected from your home</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="lab" id="lab" />
                <Label htmlFor="lab" className="flex-1 cursor-pointer">
                  <div className="font-medium">Lab Visit</div>
                  <div className="text-sm text-muted-foreground">Visit our lab for collection</div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Select Time Slot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {timeSlots.map(time => (
                <Badge
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className="cursor-pointer justify-center py-3 text-sm"
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleBooking} className="w-full" size="lg">
          Confirm Booking
        </Button>
      </main>
    </div>
  );
};

export default BookTest;
