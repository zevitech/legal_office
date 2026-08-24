import Link from "next/link";

const FunnelShell = ({ children }) => (
  <main className="min-h-screen bg-slate-50">
    <header data-customizer-form="header" className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-[92%] max-w-6xl items-center justify-between gap-4 py-3 sm:py-4">
        <Link href="/" className="font-inria text-base font-bold text-slate-900 sm:text-xl">
          Legal Trademark Office<span className="text-primary-theme">®</span>
        </Link>
        <div className="text-right">
          <p className="hidden text-xs text-slate-500 sm:block">Questions? Speak with us</p>
          <a href="tel:+13104244909" className="whitespace-nowrap text-sm font-semibold text-slate-800 sm:text-base">
            +1 (310) 424-4909
          </a>
        </div>
      </div>
    </header>
    {children}
    <footer data-customizer-form="footer" className="mt-10 border-t border-slate-200 bg-white sm:mt-16">
      <div className="mx-auto flex w-[92%] max-w-6xl flex-col gap-3 py-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <p>Independent filing support service. Not affiliated with the USPTO.</p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/refund-policy">Refund policy</Link>
        </nav>
      </div>
    </footer>
  </main>
);

export default FunnelShell;
