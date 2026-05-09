import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, MessageCircle, Lock } from "lucide-react";
import logo from "@/assets/rf-logo.png";
import { whatsappLink } from "@/lib/store";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/products", label: "Productos" },
  { to: "/promotions", label: "Promociones" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="RF Gym" width={40} height={40} className="h-10 w-10 object-contain" />
          <span className="font-display text-xl tracking-widest text-foreground group-hover:text-primary transition-colors">
            RF <span className="text-primary">GYM</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/#nosotros"
            className="text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            Nosotros
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink("Hola RF Gym, quiero más información")}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide shadow-glow hover:scale-105 transition-transform"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <Link
            to="/admin"
            aria-label="Acceso administrador"
            className="p-2 text-muted-foreground/40 hover:text-primary transition-colors"
          >
            <Lock className="h-4 w-4" />
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-foreground"
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border animate-fade-in">
          <nav className="flex flex-col p-4 gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-foreground hover:text-primary uppercase tracking-wider text-sm"
              >
                {l.label}
              </Link>
            ))}
            <a href="/#nosotros" onClick={() => setOpen(false)} className="py-2 text-foreground hover:text-primary uppercase tracking-wider text-sm">
              Nosotros
            </a>
            <a
              href={whatsappLink("Hola RF Gym, quiero más información")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
