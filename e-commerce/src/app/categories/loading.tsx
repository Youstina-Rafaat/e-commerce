import { LuLayoutGrid } from "react-icons/lu";
import LoadingBanner from "@/app/-components/LoadingBanner/LoadingBanner";
import PageLoader from "@/app/-components/PageLoader/PageLoader";

export default function Loading() {
  return (
    <>
      <LoadingBanner
        breadcrumb="Categories"
        title="All Categories"
        subtitle="Browse our wide range of product categories"
        icon={<LuLayoutGrid />}
      />
      <PageLoader text="Loading categories..." />
    </>
  );
}