# My Dukan

Affiliate e-commerce frontend built with Next.js 14 (App Router) and Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Product detail pages live at `/product/[id]`, e.g.
`/product/wireless-anc-headphones`.

## Structure

```
app/
  layout.tsx              Root layout: fonts, Header, CategoryNav, Footer
  page.tsx                Homepage: banner, promo grid, carousels
  loading.tsx             Homepage skeleton (Next.js streaming loading state)
  product/[id]/
    page.tsx              Product Detail Page (gallery, details, buy box)
    loading.tsx           PDP skeleton
    not-found.tsx          Shown for unknown product ids
components/
  Header.tsx               Top bar: logo, deliver-to, search + category dropdown, wishlist
  CategoryNav.tsx          Secondary nav with hover mega-menus
  BannerSlider.tsx         Auto-rotating offer slider
  PromoGrid.tsx             "Up to 60% off / Best Sellers / Under ₹499" tiles
  ProductCarousel.tsx      Horizontal scrolling carousel with arrow controls
  ProductCard.tsx          Card: hover-zoom image, badges, rating, price, CTA
  ImageGallery.tsx         PDP gallery with thumbnail selector + hover zoom
  BuyBox.tsx               Sticky buy box with stock status + affiliate CTA
  RatingStars.tsx          Star rating renderer
  Footer.tsx               Footer with Amazon Associates disclosure
  Skeletons.tsx            Shimmer loading skeletons
data/
  products.ts              Mock product data + types (swap for a real data source)
```

## Notes on the affiliate requirements

- Every "Buy on Amazon" / "View Deal" link uses
  `target="_blank" rel="noopener noreferrer sponsored"`.
- The required disclosure — *"As an Amazon Associate, My Dukan earns from qualifying
  purchases."* — appears in the Buy Box on every product page and in the site footer.
- `data/products.ts` uses placeholder `amazon.in/dp/EXAMPLE...?tag=mydukan-21` links —
  replace `EXAMPLE...` and the `tag` with your real ASINs and Associates tag.

## Swapping in real data

Replace the contents of `data/products.ts` with a fetch from your product feed / CMS /
database. Every component consumes the `Product` type from that file, so as long as the
shape matches, no other file needs to change.

## Performance & accessibility

- Images use `next/image` with responsive `sizes` for fast, right-sized loads.
- Route-level `loading.tsx` files stream in skeletons automatically during navigation.
- Visible focus rings, `prefers-reduced-motion` support, and semantic landmarks are
  included in `app/globals.css`.
- Fully responsive from 360px mobile up through desktop (see `md:` / `lg:` breakpoints
  throughout).
