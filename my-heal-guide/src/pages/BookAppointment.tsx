import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');

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
      title: "Appointment Booked!",
      description: `Your appointment is confirmed for ${date.toDateString()} at ${selectedTime}`,
    });
    
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Book Appointment" showBack />
      
      <main className="container py-6 space-y-6">
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
          Confirm Appointment
        </Button>
      </main>
    </div>
  );
};

export default BookAppointment;
