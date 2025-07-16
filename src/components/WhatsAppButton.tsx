import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  productName?: string;
  className?: string;
  variant?: "default" | "outline" | "floating";
}

export const WhatsAppButton = ({
  phoneNumber = "+254712345678", // Default sales number
  message = "Hi! I'm interested in your smartphones. Can you help me?",
  productName,
  className = "",
  variant = "default"
}: WhatsAppButtonProps) => {
  const handleWhatsAppClick = () => {
    let finalMessage = message;
    
    if (productName) {
      finalMessage = `Hi! I'm interested in the ${productName}. Can you provide more details and pricing?`;
    }
    
    const encodedMessage = encodeURIComponent(finalMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (variant === "floating") {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={handleWhatsAppClick}
          className={`btn-secondary shadow-lg hover:shadow-xl w-14 h-14 rounded-full p-0 ${className}`}
          aria-label="Contact via WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      variant={variant === "outline" ? "outline" : "default"}
      className={`${variant === "outline" ? "" : "btn-secondary"} ${className}`}
    >
      <MessageCircle className="w-4 h-4 mr-2" />
      {productName ? "Ask About This Phone" : "Chat on WhatsApp"}
    </Button>
  );
};