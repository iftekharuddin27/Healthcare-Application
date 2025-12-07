import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const reports = [
  {
    id: 'r1',
    testName: 'Complete Blood Count',
    date: '2024-01-15',
    status: 'Normal',
    icon: '🩸',
  },
  {
    id: 'r2',
    testName: 'Lipid Profile',
    date: '2023-12-20',
    status: 'Normal',
    icon: '❤️',
  },
  {
    id: 'r3',
    testName: 'Diabetes Screening',
    date: '2023-11-10',
    status: 'Attention Required',
    icon: '💉',
  },
];

const Reports = () => {
  const { toast } = useToast();

  const handleDownload = (reportName: string) => {
    toast({
      title: "Downloading Report",
      description: `${reportName} report is being downloaded`,
    });
  };

  if (reports.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="My Reports" showBack />
        <div className="container py-20 text-center">
          <FileText className="h-20 w-20 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">No reports yet</h2>
          <p className="text-muted-foreground">Your test reports will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="My Test Reports" showBack />
      
      <main className="container py-6 space-y-4">
        {reports.map(report => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="text-5xl">{report.icon}</div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{report.testName}</CardTitle>
                  <CardDescription className="mt-2 flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    {new Date(report.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </CardDescription>
                  <Badge
                    variant={report.status === 'Normal' ? 'secondary' : 'destructive'}
                    className="mt-3"
                  >
                    {report.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
             <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                        variant="outline"
                        className="w-full sm:flex-1"
                        onClick={() => handleDownload(report.testName)}
                         >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                           </Button>
                               <Button className="w-full sm:flex-1">
                                <FileText className="h-4 w-4 mr-2" />
                                  View Details
                                 </Button>
            </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
};

export default Reports;
