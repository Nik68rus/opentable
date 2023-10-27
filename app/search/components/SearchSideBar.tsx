import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  locations: Location[];
  cusines: Cuisine[];
  searchParams: { city?: string; cusine?: string; price?: string };
}

const SearchSideBar = ({ locations, cusines, searchParams }: Props) => {
  const prices = [
    {
      price: PRICE.CHEAP,
      label: "$",
      className: "border w-full text-reg text-center font-light rounded-l p-2",
    },
    {
      price: PRICE.REGULAR,
      label: "$$",
      className: "border w-full text-reg text-center font-light p-2",
    },
    {
      price: PRICE.EXPENSIVE,
      label: "$$$",
      className: "border w-full text-reg text-center font-light rounded-r p-2",
    },
  ];

  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations.map((loc) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                city: loc.name,
              },
            }}
            key={loc.id}
            className="font-light text-reg capitalize"
          >
            {loc.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cusines.map((cusine) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                cuisine: cusine.name,
              },
            }}
            key={cusine.id}
            className="font-light text-reg capitalize"
          >
            {cusine.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({ price, label, className }) => (
            <Link
              key={price}
              className={className}
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  price: price,
                },
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
