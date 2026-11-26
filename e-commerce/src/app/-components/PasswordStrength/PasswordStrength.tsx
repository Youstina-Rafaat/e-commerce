function getStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Weak", color: "bg-red-500" };
  if (score <= 3) return { score, label: "Medium", color: "bg-yellow-500" };
  return { score, label: "Strong", color: "bg-green-600" };
}

export default function PasswordStrength({ password }: { password: string }) {
  const strength = getStrength(password);

  return (
    <>
      <div className="mt-1 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full transition-all ${strength.color}`}
            style={{ width: `${(strength.score / 4) * 100}%` }}
          />
        </div>
        <span className="w-14 text-right text-sm text-gray-500">
          {password ? strength.label : "Weak"}
        </span>
      </div>
      <p className="text-xs text-gray-500">
        Must be at least 8 characters with numbers and symbols
      </p>
    </>
  );
}