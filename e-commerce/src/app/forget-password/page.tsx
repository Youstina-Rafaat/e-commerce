import ResetHero from "@/app/-components/ResetHero/ResetHero";
import ForgetPasswordFlow from "@/app/-components/ForgetPasswordFlow/ForgetPasswordFlow";

export default function ForgetPasswordPage() {
  return (
    <section className="mx-auto container px-4 py-12">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <ResetHero />

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <ForgetPasswordFlow />
        </div>
      </div>
    </section>
  );
}