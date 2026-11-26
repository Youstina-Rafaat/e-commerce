import { LuPackage } from "react-icons/lu";
import LoadingBanner from "@/app/-components/LoadingBanner/LoadingBanner";
import PageLoader from "@/app/-components/PageLoader/PageLoader";

export default function Loading() {
  return (
    <>
      <LoadingBanner
        breadcrumb="All Products"
        title="All Products"
        subtitle="Explore our complete product collection"
        icon={<LuPackage />}
      />
      <PageLoader text="Loading products..." />
    </>
  );
}