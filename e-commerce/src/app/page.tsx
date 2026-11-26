import img1 from "../assets/images/home-slider-1.d79601a8.png";
import Features from "./-components/Features/Features";
import HomeCategory from "./-components/HomeCategory/HomeCategory";
import PromoBanners from "./-components/PromoBanners/PromoBanners";
import SectionTitle from "./-components/SectionTitle/SectionTitle";
import { FeaturedProducts } from "./-components/FeaturedProducts/FeaturedProducts";
import Newsletter from "./-components/Newsletter/Newsletter";
import Slider from "./-components/Slider/Slider";

export default function Home() {
  return (
    <main className="bg-gray-50">
      <Slider
  heightClass="h-100"
  listOfImages={[img1.src, img1.src, img1.src]}
  showContent
/>
      <Features />
      <HomeCategory />
      <PromoBanners />
      <section className="mx-auto container px-4 py-10">
        <div className="mb-6">
          <SectionTitle text="Featured" highlight="Products" />
        </div>
        <FeaturedProducts />
      </section>
      <Newsletter />
    </main>
  );
}
