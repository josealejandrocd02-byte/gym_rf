import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Dumbbell, Users, Heart, Trophy, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { GYM_ADDRESS, GYM_EMAIL, WHATSAPP_NUMBER, whatsappLink } from "@/lib/store";
import heroImg from "@/assets/hero-gym.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RF Gym — Transforma tu cuerpo, supera tus límites" },
      { name: "description", content: "Gimnasio fitness premium. Equipos de última generación, entrenadores expertos y comunidad que te impulsa." },
    ],
  }),
  component: HomePage,
});

const features = [
  { icon: Dumbbell, title: "Equipos Premium", text: "Maquinaria de última generación para todos los niveles." },
  { icon: Users, title: "Comunidad Fuerte", text: "Entrena rodeado de personas con tus mismos objetivos." },
  { icon: Heart, title: "Salud y Bienestar", text: "Programas diseñados para tu cuerpo y mente." },
  { icon: Trophy, title: "Resultados Reales", text: "Coaches certificados que te llevan a la siguiente etapa." },
];

function HomePage() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img src={heroImg} alt="RF Gym" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-radial-red opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-primary border border-primary/40 rounded-full mb-6 glass">
              Fitness Premium · Bolivia
            </span>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.95] mb-6">
              Transforma tu cuerpo<br />
              <span className="text-gradient-red">supera tus límites</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Únete a RF GYM, donde la disciplina se convierte en estilo de vida. Equipo de élite, entrenadores expertos, resultados reales.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={whatsappLink("Hola RF Gym, quiero más información")}
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-7 py-4 rounded-lg font-semibold uppercase tracking-wider shadow-glow hover:scale-105 transition-transform"
              >
                Contáctanos ahora <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#nosotros" className="inline-flex items-center gap-2 glass border border-border text-foreground px-7 py-4 rounded-lg font-semibold uppercase tracking-wider hover:border-primary transition-colors">
                Conocer más
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary uppercase tracking-[0.3em] text-xs">Nosotros</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3">Más que un gimnasio<br /><span className="text-gradient-red">una forma de vida</span></h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              En RF Gym fusionamos entrenamiento de alto rendimiento, salud integral y una comunidad apasionada por el fitness.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 hover-lift"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 shadow-glow">
                  <f.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* UBICACIÓN */}
      <section className="py-24 px-4 sm:px-6 bg-surface">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-primary uppercase tracking-[0.3em] text-xs">Ubicación</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3 mb-6">Encuéntranos<br /><span className="text-gradient-red">en el corazón de la ciudad</span></h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="flex gap-3"><MapPin className="h-5 w-5 text-primary mt-1 shrink-0" /> {GYM_ADDRESS}</p>
              <p className="flex gap-3"><Phone className="h-5 w-5 text-primary mt-1 shrink-0" /> +{WHATSAPP_NUMBER}</p>
              <p className="text-sm">A pocas cuadras del segundo anillo. Estacionamiento privado.</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border shadow-card aspect-video">
            <iframe
              title="Mapa RF Gym"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3823.7!2d-63.18!3d-17.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDQ2JzQ4LjAiUyA2M8KwMTAnNDguMCJX!5e0!3m2!1sen!2s!4v1700000000000"
              className="w-full h-full grayscale-[60%] contrast-125"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto glass rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-red opacity-50" />
          <div className="relative">
            <span className="text-primary uppercase tracking-[0.3em] text-xs">Contacto</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3 mb-6">¿Listo para comenzar?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Escríbenos por WhatsApp y un asesor te ayudará a elegir el plan perfecto para ti.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="inline-flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4 text-primary" /> +{WHATSAPP_NUMBER}</span>
              <span className="inline-flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4 text-primary" /> {GYM_EMAIL}</span>
            </div>
            <a
              href={whatsappLink("Hola RF Gym, quiero información de los planes")}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold uppercase tracking-wider shadow-glow hover:scale-105 transition-transform"
            >
              <MessageCircle className="h-5 w-5" /> Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
