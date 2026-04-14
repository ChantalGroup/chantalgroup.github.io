import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import { products } from '@/lib/data/products';

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductAvatarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = parseInt(id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} initialHasAvatar={true} />;
}
