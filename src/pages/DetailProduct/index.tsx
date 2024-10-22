import { Card } from "@/components/ui/card";
import Layout from "@/components/ui/layout";
import { useProducts } from "@/context/ProductsContext";
import { useParams } from "react-router-dom";
import Rating from "../../lib/Rating";
import { formatAmount } from "@/lib/formatAmount";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { DetailSkeleton } from "@/components/ui/skeleton";

const DetailProduct = () => {
   const { id } = useParams();
   const { products, isLoading, bookmarkedIds, setBookmarkedIds, toggleBookmark } = useProducts();
   const product = products.find((item) => item.id === Number(id));

   useEffect(() => {
      const storedBookmarkedIds = localStorage.getItem("bookmarkedIds");
      if (storedBookmarkedIds) {
         setBookmarkedIds(JSON.parse(storedBookmarkedIds));
      }
   }, []);

   if (isLoading) {
      return <DetailSkeleton />;
   }

   const isBookmarked = bookmarkedIds.includes(product?.id!);

   const menus = [
      {
         label: "Detail Product",
         active: true,
      },
   ];

   return (
      <Layout submenus={menus}>
         <Card className="w-4/5 m-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 justify-between">
               <img
                  src={product?.images}
                  alt=""
                  className="w-full object-contain h-96"
               />

               <div className="flex flex-col gap-y-4 p-6">
                  <p className="font-medium capitalize text-2xl">{product?.title}</p>

                  <div className="flex justify-between">
                     <div className="flex gap-2 items-center text-sm">
                        <Rating rating={product?.rating!} />
                        <div className="text-[12px] mt-1">{product?.rating}</div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-medium text-black text-xs mt-2">
                     <div className="capitalize w-fit h-fit bg-gray-300 rounded-xl px-4 py-1">
                        #{product?.category}
                     </div>
                     <div className="w-fit h-fit bg-gray-300 rounded-xl px-4 py-1">
                        {product?.brand}
                     </div>
                     <div className="w-fit h-fit bg-gray-300 rounded-xl px-4 py-1">
                        {product?.sku}
                     </div>
                  </div>

                  <p className="text-sm my-3">{product?.description}</p>

                  <div className="w-5/6">
                     <div className="grid grid-cols-1 gap-y-3 md:grid-cols-2 items-center">
                        <div className="font-medium text-3xl">
                           {formatAmount(product?.price!)}
                        </div>
                        <div className="text-sm">
                           {product?.discountPercentage}% Discount
                        </div>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 items-center text-sm mt-3 text-black">
                        {/* <span>Item Quantity</span> */}
                        <span>
                           <span className="text-gray-500">Available </span>
                           <span className="text-black font-medium">
                              {product?.stock}
                           </span>{" "}
                           <span className="text-gray-500">
                              ({product?.availabilityStatus})
                           </span>
                        </span>
                     </div>
                  </div>

                  <Button
                     className="mt-4"
                     onClick={() => toggleBookmark(product!)}
                     disabled={isBookmarked}
                  >
                     {bookmarkedIds.includes(product?.id!)
                        ? "Add to Wishlist"
                        : "Add to Wishlist"}
                  </Button>
               </div>
            </div>
         </Card>
      </Layout>
   );
};

export default DetailProduct;
