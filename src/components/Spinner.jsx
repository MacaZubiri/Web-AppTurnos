
export default function Spinner({ size = 12, color = "blue-500" }) {
  return (
    <div
      className={`w-${size} h-${size} border-4 border-gray-200 border-t-${color} rounded-full animate-spin`}
    ></div>
  );
}