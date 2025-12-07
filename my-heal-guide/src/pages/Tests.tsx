import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TestTube, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const testPackages = [
  {
    id: 't1',
    name: 'Complete Blood Count',
    description: 'Comprehensive blood analysis',
    price: 500,
    tests: ['Hemoglobin', 'WBC Count', 'Platelet Count', 'RBC Count'],
    icon: '🩸',
  },
  {
    id: 't2',
    name: 'Diabetes Screening',
    description: 'Blood sugar and HbA1c',
    price: 800,
    tests: ['Fasting Sugar', 'PP Sugar', 'HbA1c'],
    icon: '💉',
  },
  {
    id: 't3',
    name: 'Thyroid Profile',
    description: 'Complete thyroid function test',
    price: 1200,
    tests: ['T3', 'T4', 'TSH'],
    icon: '🔬',
  },
  {
    id: 't4',
    name: 'Lipid Profile',
    description: 'Cholesterol and heart health',
    price: 600,
    tests: ['Total Cholesterol', 'HDL', 'LDL', 'Triglycerides'],
    icon: '❤️',
  },
  {
    id: 't5',
    name: 'Liver Function Test',
    description: 'Complete liver health panel',
    price: 900,
    tests: ['SGPT', 'SGOT', 'Bilirubin', 'Alkaline Phosphatase'],
    icon: '🏥',
  },
  {
    id: 't6',
    name: 'H1B Virus Test',
    description: 'PCR test for H1B virus',
    price: 2200,
    tests: ['H1B PCR'],
    icon: '🦠',
  },
  {
    id: 't7',
    name: 'Dengue Test',
    description: 'Combo test for Dengue',
    price: 1100,
    tests: ['NS1', 'IgG', 'IgM'],
    icon: '🦟',
  },
  {
    id: 't8',
    name: 'X-Ray',
    description: 'Digital X-Ray imaging',
    price: 700,
    tests: ['Chest', 'Limb', 'Abdomen'],
    icon: '🩻',
  },
  {
    id: 't9',
    name: 'ECG',
    description: 'Electrocardiogram for heart rhythm',
    price: 450,
    tests: ['12-lead ECG'],
    icon: '❤️',
  },
  {
    id: 't10',
    name: 'Echocardiogram',
    description: 'Ultrasound study of the heart',
    price: 2500,
    tests: ['2D Echo', 'Color Doppler'],
    icon: '❤️',
  },
  {
    id: 't11',
    name: 'MRI Scan',
    description: 'Magnetic Resonance Imaging',
    price: 8000,
    tests: ['Brain', 'Spine', 'Joint'],
    icon: '🧠',
  },
  {
    id: 't12',
    name: 'Ultrasound',
    description: 'Ultrasonography of abdomen',
    price: 1500,
    tests: ['Whole Abdomen'],
    icon: '🤰',
  },
];

const Tests = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header title="Lab Tests" showBack showCart />
      
      <main className="container py-6 space-y-6">
        {/* My Reports */}
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-r from-primary/10 to-secondary/10"
          onClick={() => navigate('/reports')}
        >
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary rounded-full">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle>My Test Reports</CardTitle>
                <CardDescription>View your previous test results</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Test Packages */}
        <div>
          <h2 className="text-xl font-bold mb-4">Available Test Packages</h2>
          <div className="grid gap-4">
            {testPackages.map(pkg => (
              <Card key={pkg.id}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{pkg.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                      <CardDescription className="mt-1">{pkg.description}</CardDescription>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {pkg.tests.map(test => (
                          <Badge key={test} variant="secondary" className="text-xs">
                            {test}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">৳ {pkg.price}</span>
                    <Button
                      onClick={() => navigate(`/book-test/${pkg.id}`)}
                      size="sm"
                    >
                      <TestTube className="h-4 w-4 mr-2" />
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tests;