import { useToast } from "@/hooks/use-toast";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface Product {
   products: Products[];
   total: number;
   skip: number;
   limit: number;
}

interface Products {
   id: number;
   title: string;
   description: string;
   category: string;
   price: number;
   discountPercentage: string;
   rating: number;
   stock: number;
   brand: string;
   sku: string;
   availabilityStatus: string;
   minimumOrderQuantity: number;
   images: string;
   thumbnail: string;
}

interface ProductsContextProps {
   products: Products[];
   filteredProducts: Products[];
   bookMark: (product: Products) => Promise<void>;
   selectedCategory: string;
   setSelectedCategory: (category: string) => void;
   isLoading: boolean;
   searchProducts: (q: string) => void;
   bookmarkedIds: number[];
}

const ProductsContext = createContext<ProductsContextProps | undefined>(
   undefined,
);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const [products, setProducts] = useState<Products[]>([]);
   const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [selectedCategory, setSelectedCategory] = useState<string>("");
   const [bookmarkedProducts, setBookmarkedProducts] = useState<Products[]>([]);
   const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

   useEffect(() => {
      const fetchProducts = async () => {
         setIsLoading(true);
         try {
            const response = await axios.get("https://dummyjson.com/products");
            setProducts(response.data.products);
            setFilteredProducts(response.data.products);
         } catch (error) {
            console.error("error fetching products", error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchProducts();
   }, []);

   const searchProducts = (q: string) => {
      const query = q.trim().toLowerCase();
      const matchQuery = (str: string) => str.toLowerCase().includes(query);

      if (!query) {
         setFilteredProducts(products);
         return;
      }

      const filteredProducts = products.filter((product) => {
         return (
            matchQuery(product.title) ||
            matchQuery(product.stock.toString()) ||
            matchQuery(product.price.toString()) || // Mengonversi number ke string
            matchQuery(product.rating.toString()) || // Mengonversi number ke string
            matchQuery(product.discountPercentage.toString()) || // Mengonversi number ke string
            matchQuery(product.category) ||
            matchQuery(product.availabilityStatus)
         )
      });

      setFilteredProducts(filteredProducts);
   };

   const bookMark = async (product: Products) => {
      setBookmarkedProducts((prev) => [...prev, product]);
   };

   return (
      <ProductsContext.Provider
         value={{
            products,
            filteredProducts,
            bookMark,
            selectedCategory,
            setSelectedCategory,
            isLoading,
            searchProducts,
            bookmarkedIds
         }}
      >
         {children}
      </ProductsContext.Provider>
   );
};

export const useProducts = () => useContext(ProductsContext)!;
