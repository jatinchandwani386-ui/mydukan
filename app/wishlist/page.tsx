import Link from 'next/link';

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold mb-2">My Wishlist</h1>
      <p className="text-gray-500 mb-6">Aapki wishlist abhi khali hai.</p>
      <Link href="/" className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm">
        Shopping Jari Rakhein
      </Link>
    </div>
  );
}