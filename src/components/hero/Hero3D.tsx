import { ClientOnly } from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const CrystalScene = lazy(() => import("./CrystalScene"));

export function Hero3D() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <ClientOnly fallback={null}>
        <Suspense fallback={null}>
          <CrystalScene />
        </Suspense>
      </ClientOnly>
    </div>
  );
}
