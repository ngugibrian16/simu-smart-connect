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
    name: 'Samsung Galaxy A54 5G',
    price: 42000,
    originalPrice: 45000,
    image: '/placeholder.svg',
    storage: '128GB',
    ram: '6GB',
    status: 'available',
    brand: 'Samsung',
    category: 'mid-range',
    description: 'Experience premium features at an affordable price with the Galaxy A54 5G.',
    specifications: {
      display: '6.4" Super AMOLED',
      camera: '50MP Triple Camera',
      battery: '5000mAh',
      processor: 'Exynos 1380',
      os: 'Android 13'
    }
  },
  {
    id: '2',
    name: 'iPhone 13',
    price: 85000,
    originalPrice: 95000,
    image: '/placeholder.svg',
    storage: '128GB',
    ram: '4GB',
    status: 'available',
    brand: 'Apple',
    category: 'premium',
    description: 'The most advanced dual-camera system ever on iPhone.',
    specifications: {
      display: '6.1" Super Retina XDR',
      camera: '12MP Dual Camera',
      battery: '3240mAh',
      processor: 'A15 Bionic',
      os: 'iOS 17'
    }
  },
  {
    id: '3',
    name: 'Oppo A78 5G',
    price: 28000,
    image: '/placeholder.svg',
    storage: '128GB',
    ram: '8GB',
    status: 'preorder',
    estimatedDelivery: '2-3 weeks',
    brand: 'Oppo',
    category: 'budget',
    description: 'Stylish design meets powerful performance in the Oppo A78 5G.',
    specifications: {
      display: '6.56" HD+ Display',
      camera: '50MP AI Camera',
      battery: '5000mAh',
      processor: 'MediaTek Dimensity 700',
      os: 'ColorOS 13'
    }
  },
  {
    id: '4',
    name: 'Xiaomi Redmi Note 12',
    price: 32000,
    originalPrice: 35000,
    image: '/placeholder.svg',
    storage: '128GB',
    ram: '6GB',
    status: 'available',
    brand: 'Xiaomi',
    category: 'mid-range',
    description: 'Flagship performance at an unbeatable price point.',
    specifications: {
      display: '6.67" AMOLED',
      camera: '50MP Triple Camera',
      battery: '5000mAh',
      processor: 'Snapdragon 685',
      os: 'MIUI 14'
    }
  },
  {
    id: '5',
    name: 'Tecno Spark 10 Pro',
    price: 18000,
    image: '/placeholder.svg',
    storage: '128GB',
    ram: '8GB',
    status: 'available',
    brand: 'Tecno',
    category: 'budget',
    description: 'Big screen, big battery, big performance at a great price.',
    specifications: {
      display: '6.8" HD+ Display',
      camera: '48MP AI Camera',
      battery: '5000mAh',
      processor: 'MediaTek Helio G36',
      os: 'HiOS 12'
    }
  },
  {
    id: '6',
    name: 'Samsung Galaxy S23',
    price: 110000,
    image: '/placeholder.svg',
    storage: '256GB',
    ram: '8GB',
    status: 'preorder',
    estimatedDelivery: '1-2 weeks',
    brand: 'Samsung',
    category: 'premium',
    description: 'The ultimate smartphone experience with cutting-edge technology.',
    specifications: {
      display: '6.1" Dynamic AMOLED 2X',
      camera: '50MP Triple Camera',
      battery: '3900mAh',
      processor: 'Snapdragon 8 Gen 2',
      os: 'Android 13'
    }
  }
];