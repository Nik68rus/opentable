import React from "react";

interface Props {
  items: string[]
}

const Images = ({items}: Props) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">{items.length} photo{items.length > 1 ? "s" : ""}</h1>
      <div className="flex flex-wrap">
        {items.map(item => <img
          // key={item}
          className="w-56 h-44 mr-1 mb-1"
          src={item}
          alt=""
        />)}
      </div>
    </div>
  );
};

export default Images;
