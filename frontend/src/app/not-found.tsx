import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-[90vh] text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="mt-4 text-lg">Page Not Found</p>
        <Link className="mt-6 inline-block px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
          href="/"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
