import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useStore, whatsappLink } from "@/lib/store";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Productos — RF Gym" },
      { name: "description", content: "Suplementos, accesorios y equipamiento fitness premium en RF Gym." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { products } = useStore();

  return (
    <Layout>
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary uppercase tracking-[0.3em] text-xs">Tienda</span>
            <h1 className="font-display text-5xl sm:text-6xl mt-3">Productos <span className="text-gradient-red">RF Gym</span></h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Suplementos, accesorios y equipamiento seleccionados para llevarte al siguiente nivel.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group glass rounded-2xl overflow-hidden hover-lift"
              >
                <div className="aspect-square overflow-hidden bg-secondary">
                  <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg mb-2">{p.name}</h3>
                  <p className="text-2xl font-display text-primary mb-4">Bs. {p.price}</p>
                  <a
                    href={whatsappLink(`Hola, estoy interesado en este producto: ${p.name}`)}
                    target="_blank" rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold uppercase tracking-wider text-sm hover:scale-[1.02] transition-transform"
                  >
                    <MessageCircle className="h-4 w-4" /> Contactar
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
