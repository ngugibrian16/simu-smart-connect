import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, CreditCard, CheckCircle, AlertCircle, Info } from "lucide-react";
import { MpesaPayment } from "./MpesaPayment";

interface PreOrderDepositProps {
  productName: string;
  productId: string;
  totalPrice: number;
  onSuccess?: (transactionId: string, depositAmount: number) => void;
  onCancel?: () => void;
}

export const PreOrderDeposit = ({ 
  productName, 
  productId, 
  totalPrice, 
  onSuccess, 
  onCancel 
}: PreOrderDepositProps) => {
  const { toast } = useToast();
  const [depositAmount, setDepositAmount] = useState<string>("2000");
  const [showPayment, setShowPayment] = useState(false);
  const [isValidAmount, setIsValidAmount] = useState(true);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const validateAmount = (amount: string) => {
    const numAmount = parseInt(amount);
    const minAmount = 2000;
    const maxAmount = totalPrice;
    
    if (isNaN(numAmount) || numAmount < minAmount || numAmount > maxAmount) {
      setIsValidAmount(false);
      return false;
    }
    setIsValidAmount(true);
    return true;
  };

  const handleAmountChange = (value: string) => {
    setDepositAmount(value);
    validateAmount(value);
  };

  const handleProceedToPayment = () => {
    if (!validateAmount(depositAmount)) {
      toast({
        title: "Invalid Amount",
        description: `Deposit must be between KES 2,000 and ${formatPrice(totalPrice)}.`,
        variant: "destructive",
      });
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = (transactionId: string) => {
    onSuccess?.(transactionId, parseInt(depositAmount));
  };

  const remainingAmount = totalPrice - parseInt(depositAmount || "0");
  const depositPercent = Math.round((parseInt(depositAmount || "0") / totalPrice) * 100);

  if (showPayment) {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setShowPayment(false)}
          className="mb-4"
        >
          ← Back to Deposit Amount
        </Button>
        <MpesaPayment
          amount={parseInt(depositAmount)}
          productName={`${productName} (Deposit)`}
          productId={productId}
          isDeposit={true}
          totalPrice={totalPrice}
          onSuccess={handlePaymentSuccess}
          onCancel={() => setShowPayment(false)}
        />
      </div>
    );
  }

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Smartphone className="w-5 h-5 text-primary" />
          <span>Pre-Order Deposit</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Secure your phone with a flexible deposit amount
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Product Info */}
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Product</span>
            <Smartphone className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="font-medium mb-2">{productName}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Price</span>
            <span className="text-lg font-bold text-primary">{formatPrice(totalPrice)}</span>
          </div>
        </div>

        {/* Deposit Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="deposit-amount">Deposit Amount (KES)</Label>
          <Input
            id="deposit-amount"
            type="number"
            min="2000"
            max={totalPrice}
            value={depositAmount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className={`text-lg ${!isValidAmount ? 'border-destructive' : ''}`}
            placeholder="Enter deposit amount"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Minimum: KES 2,000</span>
            <span>Maximum: {formatPrice(totalPrice)}</span>
          </div>
          {!isValidAmount && (
            <div className="flex items-center space-x-1 text-destructive text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Amount must be between KES 2,000 and {formatPrice(totalPrice)}</span>
            </div>
          )}
        </div>

        {/* Quick Amount Buttons */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Quick Select:</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAmountChange("2000")}
              className={depositAmount === "2000" ? "border-primary" : ""}
            >
              KES 2,000
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAmountChange("5000")}
              className={depositAmount === "5000" ? "border-primary" : ""}
            >
              KES 5,000
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAmountChange(Math.round(totalPrice * 0.3).toString())}
              className={depositAmount === Math.round(totalPrice * 0.3).toString() ? "border-primary" : ""}
            >
              30% ({formatPrice(Math.round(totalPrice * 0.3))})
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAmountChange(Math.round(totalPrice * 0.5).toString())}
              className={depositAmount === Math.round(totalPrice * 0.5).toString() ? "border-primary" : ""}
            >
              50% ({formatPrice(Math.round(totalPrice * 0.5))})
            </Button>
          </div>
        </div>

        {/* Payment Summary */}
        {depositAmount && isValidAmount && (
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <h4 className="font-medium mb-3 flex items-center space-x-2">
              <Info className="w-4 h-4 text-primary" />
              <span>Pre-Order Summary</span>
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Deposit Amount ({depositPercent}%)</span>
                <span className="font-medium text-primary">{formatPrice(parseInt(depositAmount))}</span>
              </div>
              <div className="flex justify-between">
                <span>Remaining Balance</span>
                <span>{formatPrice(remainingAmount)}</span>
              </div>
              <div className="pt-2 border-t border-primary/20">
                <div className="flex justify-between font-medium">
                  <span>Total Price</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="bg-muted/50 p-3 rounded text-xs text-muted-foreground">
          <p className="font-medium mb-1">How Pre-Order Works:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Pay your chosen deposit amount now to secure the phone</li>
            <li>Pay the remaining balance when the phone arrives</li>
            <li>We'll notify you when your phone is ready for pickup/delivery</li>
            <li>Your deposit is fully refundable if you change your mind</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button 
            onClick={handleProceedToPayment}
            disabled={!isValidAmount || !depositAmount}
            className="flex-1 btn-primary"
          >
            {depositAmount && isValidAmount ? (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Pay {formatPrice(parseInt(depositAmount))} Deposit
              </>
            ) : (
              "Enter Valid Amount"
            )}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};