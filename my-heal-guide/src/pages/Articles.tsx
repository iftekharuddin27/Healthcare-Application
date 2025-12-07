// src/pages/Articles.tsx

import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { articles } from '@/data/articles'; // Import the articles data

const Articles = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header title="Health Articles" showBack showCart />
      
      <main className="container py-6 space-y-6">
        {/* Trending Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Trending Now</h2>
          </div>
          <div className="grid gap-4">
            {articles.filter(a => a.trending).map(article => (
              <Card
                key={article.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/article/${article.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{article.image}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{article.category}</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      <CardDescription className="mt-2">{article.excerpt}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* All Articles */}
        <div>
          <h2 className="text-xl font-bold mb-4">More Articles</h2>
          <div className="grid gap-4">
            {articles.filter(a => !a.trending).map(article => (
              <Card
                key={article.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/article/${article.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{article.image}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{article.category}</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      <CardDescription className="mt-2">{article.excerpt}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Articles;