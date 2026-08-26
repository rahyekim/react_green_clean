'use client'
import Image from "next/image";
import MainCarousel from "@/components/MainCarousel";
import RollingBanner from "@/components/RollingBanner";
import CategoryNav from "@/components/CategoryNav";

export default function Home() {
  return (
    <>
    <MainCarousel/>
    <RollingBanner/>
    <CategoryNav/>
    </>
  );
}
