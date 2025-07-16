import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Clock, CheckCircle, XCircle } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  storage: string;
  ram: string;
  status: 'available' | 'preorder' | 'sold';
  estimatedDelivery?: string;
  onPreOrder?: (productId: string) => void;
  onBuyNow?: (productId: string) => void;
  onRequestInfo?: (productId: string) => void;
}

export const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  storage,
  ram,
  status,
  estimatedDelivery,
  onPreOrder,
  onBuyNow,
  onRequestInfo,
}: ProductCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'available':
        return (
          <Badge className="status-badge status-available">
            <CheckCircle className="w-3 h-3 mr-1" />
            Available Now
          </Badge>
        );
      case 'preorder':
        return (
          <Badge className="status-badge status-preorder">
            <Clock className="w-3 h-3 mr-1" />
            Pre-Order
          </Badge>
        );
      case 'sold':
        return (
          <Badge className="status-badge status-sold">
            <XCircle className="w-3 h-3 mr-1" />
            Sold Out
          </Badge>
        );
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="card-elevated w-full max-w-sm mx-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Smartphone className="w-5 h-5 text-primary" />
          {getStatusBadge()}
        </div>
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-3">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        </div>
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Storage: {storage}</span>
          <span>RAM: {ram}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">{formatPrice(price)}</span>
          {originalPrice && (
            <span className="text-sm line-through text-muted-foreground">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
        
        {status === 'preorder' && estimatedDelivery && (
          <p className="text-sm text-muted-foreground">
            Estimated delivery: {estimatedDelivery}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2">
        {status === 'available' && (
          <Button 
            className="w-full btn-primary"
            onClick={() => onBuyNow?.(id)}
          >
            Buy Now - M-Pesa
          </Button>
        )}
        
        {status === 'preorder' && (
          <Button 
            className="w-full btn-secondary"
            onClick={() => onPreOrder?.(id)}
          >
            Pre-Order Now
          </Button>
        )}
        
        {status !== 'sold' && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onRequestInfo?.(id)}
          >
            Request Info
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};