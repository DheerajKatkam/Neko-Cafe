"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageWithSkeleton({ skeletonClassName = "", alt, ...props }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${skeletonClassName}`}>
      {!loaded && <div className="skeleton absolute inset-0" aria-hidden="true" />}
      <Image
        alt={alt}
        {...props}
        onLoad={() => setLoaded(true)}
        className={`${props.className ?? ""} transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
