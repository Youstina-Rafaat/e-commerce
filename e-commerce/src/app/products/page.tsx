import { LuPackageOpen } from "react-icons/lu";
import { FeaturedProducts } from "../-components/FeaturedProducts/FeaturedProducts";
import PageHeader from "../-components/PageHeader/PageHeader";

export default function page() {
  return (
    <>
      <PageHeader
  icon={<LuPackageOpen />}
  tag={[{ label: "All Products" }]}
  title="All Products"
  description="Explore our complete product collection"
/>
<div className="mx-auto container px-4 py-10">
        <FeaturedProducts/>
        </div>
    </>
  )
}
