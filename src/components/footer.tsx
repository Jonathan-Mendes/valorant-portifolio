export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 bg-black/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-white/60 md:flex-row">
        <p>© {new Date().getFullYear()} By Jonathan Mendes</p>

        <p className="text-white/40">Version 2.0</p>
      </div>
    </footer>
  );
}
