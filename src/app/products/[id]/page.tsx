import { paymentImage } from "@/assets";
import Container from "@/components/Container";
import Image from "next/image";
import { FaRegEye } from "react-icons/fa";
import { MdStar } from "react-icons/md";
import { getData } from "../../helpers"; // ✅ absolute path
import ProductImage from "@/components/cart/ProductImage";
import PriceTag from "@/components/cart/Pricetag";
import PriceFormat from "@/components/PriceFormat";
import AddToCartButton from "@/components/AddToCartButton";
import { ProductType } from "../../../../type";

export const metadata = {
  title: "Product page | Your shopping center",
  description: "An amazon clone application for education purpose",
};

interface Props {
  params: {
    id: string;
  };
}

export default async function SingleProductPage({ params }: Props) {
  const { id } = params;

  // ✅ Fetch product data dynamically (SSR)
  const endpoint = `https://dummyjson.com/products/${id}`;
  const product = await getData(endpoint);

  if (!product || !product.id) {
    return (
      <Container className="py-10 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Product not found 😢
        </h2>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* 🖼️ Product Image */}
        <div>
          <ProductImage product={product} />
        </div>

        {/* 📦 Product Details */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">{product?.title}</h2>

          {/* ⭐ Ratings and Price */}
          <div className="flex items-center justify-between">
            <PriceTag
              regularPrice={product?.price + product?.discountPercentage / 100}
              discountedPrice={product?.price - product?.discountPercentage / 100}
            />

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => {
                const filled = index + 1 <= Math.floor(product?.rating);
                const halfFilled =
                  index + 1 > Math.floor(product?.rating) &&
                  index < Math.ceil(product?.rating);
                return (
                  <MdStar
                    key={index}
                    className={`${
                      filled
                        ? "text-orange-600"
                        : halfFilled
                        ? "text-orange-500"
                        : "text-orange-300"
                    }`}
                  />
                );
              })}
              <p className="text-base font-semibold ml-1">
                ({product?.rating?.toFixed(1)} reviews)
              </p>
            </div>
          </div>

          {/* 👁️ View Count */}
          <p className="flex items-center">
            <FaRegEye className="mr-1" />{" "}
            <span className="font-semibold mr-1">250+</span> people are viewing
            this right now
          </p>

          {/* 💸 Discount info */}
          <p>
            You are saving{" "}
            <span className="text-base font-semibold text-green-500">
              <PriceFormat amount={product?.discountPercentage / 100} />
            </span>{" "}
            upon purchase
          </p>

          {/* 📝 Description */}
          <div>
            <p className="text-sm tracking-wide">{product?.description}</p>
            {product?.warrantyInformation && (
              <p className="text-base">{product?.warrantyInformation}</p>
            )}
          </div>

          <p>
            Brand: <span className="font-medium">{product?.brand}</span>
          </p>

          <p>
            Category:{" "}
            <span className="font-medium capitalize">{product?.category}</span>
          </p>

          {/* 🏷️ Tags */}
          {product?.tags && (
            <p>
              Tags:{" "}
              {product?.tags?.map((item: string, index: number) => (
                <span key={index} className="font-medium capitalize">
                  {item}
                  {index < product?.tags?.length - 1 && ", "}
                </span>
              ))}
            </p>
          )}

          {/* 🛒 Add To Cart */}
          <AddToCartButton
            product={product}
            className="rounded-md uppercase font-semibold"
          />

          {/* 💳 Payment Section */}
          <div className="bg-[#f7f7f7] p-5 rounded-md flex flex-col items-center justify-center gap-2">
            <Image
              src={paymentImage}
              alt="payment"
              className="w-auto object-cover"
            />
            <p className="font-semibold">Guaranteed safe & secure checkout</p>
          </div>
        </div>

        {/* 💬 Review Section */}
        {product?.reviews && product.reviews.length > 0 && (
          <div className="bg-cartBg gap-5 md:flex md:col-span-2 p-5">
            {product?.reviews?.map((item: any, i: number) => (
              <div
                key={i}
                className="bg-white p-5 border border-black rounded-md w-full md:w-1/2"
              >
                <p className="font-bold">{item.comment}</p>
                <p className="font-semibold">{item.reviewerName}</p>
                <p className="text-sm text-gray-600">{item.reviewerEmail}</p>

                <div className="text-base text-lightText flex items-center mt-2">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const filled = index + 1 <= Math.floor(item?.rating);
                    const halfFilled =
                      index + 1 > Math.floor(item?.rating) &&
                      index < Math.ceil(item?.rating);

                    return (
                      <MdStar
                        key={index}
                        className={`${
                          filled
                            ? "text-orange-400"
                            : halfFilled
                            ? "text-orange-200"
                            : "text-gray-300"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
