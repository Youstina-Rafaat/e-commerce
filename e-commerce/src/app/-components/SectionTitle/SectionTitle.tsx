
export default function SectionTitle({ text, highlight }: { text: string; highlight: string }) {
  return (
    <h2 className="border-s-4 border-green-600 ps-3 text-2xl font-bold text-gray-800 md:text-3xl">
      {text} <span className="text-green-600">{highlight}</span>
    </h2>
  );
}