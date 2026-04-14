'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAvatarCreated: () => void;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function AvatarModal({ isOpen, onClose, onAvatarCreated }: AvatarModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [sideImage, setSideImage] = useState<File | null>(null);
  const [frontImagePreview, setFrontImagePreview] = useState<string | null>(null);
  const [sideImagePreview, setSideImagePreview] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Trigger animation when modal opens
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setShowModal(isOpen);
    });

    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFrontImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFrontImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFrontImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSideImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSideImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSideImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateAvatar = () => {
    if (!frontImage || !sideImage) return;
    
    setIsCreating(true);
    // Simulate avatar creation processing
    setTimeout(() => {
      setIsCreating(false);
      setIsTransitioning(true);
      setTimeout(() => {
        setStep(3);
        setIsTransitioning(false);
      }, 150);
    }, 2000);
  };

  const handleClose = () => {
    if (!isCreating) {
      setStep(1);
      setFrontImage(null);
      setSideImage(null);
      setFrontImagePreview(null);
      setSideImagePreview(null);
      onClose();
    }
  };

  const handleFinish = () => {
    onAvatarCreated();
    setStep(1);
    setFrontImage(null);
    setSideImage(null);
    setFrontImagePreview(null);
    setSideImagePreview(null);
    onClose();
  };

  const handleNext = () => {
    if (frontImage) {
      setIsTransitioning(true);
      setTimeout(() => {
        setStep(2);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(1);
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center`}>
      {/* Multi-layer backdrop for smooth blur transition */}
      <div 
        className={`absolute inset-0 bg-black/10 backdrop-blur-[1px] transition-opacity duration-300 ease-out ${showModal ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />
      <div 
        className={`absolute inset-0 bg-black/10 backdrop-blur-[2px] transition-opacity duration-300 ease-out delay-75 ${showModal ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />
      <div 
        className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-300 ease-out delay-150 ${showModal ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-white max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl rounded-lg transition-all duration-300 ${showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center rounded-t-lg">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-normal font-geo text-gray-900">
              Create your profile
            </h2>
          </div>
          <button
            onClick={handleClose}
            disabled={isCreating}
            className="text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 space-y-6 min-h-[500px] relative overflow-hidden">
          <div 
            className={`transition-all duration-300 ease-in-out ${
              isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
            }`}
          >
          {step === 1 ? (
            <div className="space-y-6">
              {/* Step 1: Front Photo */}
              <div>
                <h3 className="text-lg font-normal font-geo text-gray-900 mb-2">
                  Add a front photo
                </h3>
                <p className="text-sm text-gray-600 font-geo font-light leading-relaxed">
                  Stand facing the camera. Make sure your face and full body are visible.
                </p>
              </div>

              <div className="max-w-sm mx-auto">
                <div className="relative aspect-[4/5] bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors overflow-hidden">
                  {frontImagePreview ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={frontImagePreview}
                        alt="Front preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() => {
                          setFrontImage(null);
                          setFrontImagePreview(null);
                        }}
                        disabled={isCreating}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                      >
                        <svg 
                          className="w-4 h-4 text-gray-700" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M6 18L18 6M6 6l12 12" 
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <svg 
                        className="w-12 h-12 text-gray-400 mb-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M12 4v16m8-8H4" 
                        />
                      </svg>
                      <span className="text-sm text-gray-600 font-geo font-light">
                        Click to upload
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFrontImageChange}
                        disabled={isCreating}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <p className="text-xs text-gray-500 font-geo font-light mt-2 text-center">
                  Face forward, well-lit
                </p>
              </div>
            </div>
          ) : step === 2 ? (
            <div className="space-y-6">
              {/* Step 2: Side Photo */}
              <div>
                <h3 className="text-lg font-normal font-geo text-gray-900 mb-2">
                  Upload Side Profile Photo
                </h3>
                <p className="text-sm text-gray-600 font-geo font-light leading-relaxed">
                  Take a 90° side profile photo with the same lighting conditions as your front photo.
                </p>
              </div>

              <div className="max-w-sm mx-auto">
                <div className="relative aspect-[4/5] bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors overflow-hidden">
                  {sideImagePreview ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={sideImagePreview}
                        alt="Side preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() => {
                          setSideImage(null);
                          setSideImagePreview(null);
                        }}
                        disabled={isCreating}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                      >
                        <svg 
                          className="w-4 h-4 text-gray-700" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M6 18L18 6M6 6l12 12" 
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <svg 
                        className="w-12 h-12 text-gray-400 mb-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M12 4v16m8-8H4" 
                        />
                      </svg>
                      <span className="text-sm text-gray-600 font-geo font-light">
                        Click to upload
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSideImageChange}
                        disabled={isCreating}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <p className="text-xs text-gray-500 font-geo font-light mt-2 text-center">
                  90° profile, same lighting
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Step 3: Avatar Created */}
              <div>
                <h3 className="text-lg font-normal font-geo text-gray-900 mb-2 text-center">
                  Your are all set!
                </h3>
                <p className="text-sm text-gray-600 font-geo font-light leading-relaxed text-center">
                  You are ready to try clothes on
                </p>
              </div>

              <div className="max-w-[300px] mx-auto">
                <div className={`relative aspect-[9/16] rounded-lg overflow-hidden shadow-xl transition-colors duration-300 ${isVideoReady ? 'bg-black' : 'bg-gray-100'}`}>
                  {!isVideoReady && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                    </div>
                  )}
                  <video
                    src={`${basePath}/videos/avatar-romain-turns-0.mov`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onCanPlay={() => setIsVideoReady(true)}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
                  />
                </div>
              </div>
            </div>
          )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-6 flex gap-4 justify-between rounded-b-lg">
          <div>
            {step === 2 && (
              <button
                onClick={handleBack}
                disabled={isCreating}
                className="px-6 py-2 text-sm font-geo font-light text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Back
              </button>
            )}
          </div>
          <div className="flex gap-4">
            {step === 3 ? (
              <button
                onClick={handleFinish}
                className="px-6 py-2 text-sm font-geo font-light text-white bg-gray-900 rounded hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            ) : (
              <>
                <button
                  onClick={handleClose}
                  disabled={isCreating}
                  className="px-6 py-2 text-sm font-geo font-light text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                {step === 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={!frontImage}
                    className="px-6 py-2 text-sm font-geo font-light text-white bg-gray-900 rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleCreateAvatar}
                    disabled={!sideImage || isCreating}
                    className="px-6 py-2 text-sm font-geo font-light text-white bg-gray-900 rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isCreating ? (
                      <>
                        <svg 
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24"
                        >
                          <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                          />
                          <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Creating your profile...
                      </>
                    ) : (
                      'Create profile'
                    )}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
