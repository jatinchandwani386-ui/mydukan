import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display font-bold text-2xl text-ink">Product not found</h1>
      <p className="text-ink/60 mt-2">
        This deal may have expired or the link is incorrect.
      </p>
      <Link
        href="/"
        className="inline-block mt-6 bg-marigold hover:bg-marigold-dark text-indigo-dark font-semibold px-5 py-2.5 rounded-md transition-colors"
      >
        Back to homepage
      </Link>
    </div>
  );
}
