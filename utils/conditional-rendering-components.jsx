"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ConditonalRenderingComponents = ({ RenderingPathnames, Components }) => {
  const [showComponent, setShowComponent] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (RenderingPathnames.includes(pathname)) {
      setShowComponent(false);
    } else {
      setShowComponent(true);
    }
  }, [pathname, RenderingPathnames]);

  return <>{showComponent && Components}</>;
};

export default ConditonalRenderingComponents;
