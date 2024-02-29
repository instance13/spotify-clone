"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import SubscribeModal from "@/components/SubscribeModal";
import { ProductWithPrice } from "@/types";

interface ModalProviderProps {
  products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false);

  // prevent hydration errors
  useEffect(() => {
    setIsMounted(true); // modals cannot be open in ssr
  }, []);

  if (!isMounted) {
    return null;
  };

  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={ products} />
    </>
  );
};

export default ModalProvider;