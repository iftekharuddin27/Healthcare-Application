import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Star, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const doctors = [
  {
    id: '1',
    name: 'Dr. Habibur Rahman',
    specialty: 'Gastroenterology',
    experience: '15 years',
    rating: 4.8,
    location: 'City Hospital',
    availability: 'Available Today',
    image: '👨‍⚕️',
  },
  {
    id: '2',
    name: 'Dr. Md Mazharul Huq Tanim',
    specialty: 'Endocrinologist',
    experience: '10 years',
    rating: 4.9,
    location: 'Children\'s Clinic',
    availability: 'Available Tomorrow',
    image: '👩‍⚕️',
  },
  {
    id: '3',
    name: 'Dr. Fazle Mahmud',
    specialty: 'Neurosurgeon',
    experience: '12 years',
    rating: 4.7,
    location: 'Skin Care Center',
    availability: 'Available Today',
    image: '👨‍⚕️',
  },
  {
    id: '4',
    name: 'Dr. Sudipta Kumer Mukherjee',
    specialty: 'Pediatric Neurosurgeon',
    experience: '18 years',
    rating: 4.9,
    location: 'Bone & Joint Hospital',
    availability: 'Available in 3 days',
    image: '👩‍⚕️',
  },
    {
    id: '5',
    name: 'Prof. Dr. Md. Abdul Wahab Khan',
    specialty: 'General Surgeon',
    experience: '30 years',
    rating: 4.7,
    location: 'Parkview Hospital',
    availability: 'Available Today',
    image: '👨‍⚕️',
  },
    {
    id: '6',
    name: 'Dr. Raisul Islam',
    specialty: 'General Surgeon',
    experience: '15 years',
    rating: 4.6,
    location: 'eCare Hospital',
    availability: 'Available in 2 days',
    image: '👨‍⚕️',
  },
    {
    id: '7',
    name: 'Dr. Khadija Rahman Sonia',
    specialty: 'General Surgeon',
    experience: '35 years',
    rating: 4.4,
    location: 'City Hospital',
    availability: 'Available tommorrow',
    image: '👩‍⚕️',
  },
    {
    id: '8',
    name: 'Asst. Prof. Dr. Md. Abdul Munim Sarkar',
    specialty: 'Cardiologist',
    experience: '25 years',
    rating: 4.5,
    location: 'Alif Hospital',
    availability: 'Available in 4 days',
    image: '👨‍⚕️',
  },
    {
    id: '9',
    name: 'Dr. Sohel Mahmud',
    specialty: 'Medicine Specialist',
    experience: '23 years',
    rating: 4.6,
    location: 'City Hospital',
    availability: 'Available Tommorrow',
    image: '👨‍⚕️',
  },
    {
    id: '10',
    name: 'Dr. S. Mokaddas Hossain Sadi',
    specialty: 'Cardiologist',
    experience: '32 years',
    rating: 4.8,
    location: 'Cardiac Hospital',
    availability: 'Available Today',
    image: '👨‍⚕️',
  },
];

const Doctors = () => {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  const specialties = ['All', 'Cardiologist', 'Medicine Specialist', 'General Surgeon', 'Gastroenterology', 'Endocrinologist', 'Neurosurgeon', 'Pediatric Neurosurgeon'];
  
  const filteredDoctors = selectedSpecialty && selectedSpecialty !== 'All'
    ? doctors.filter(d => d.specialty === selectedSpecialty)
    : doctors;

  return (
    <div className="min-h-screen bg-background">
      <Header title="Find Doctors" showBack showCart />
      
      <main className="container py-6 space-y-6">
        {/* Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {specialties.map(specialty => (
            <Badge
              key={specialty}
              variant={selectedSpecialty === specialty ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setSelectedSpecialty(specialty)}
            >
              {specialty}
            </Badge>
          ))}
        </div>

        {/* Doctors List */}
        <div className="grid gap-4">
          {filteredDoctors.map(doctor => (
            <Card key={doctor.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{doctor.image}</div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <CardDescription className="mt-1">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-primary">{doctor.specialty}</span>
                        <span className="text-xs">{doctor.experience} experience</span>
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{doctor.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {doctor.location}
                </div>
                <div className="flex items-center flex-wrap gap-3">
                  <Badge className='mr-2 font-medium text-xs' variant="secondary">{doctor.availability}</Badge>
                  <Button
                    onClick={() => navigate(`/book-appointment/${doctor.id}`)}
                    size="sm"
                  >
                    <Calendar className="h-2 w-2 " />
                    Book Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Doctors;
