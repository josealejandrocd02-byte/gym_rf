import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/rf-logo.png";
import { GYM_ADDRESS, GYM_EMAIL, WHATSAPP_NUMBER } from "@/lib/store";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="RF Gym" width={40} height={40} className="h-10 w-10 object-contain" />
            <span className="font-display text-xl tracking-widest">RF <span className="text-primary">GYM</span></span>
          </div>
          <p className="text-sm text-muted-foreground">Transforma tu cuerpo, supera tus límites. Comunidad fitness premium.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 text-primary">Contacto</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><Phone className="h-4 w-4 text-primary" /> +{WHATSAPP_NUMBER}</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 text-primary" /> {GYM_EMAIL}</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-primary" /> {GYM_ADDRESS}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 text-primary">Horarios</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>Lun - Vie: 5:00 - 23:00</li>
            <li>Sáb: 7:00 - 21:00</li>
            <li>Dom: 8:00 - 14:00</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 text-primary">Síguenos</h4>
          <div className="flex gap-3">
            {[Instagram, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="p-2 rounded-lg bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary hover:scale-110 transition-all">
                <Icon className="h-5 w-5" />
              </a>
            ))}
            <a href="#" aria-label="TikTok" className="p-2 rounded-lg bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary hover:scale-110 transition-all">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.74a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.17z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} RF GYM. Todos los derechos reservados.
      </div>
    </footer>
  );
}
