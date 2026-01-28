'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import AvatarModal from './AvatarModal';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [hasAvatar, setHasAvatar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-700 hover:text-gray-900 mb-6 transition-colors font-geo text-sm"
        >
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          Back to Gallery
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left Side - Product Details */}
          <div className="order-1 lg:order-1">
            {/* Product Image - Medium size */}
            <div className="relative w-full max-w-md aspect-[3/4] bg-gray-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Product Info Below Image */}
            <div className="mt-4 max-w-md space-y-4">
              <div>
                <p className="text-xs font-normal text-gray-600 mb-1 font-geo uppercase tracking-wider">
                  Brand Name
                </p>
                <h1 className="text-xl font-normal text-gray-900 mb-1 font-geo">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-600 font-geo font-light mb-2">
                  {product.description}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-lg text-gray-900 font-geo font-light mb-1">
                  ${product.price}
                </p>
                <p className="text-xs text-gray-500 font-geo font-light">
                  Free shipping on orders over $50
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Virtual Try-On (Compact) */}
          <div className="order-2 lg:order-2">
            <div className="sticky top-8">
              {!hasAvatar ? (
                <div className="space-y-4">
                  {/* No Avatar Card - Compact */}
                  <div className="bg-gray-50 border border-gray-200 flex flex-col items-center justify-center p-12 text-center min-h-[600px]">
                    <div className="w-20 h-20 mx-auto mb-4 border-2 border-gray-300 rounded-full flex items-center justify-center">
                      <svg 
                        className="w-10 h-10 text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-normal text-gray-900 mb-2 font-geo">
                      No Avatar Yet
                    </h3>
                    <p className="text-gray-600 font-geo font-light text-sm max-w-sm">
                      Create your personalized avatar to see how this {product.name.toLowerCase()} looks on you
                    </p>
                  </div>

                  {/* Create Avatar Button */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-gray-900 text-white font-geo font-light py-3 px-6 text-sm hover:bg-gray-800 transition-colors"
                  >
                    Create Your Avatar
                  </button>

                  <p className="text-xs text-gray-500 text-center font-geo font-light">
                    Takes less than a minute
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Avatar Try-On Preview - Compact */}
                  <div className="bg-gray-50 aspect-[3/4] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 border-2 border-gray-300 rounded-full flex items-center justify-center">
                        <svg 
                          className="w-10 h-10 text-gray-400" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                          />
                        </svg>
                      </div>
                      <p className="text-gray-900 font-geo font-light text-sm">
                        Your avatar with {product.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-2 font-geo font-light">
                        Virtual try-on preview
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setHasAvatar(false)}
                    className="w-full bg-gray-100 text-gray-900 font-geo font-light py-3 px-6 text-sm hover:bg-gray-200 transition-colors"
                  >
                    Change Avatar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Creation Modal */}
      <AvatarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAvatarCreated={() => setHasAvatar(true)}
      />
    </div>
  );
}