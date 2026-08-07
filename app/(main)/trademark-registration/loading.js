export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
        <div className="h-14 w-36 animate-pulse rounded-xl bg-white/80" />
        <div className="h-11 w-32 animate-pulse rounded-xl bg-primary-theme/30" />
      </header>
      <section className="mx-auto flex max-w-5xl flex-col items-center px-5 pb-20 pt-14 text-center">
        <div className="h-12 w-full max-w-3xl animate-pulse rounded-2xl bg-white/80" />
        <div className="mt-4 h-10 w-full max-w-xl animate-pulse rounded-2xl bg-primary-theme/25" />
        <div className="mt-8 h-5 w-full max-w-2xl animate-pulse rounded-lg bg-white/70" />
        <div className="mt-14 h-16 w-full max-w-sm animate-pulse rounded-xl bg-primary-theme/40" />
      </section>
    </main>
  );
}
