'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import AvatarModal from './AvatarModal';

interface ProductDetailProps {
  product: Product;
  initialHasAvatar?: boolean;
}

export default function ProductDetail({ product, initialHasAvatar = false }: ProductDetailProps) {
  const [hasAvatar, setHasAvatar] = useState(initialHasAvatar);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  return (
    <div className="min-h-screen lg:h-screen bg-white flex flex-col lg:overflow-hidden">
      <div className="container mx-auto px-4 py-4 max-w-7xl h-auto lg:h-full flex flex-col">
        {/* Back Button */}
        <div className="flex-none mb-2">
          <Link
            href="/"
            className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors font-geo text-sm"
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
        </div>

        {/* Main Content Area - Flexible height */}
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4 lg:gap-8 items-stretch pb-4">
          {/* Left Side - Product Image & Info */}
          <div className="w-full lg:w-1/2 flex flex-col min-h-0">
            {/* Image Container - Flexible */}
            <div className="relative bg-gray-50 rounded-sm overflow-hidden min-h-0 h-[50vh] lg:h-auto lg:flex-1">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Product Info - Compact */}
            {/* Product Info - Compact & Fixed Height to align with actions */}
            <div className="flex-none pt-4 h-48 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-[10px] font-medium text-gray-500 mb-0.5 font-geo uppercase tracking-widest">
                      Brand Name
                    </p>
                    <h1 className="text-xl font-normal text-gray-900 font-geo tracking-wide">
                      {product.name}
                    </h1>
                  </div>
                  <p className="text-lg font-light text-gray-900 font-geo">
                    ${product.price}
                  </p>
                </div>

                <p className="text-xs text-gray-600 font-geo font-light leading-relaxed mb-3 line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-2">
                <p className="text-[10px] text-gray-400 font-geo font-light uppercase tracking-wide">
                  Free shipping on orders over $50
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Virtual Try-On */}
          <div className="w-full lg:w-1/2 flex flex-col min-h-0">
            {!hasAvatar ? (
              /* No Avatar State */
              <div className="flex flex-col h-full">
                {/* Card - Flexible Height to match image */}
                <div className="bg-[#FAFAFA] border border-gray-100 rounded-sm flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group min-h-0 h-[400px] lg:h-auto lg:flex-1">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-base font-light text-gray-900 mb-2 font-geo tracking-wide">
                      Try it on
                    </h3>
                    <p className="text-gray-500 font-geo font-light text-xs max-w-[240px] leading-relaxed mx-auto">
                      Visualize this look on yourself.
                    </p>
                  </div>
                </div>

                {/* Action Area aligned with Product Info */}
                {/* Action Area aligned with Product Info */}
                <div className="flex-none space-y-3 pt-4 h-48 flex flex-col">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-black text-white font-geo font-light py-3 px-8 text-sm uppercase tracking-widest hover:bg-gray-900 transition-all duration-300 rounded-sm shadow-sm hover:shadow-md"
                  >
                    Create your profile
                  </button>
                  <p className="text-[10px] text-gray-400 text-center font-geo font-light uppercase tracking-wider">
                    Secure & Private • Local Processing
                  </p>
                </div>
              </div>
            ) : (
              /* Has Avatar State */
              <div className="flex flex-col h-full">
                <div className="relative bg-gray-100 rounded-sm overflow-hidden shadow-sm min-h-0 h-[50vh] lg:h-auto lg:flex-1">
                  <video
                    src="/videos/avatar-romain-turn-black-tshirt.mov"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedData={() => setIsVideoReady(true)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      isVideoReady ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-sm border border-white/20">
                      <p className="text-[10px] text-gray-900 font-geo tracking-wide uppercase">
                        Virtual Preview
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-none space-y-3 pt-4 h-48 flex flex-col">
                  <button
                    onClick={() => setHasAvatar(false)}
                    className="w-full bg-white text-gray-900 font-geo font-light py-3 px-8 text-sm uppercase tracking-widest hover:bg-gray-50 transition-all duration-300 rounded-sm border border-gray-200"
                  >
                    Change Avatar
                  </button>
                  {/* Spacer match */}
                  <p className="text-[10px] text-transparent text-center font-geo font-light uppercase tracking-wider">
                    Spacer
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Avatar Creation Modal */}
      <AvatarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAvatarCreated={() => {
          setHasAvatar(true);
          setIsVideoReady(false);
        }}
      />
    </div>
  );
}