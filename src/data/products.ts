export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  storage: string;
  ram: string;
  status: 'available' | 'preorder' | 'sold';
  estimatedDelivery?: string;
  brand: string;
  category: 'budget' | 'mid-range' | 'premium';
  description: string;
  specifications: {
    display: string;
    camera: string;
    battery: string;
    processor: string;
    os: string;
  };
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Tecno Spark 10 Pro',
    price: 25000,
    originalPrice: 28000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    storage: '128GB',
    ram: '8GB',
    status: 'available',
    brand: 'Tecno',
    category: 'budget',
    description: 'Big screen, big battery, big performance at an unbeatable price.',
    specifications: {
      display: '6.8" HD+ Display',
      camera: '48MP AI Camera',
      battery: '5000mAh',
      processor: 'MediaTek Helio G36',
      os: 'HiOS 12'
    }
  },
  {
    id: '2',
    name: 'Tecno Camon 20 Premier',
    price: 45000,
    originalPrice: 50000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    storage: '256GB',
    ram: '8GB',
    status: 'preorder',
    estimatedDelivery: '1-2 weeks',
    brand: 'Tecno',
    category: 'mid-range',
    description: 'Premium camera technology meets flagship performance.',
    specifications: {
      display: '6.67" AMOLED Curved',
      camera: '50MP RGBW Camera',
      battery: '5000mAh',
      processor: 'MediaTek Dimensity 8050',
      os: 'HiOS 13'
    }
  },
  {
    id: '3',
    name: 'Tecno Phantom X2 Pro',
    price: 65000,
    originalPrice: 70000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    storage: '256GB',
    ram: '12GB',
    status: 'preorder',
    estimatedDelivery: '2-3 weeks',
    brand: 'Tecno',
    category: 'premium',
    description: 'Ultimate flagship experience with cutting-edge camera technology.',
    specifications: {
      display: '6.8" AMOLED Curved',
      camera: '50MP Retractable Lens',
      battery: '5160mAh',
      processor: 'MediaTek Dimensity 9000',
      os: 'HiOS 13'
    }
  },
  {
    id: '4',
    name: 'Tecno Pova 5 Pro',
    price: 32000,
    originalPrice: 35000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    storage: '256GB',
    ram: '8GB',
    status: 'available',
    brand: 'Tecno',
    category: 'mid-range',
    description: 'Gaming powerhouse with massive battery and cooling system.',
    specifications: {
      display: '6.78" FHD+ 120Hz',
      camera: '68MP Ultra Clear Camera',
      battery: '5000mAh',
      processor: 'MediaTek Dimensity 6080',
      os: 'HiOS 13'
    }
  },
  {
    id: '5',
    name: 'Tecno Spark 10C',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    storage: '128GB',
    ram: '4GB',
    status: 'available',
    brand: 'Tecno',
    category: 'budget',
    description: 'Affordable smartphone with essential features for everyday use.',
    specifications: {
      display: '6.6" HD+ Display',
      camera: '16MP AI Camera',
      battery: '5000mAh',
      processor: 'UNISOC Tiger T606',
      os: 'HiOS 12'
    }
  },
  {
    id: '6',
    name: 'Tecno Camon 20 Pro 5G',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    storage: '256GB',
    ram: '8GB',
    status: 'preorder',
    estimatedDelivery: '1-2 weeks',
    brand: 'Tecno',
    category: 'premium',
    description: '5G connectivity with professional-grade camera capabilities.',
    specifications: {
      display: '6.67" AMOLED 120Hz',
      camera: '50MP RGBW + 108MP',
      battery: '5000mAh',
      processor: 'MediaTek Dimensity 8050',
      os: 'HiOS 13'
    }
  }
];