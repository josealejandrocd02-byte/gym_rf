import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, Clock, Flame, MessageCircle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useStore, whatsappLink } from "@/lib/store";

export const Route = createFileRoute("/promotions")({
  head: () => ({
    meta: [
      { title: "Promociones — RF Gym" },
      { name: "description", content: "Planes y promociones exclusivas en RF Gym. Aprovecha y empieza hoy." },
    ],
  }),
  component: PromotionsPage,
});

function PromotionsPage() {
  const { promotions } = useStore();

  return (
    <Layout>
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-primary uppercase tracking-[0.3em] text-xs">
              <Flame className="h-4 w-4" /> Ofertas Exclusivas
            </span>
            <h1 className="font-display text-5xl sm:text-6xl mt-3">Promociones <span className="text-gradient-red">activas</span></h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Planes diseñados para que entrenes más por menos. Solo por tiempo limitado.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative rounded-2xl overflow-hidden border border-border bg-surface hover-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <span className="absolute top-4 left-4 bg-gradient-primary text-primary-foreground text-xs uppercase tracking-wider px-3 py-1.5 rounded-full font-semibold shadow-glow">
                    Oferta
                  </span>
                </div>
                <div className="p-6 -mt-12 relative">
                  <h3 className="font-display text-2xl mb-3">{p.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-display text-gradient-red">Bs. {p.price}</span>
                  </div>
                  <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                    <li className="flex gap-2"><Clock className="h-4 w-4 text-primary" /> Duración: {p.duration}</li>
                    <li className="flex gap-2"><Calendar className="h-4 w-4 text-primary" /> Disponible hasta: {new Date(p.expiresAt).toLocaleDateString("es-BO")}</li>
                  </ul>
                  <a
                    href={whatsappLink(`Hola, estoy interesado en la promoción: ${p.name}`)}
                    target="_blank" rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold uppercase tracking-wider text-sm hover:scale-[1.02] transition-transform"
                  >
                    <MessageCircle className="h-4 w-4" /> Contactar ahora
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
