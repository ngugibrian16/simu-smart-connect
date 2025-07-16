import React, { useState } from 'react';
import ProductCard from './components/ProductCard';
import FloatingActions from './components/FloatingActions';
import AdminDashboard from './components/AdminDashboard';

const mockProducts = [
  {
    id: 1,
    name: 'Infinix Hot 30',
    price: 14500,
    specs: '6.8\" | 128GB + 4GB | 5000mAh',
    status: 'Available',
    whyGreat: 'Great battery life'
  },
  {
    id: 2,
    name: 'Samsung A14',
    price: 20500,
    specs: '6.6\" | 64GB + 4GB | 5000mAh',
    status: 'Pre-order',
    whyGreat: 'Trusted brand at budget'
  }
];

const faqs = [
  {
    question: 'How do I pre-order a phone?',
    answer: 'Click the WhatsApp button and tell us the phone you want. We will guide you from there.'
  },
  {
    question: 'How do I pay?',
    answer: 'We accept M-Pesa. You will receive a secure STK push after confirming your order.'
  },
  {
    question: 'When will I receive my pre-order?',
    answer: 'Pre-orders typically take 2–5 business days to fulfill. We will update you along the way.'
  }
];

export default function App() {
  const [budget, setBudget] = useState(30000);
  const filteredProducts = mockProducts.filter(p => p.price <= budget);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Simu Smart Connect</h1>

      <label className="block text-sm font-medium mb-2">Filter by Budget (KSh): {budget}</label>
      <input
        type="range"
        min="5000"
        max="30000"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
        className="w-full mb-6"
      />

      {filteredProducts.map(product => (
        <div key={product.id}>
          <ProductCard product={product} />
          <div className="flex gap-2 mb-4">
            <a
              href={`https://wa.me/254700000000?text=I'm%20interested%20in%20${encodeURIComponent(product.name)}`}
              target="_blank"
              className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600"
            >
              Buy on WhatsApp
            </a>
            <a
              href="tel:+254700000000"
              className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
            >
              Call to Order
            </a>
          </div>
        </div>
      ))}

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-3">
            <p className="font-medium text-gray-800">Q: {faq.question}</p>
            <p className="text-sm text-gray-600">A: {faq.answer}</p>
          </div>
        ))}
      </div>

      <AdminDashboard />
      <FloatingActions />
    </div>
  );
}
