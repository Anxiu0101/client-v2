export function Footer() {
  return (
    <footer className="border-t border-border/40 mt-16">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>
            © 2026 Anxiu[Anxiu0101] |{' '}
            <a href="#" className="hover:opacity-60 transition-opacity">
              Theme
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:opacity-60 transition-opacity">
              Privacy
            </a>
            <span>·</span>
            <a href="#" className="hover:opacity-60 transition-opacity">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
