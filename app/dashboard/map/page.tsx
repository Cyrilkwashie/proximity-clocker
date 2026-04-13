"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("./_components/MapClient"), { ssr: false });

export default function MapPage() {
  return (
    <div className="-m-6 h-[calc(100vh-4rem)]">
      <MapClient />
    </div>
  );
}
