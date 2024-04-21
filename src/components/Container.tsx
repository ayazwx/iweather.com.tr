import React from "react";

interface Props {
  children: React.ReactNode;
  name?: string;
  width?: string;
  height?: string;
  flexDirect?: string;
  claNamess?: string;
}

const Container = ({ children, width="w-full",height="h-full", name, flexDirect="row", claNamess }: Props) => {
  return (
    <section className={`flex flex-${flexDirect} ${width} ${height} desk:overflow-y-auto gap-2  min-h-[70vh] relative py-4 mx-4 sm:flex-col sm:mx-0 justify-center items-center rounded-xl overflow-hidden text-white z-10 backdrop-filter backdrop-blur-lg bg-opacity-003 ${claNamess}`}>
      {
        name && <h1 className="absolute top-2 left-4 uppercase text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">{name}</h1>
      }
      {children}
    </section>
  );
};

export default Container;
