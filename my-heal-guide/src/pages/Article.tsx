// src/pages/Article.tsx

import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { articles } from '@/data/articles'; // Import the articles data
import NotFound from './NotFound'; // Import the NotFound component

const Article = () => {
  const { id } = useParams();
  const article = articles.find(a => a.id === id);

  // If no article is found, render the NotFound component
  if (!article) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Article" showBack showCart />
      
      <main className="container py-6">
        <Card>
          <CardHeader>
            <div className="text-6xl mb-4 text-center">{article.image}</div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge>{article.category}</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                {article.readTime}
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center">
              {article.title}
            </h1>
          </CardHeader>
          <CardContent className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              {article.excerpt}
            </p>

            {/* Dynamically render the article content */}
            <div dangerouslySetInnerHTML={{ __html: article.content }} />

            <p className="mt-8 text-sm text-muted-foreground border-t pt-6">
              <strong>Disclaimer:</strong> This article is for informational purposes only and should not replace 
              professional medical advice. Always consult with a healthcare provider for medical concerns.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Article;