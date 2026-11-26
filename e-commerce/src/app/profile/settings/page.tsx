import { LuLock } from "react-icons/lu";
import ChangePasswordForm from "@/app/-components/ChangePasswordForm/ChangePasswordForm";

export default function SettingsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>
      <p className="mt-1 text-sm text-gray-500">Change your account password</p>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-600">
            <LuLock />
          </span>
          <div>
            <h3 className="font-semibold text-gray-800">Change Password</h3>
            <p className="text-sm text-gray-500">Update your account password</p>
          </div>
        </div>

        <ChangePasswordForm />
      </div>
    </div>
  );
}