import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/store";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hola RF Gym, quiero más información")}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow animate-glow hover:scale-110 transition-transform"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
