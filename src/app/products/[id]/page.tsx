import { getData } from "@/app/helpers";
import Container from "@/components/Container";
import ProductImages from "@/components/ProductImages";
import React from "react";
import { ProductType } from "../../../../type";
interface Props {
  params: {
    id: string;
  };
}

const SingleProductPage = async ({ params }: Props) => {
  const { id } = params;
  const endpoint = `https://dummyjson.com/products/${id}`;
  const product: ProductType = await getData(endpoint);

  return (
    <Container className="py-5 flex flex-col md:flex-row items-start justify-between gap-x-10">
      <ProductImages images={product?.images} />
      <div className="w-full md:w-1/2">
        <p className="text-sm capitalize font-medium tracking-wide">
          {product?.category}
        </p>
        <h1 className="text-2xl font-bold font-bodyFont">{product?.title}</h1>
      </div>
    </Container>
  );
};

export default SingleProductPage;
