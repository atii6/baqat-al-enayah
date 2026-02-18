import React from "react";
import Image from "next/image";

function LoaderLogo() {
  return (
    <div className="w-full h-full flex justify-center items-center bg-transparent">
      <div className="w-96 h-72">
        <Image
          src="/baqat_al_enayah_logo.png"
          alt="Logo"
          height={400}
          width={400}
          className="w-full h-full object-contain animate-bounce"
        />
      </div>
    </div>
  );
}

export default LoaderLogo;
