import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { LeadCaptureForm, LeadFormData } from "@/components/LeadCaptureForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MpesaPayment } from "@/components/MpesaPayment";
import { products } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { 
  Smartphone, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Star,
  Filter,
  Search
} from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'available' | 'preorder'>('all');
  const [leads, setLeads] = useState<(LeadFormData & { id: string; timestamp: Date })[]>([]);

  const filteredProducts = products.filter(product => {
    if (activeFilter === 'all') return product.status !== 'sold';
    return product.status === activeFilter;
  });

  const handleLeadCapture = (leadData: LeadFormData) => {
    const newLead = {
      ...leadData,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const handleBuyNow = (productId: string) => {
    setSelectedProduct(productId);
    setShowPayment(true);
  };

  const handlePreOrder = (productId: string) => {
    setSelectedProduct(productId);
    setShowPayment(true);
  };

  const handleRequestInfo = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      // Trigger WhatsApp with product-specific message
      const message = `Hi! I'm interested in the ${product.name}. Can you provide more details about pricing and availability?`;
      window.open(`https://wa.me/254712345678?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  const handlePaymentSuccess = (transactionId: string) => {
    toast({
      title: "Order Confirmed!",
      description: `Transaction ${transactionId} completed successfully.`,
    });
    setShowPayment(false);
    setSelectedProduct(null);
  };

  const selectedProductData = selectedProduct ? products.find(p => p.id === selectedProduct) : null;

  if (showPayment && selectedProductData) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-6 h-6 text-primary" />
              <h1 className="text-lg font-bold">SmartPhone Sales EA</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowPayment(false)}
            >
              Back to Catalog
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-md">
          <MpesaPayment
            amount={selectedProductData.price}
            productName={selectedProductData.name}
            productId={selectedProductData.id}
            onSuccess={handlePaymentSuccess}
            onCancel={() => setShowPayment(false)}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">SmartPhone Sales EA</h1>
            </div>
            <Badge className="status-badge status-available">
              <TrendingUp className="w-3 h-3 mr-1" />
              Best Prices in Kenya
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            Quality smartphones with M-Pesa payments & fast delivery across East Africa
          </p>
        </div>
      </header>

      {/* Hero Stats */}
      <section className="bg-gradient-to-r from-primary/5 to-secondary/5 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{products.filter(p => p.status === 'available').length}</div>
              <div className="text-xs text-muted-foreground">Available Now</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">{products.filter(p => p.status === 'preorder').length}</div>
              <div className="text-xs text-muted-foreground">Pre-Orders</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">{leads.length}</div>
              <div className="text-xs text-muted-foreground">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="catalog" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="catalog" className="flex items-center space-x-2">
              <Smartphone className="w-4 h-4" />
              <span>Shop Phones</span>
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Get Recommendations</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-6">
            {/* Filter Bar */}
            <Card>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Filter:</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant={activeFilter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveFilter('all')}
                      className={activeFilter === 'all' ? 'btn-primary' : ''}
                    >
                      All
                    </Button>
                    <Button
                      variant={activeFilter === 'available' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveFilter('available')}
                      className={activeFilter === 'available' ? 'btn-primary' : ''}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Available
                    </Button>
                    <Button
                      variant={activeFilter === 'preorder' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveFilter('preorder')}
                      className={activeFilter === 'preorder' ? 'btn-primary' : ''}
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      Pre-Order
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onBuyNow={handleBuyNow}
                  onPreOrder={handlePreOrder}
                  onRequestInfo={handleRequestInfo}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No phones found</h3>
                  <p className="text-muted-foreground">Try adjusting your filter or check back later for new arrivals.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="leads" className="space-y-6">
            <LeadCaptureForm onSubmit={handleLeadCapture} />
            
            {leads.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-primary" />
                    <span>Recent Inquiries</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leads.slice(0, 3).map((lead) => (
                      <div key={lead.id} className="p-3 bg-muted rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{lead.name}</p>
                            <p className="text-sm text-muted-foreground">{lead.budget} • {lead.interest}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {lead.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton variant="floating" />
    </div>
  );
};

export default Index;
