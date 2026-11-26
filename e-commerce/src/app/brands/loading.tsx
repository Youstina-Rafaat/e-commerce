import { LuTag } from "react-icons/lu";
import LoadingBanner from "@/app/-components/LoadingBanner/LoadingBanner";
import PageLoader from "@/app/-components/PageLoader/PageLoader";

export default function Loading() {
  return (
    <>
      <LoadingBanner
        color="purple"
        breadcrumb="Brands"
        title="Top Brands"
        subtitle="Shop from your favorite brands"
        icon={<LuTag />}
      />
      <PageLoader text="Loading brands..." color="purple" />
    </>
  );
}