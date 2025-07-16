import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, CreditCard, CheckCircle, Loader2 } from "lucide-react";

interface MpesaPaymentProps {
  amount: number;
  productName: string;
  productId: string;
  onSuccess?: (transactionId: string) => void;
  onCancel?: () => void;
}

export const MpesaPayment = ({ 
  amount, 
  productName, 
  productId, 
  onSuccess, 
  onCancel 
}: MpesaPaymentProps) => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'input' | 'processing' | 'success'>('input');
  const [transactionId, setTransactionId] = useState("");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handlePayment = async () => {
    if (!phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your M-Pesa phone number.",
        variant: "destructive",
      });
      return;
    }

    // Basic phone validation
    const phoneRegex = /^(\+254|0)[7-9]\d{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid M-Pesa number (e.g., 0712345678).",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setPaymentStep('processing');

    try {
      // Simulate M-Pesa STK Push API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock transaction ID
      const mockTransactionId = `TX${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setTransactionId(mockTransactionId);
      setPaymentStep('success');
      
      toast({
        title: "Payment Successful!",
        description: `Your payment of ${formatPrice(amount)} has been received.`,
      });

      onSuccess?.(mockTransactionId);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Unable to process payment. Please try again or contact support.",
        variant: "destructive",
      });
      setPaymentStep('input');
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentStep === 'success') {
    return (
      <Card className="card-elevated">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <CardTitle className="text-success">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="space-y-2">
            <p className="text-muted-foreground">Transaction ID:</p>
            <p className="font-mono text-sm bg-muted p-2 rounded">{transactionId}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-muted-foreground">Amount Paid:</p>
            <p className="text-2xl font-bold text-success">{formatPrice(amount)}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-muted-foreground">Product:</p>
            <p className="font-medium">{productName}</p>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              You will receive an SMS confirmation shortly. Our team will contact you within 24 hours to arrange delivery.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (paymentStep === 'processing') {
    return (
      <Card className="card-elevated">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <CardTitle>Processing Payment...</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Please check your phone for the M-Pesa prompt and enter your PIN to complete the payment.
          </p>
          
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium">Payment Details:</p>
            <p className="text-sm text-muted-foreground">Amount: {formatPrice(amount)}</p>
            <p className="text-sm text-muted-foreground">Phone: {phoneNumber}</p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => {
              setPaymentStep('input');
              setIsProcessing(false);
            }}
            disabled={isProcessing}
          >
            Cancel Payment
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5 text-primary" />
          <span>M-Pesa Payment</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Pay securely using M-Pesa mobile money
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Smartphone className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Product</span>
          </div>
          <p className="font-medium">{productName}</p>
        </div>
        
        <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Amount</span>
            <span className="text-2xl font-bold text-primary">{formatPrice(amount)}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="mpesa-phone">M-Pesa Phone Number</Label>
          <Input
            id="mpesa-phone"
            type="tel"
            placeholder="0712345678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="text-lg"
          />
          <p className="text-xs text-muted-foreground">
            Make sure this number is registered for M-Pesa
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="flex-1 btn-primary"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ${formatPrice(amount)}`
            )}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onCancel}
            disabled={isProcessing}
          >
            Cancel
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
          <p className="font-medium mb-1">How it works:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Click "Pay" to initiate M-Pesa payment</li>
            <li>Check your phone for the M-Pesa prompt</li>
            <li>Enter your M-Pesa PIN to complete payment</li>
            <li>Receive confirmation and order details</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};