export default function Footer() {
  return (
    <footer className="bg-indigo-dark text-white/70 mt-12">
      <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
        <div>
          <p className="font-display font-bold text-white mb-3">Shop</p>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Electronics</a></li>
            <li><a href="#" className="hover:text-white">Fashion</a></li>
            <li><a href="#" className="hover:text-white">Home</a></li>
          </ul>
        </div>
        <div>
          <p className="font-display font-bold text-white mb-3">Help</p>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">FAQs</a></li>
          </ul>
        </div>
        <div>
          <p className="font-display font-bold text-white mb-3">About</p>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Our Story</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Use</a></li>
          </ul>
        </div>
        <div>
          <p className="font-display font-bold text-white mb-3">My Dukan</p>
          <p className="text-white/60 leading-relaxed">
            Curated deals from trusted retailers, updated every day.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-white/50 space-y-2">
          <p>
            As an Amazon Associate, My Dukan earns from qualifying purchases. Prices and
            availability are accurate as of the date/time indicated and are subject to change.
          </p>
          <p>&copy; {new Date().getFullYear()} My Dukan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
