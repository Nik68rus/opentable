import React from "react";

interface Props {
  name: string
}

const Header = ({name}: Props) => {
  const renderTitle = () => {
    const words = name.split("-");
    words[words.length - 1] = `(${words[words.length - 1]})`;
    return words.join(" ");
  }

  return (
    <div className="h-96 overflow-hidden">
      <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
        <h1 className="text-7xl text-white capitalize text-shadow text-center">
          {renderTitle()}
        </h1>
      </div>
    </div>
  );
};

export default Header;
