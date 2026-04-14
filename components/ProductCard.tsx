import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group block"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <Image
          src={`${basePath}${product.image}`}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
        <div className="absolute top-3 right-3 bg-white px-3 py-1 text-xs font-light tracking-wide">
          New
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-base text-gray-900 font-normal group-hover:underline font-geo">
          {product.name}
        </h3>
        <p className="text-base text-gray-900 font-light font-geo">
          ${product.price}
        </p>
      </div>
    </Link>
  );
}
