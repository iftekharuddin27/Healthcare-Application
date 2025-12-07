import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const medicines = [
  {
    id: 'm1',
    name: 'Paracetamol 500mg',
    description: 'Pain reliever and fever reducer',
    price: 25,
    category: 'Pain Relief',
    image: '💊',
  },
  {
    id: 'm2',
    name: 'Vitamin D3',
    description: 'Bone health supplement',
    price: 450,
    category: 'Vitamins',
    image: '💊',
  },
  {
    id: 'm3',
    name: 'Amoxicillin',
    description: 'Antibiotic for bacterial infections',
    price: 120,
    category: 'Antibiotics',
    image: '💊',
  },
  {
    id: 'm4',
    name: 'Cetirizine',
    description: 'Allergy relief medication',
    price: 80,
    category: 'Allergy',
    image: '💊',
  },
  {
    id: 'm5',
    name: 'Omega-3 Fish Oil',
    description: 'Heart health supplement',
    price: 650,
    category: 'Supplements',
    image: '💊',
  },
  {
    id: 'm6',
    name: 'Ibuprofen',
    description: 'Anti-inflammatory pain relief',
    price: 45,
    category: 'Pain Relief',
    image: '💊',
  },
  {
    id: 'm7',
    name: 'Savlon Cream',
    description: 'Antiseptic cream for cuts',
    price: 55,
    category: 'Antiseptic',
    image: '🧴',
  },
  {
    id: 'm8',
    name: 'Monteen 10mg',
    description: 'Asthma & allergy relief',
    price: 150,
    category: 'Allergy',
    image: '💊',
  },
  {
    id: 'm9',
    name: 'Fexo 120mg',
    description: 'Antihistamine for allergy',
    price: 90,
    category: 'Allergy',
    image: '💊',
  },
  {
    id: 'm10',
    name: 'Adovas Syrup',
    description: 'Cough and cold syrup',
    price: 110,
    category: 'Cough Syrup',
    image: '🍾',
  },
  {
    id: 'm11',
    name: 'Tufnil 500mg',
    description: 'Pain and fever relief',
    price: 30,
    category: 'Pain Relief',
    image: '💊',
  },
  {
    id: 'm12',
    name: 'Vitamin B-13',
    description: 'Orotic acid supplement',
    price: 220,
    category: 'Vitamins',
    image: '💊',
  },
];

const categories = [
  'All',
  'Pain Relief',
  'Vitamins',
  'Antibiotics',
  'Allergy',
  'Supplements',
  'Antiseptic',
  'Cough Syrup',
];

const Medicines = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();

  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header title="Order Medicines" showBack showCart />
      
      <main className="container py-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search medicines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Medicines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMedicines.map(medicine => (
            <Card key={medicine.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="text-4xl">{medicine.image}</div>
                    <div>
                      <CardTitle className="text-base">{medicine.name}</CardTitle>
                      <CardDescription className="text-sm mt-1">
                        {medicine.description}
                      </CardDescription>
                      <Badge variant="secondary" className="mt-2">
                        {medicine.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary">৳{medicine.price}</span>
                  <Button className='flex justify-items-center px-3'
                    onClick={() => addToCart(medicine)}
                    size="sm"
                  >
                    <Plus className="" />
                    Add to Cart
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

export default Medicines;