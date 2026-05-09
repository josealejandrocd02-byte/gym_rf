import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LogOut, Plus, Pencil, Trash2, Lock } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useStore, type Product, type Promotion } from "@/lib/store";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — RF Gym" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const { isAuthed, login, logout } = useStore();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  if (!isAuthed) {
    return (
      <Layout>
        <section className="min-h-[80vh] flex items-center justify-center px-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!login(u, p)) setErr("Credenciales incorrectas");
            }}
            className="glass rounded-2xl p-8 w-full max-w-md space-y-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Lock className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-2xl">Panel Admin</h1>
                <p className="text-xs text-muted-foreground">Acceso restringido</p>
              </div>
            </div>
            <Field label="Usuario" value={u} onChange={setU} />
            <Field label="Contraseña" type="password" value={p} onChange={setP} />
            {err && <p className="text-sm text-destructive">{err}</p>}
            <button className="w-full bg-gradient-primary text-primary-foreground py-3 rounded-lg font-semibold uppercase tracking-wider shadow-glow hover:scale-[1.02] transition-transform">
              Ingresar
            </button>
            <p className="text-xs text-muted-foreground text-center">Demo: admin / 123456</p>
          </form>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-4xl">Dashboard <span className="text-gradient-red">Admin</span></h1>
            <p className="text-muted-foreground text-sm mt-1">Gestiona productos y promociones.</p>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary text-sm">
            <LogOut className="h-4 w-4" /> Salir
          </button>
        </div>
        <ProductsAdmin />
        <div className="h-12" />
        <PromotionsAdmin />
      </section>
    </Layout>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full bg-input border border-border rounded-lg px-4 py-2.5 text-foreground focus:border-primary focus:outline-none"
      />
    </label>
  );
}

function ProductsAdmin() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", price: "", image: "" });

  function reset() { setEditing(null); setForm({ name: "", price: "", image: "" }); }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const data = { name: form.name, price: Number(form.price), image: form.image };
    if (editing) updateProduct({ ...editing, ...data });
    else addProduct(data);
    reset();
  }

  return (
    <div>
      <h2 className="font-display text-2xl mb-4">Productos</h2>
      <form onSubmit={submit} className="glass rounded-2xl p-5 grid gap-4 sm:grid-cols-4 mb-6">
        <Field label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Field label="Precio (Bs)" value={form.price} onChange={(v) => setForm({ ...form, price: v })} />
        <Field label="Imagen URL" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
        <div className="flex items-end gap-2">
          <button className="flex-1 inline-flex items-center justify-center gap-1 bg-gradient-primary text-primary-foreground py-2.5 rounded-lg font-semibold uppercase tracking-wider text-sm">
            <Plus className="h-4 w-4" /> {editing ? "Actualizar" : "Agregar"}
          </button>
          {editing && <button type="button" onClick={reset} className="px-4 py-2.5 rounded-lg border border-border text-sm">X</button>}
        </div>
      </form>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="glass rounded-xl p-4 flex gap-3">
            <img src={p.image} alt={p.name} className="h-20 w-20 object-cover rounded-lg bg-secondary" />
            <div className="flex-1 min-w-0">
              <h3 className="truncate">{p.name}</h3>
              <p className="text-primary font-display">Bs. {p.price}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => { setEditing(p); setForm({ name: p.name, price: String(p.price), image: p.image }); }} className="p-1.5 rounded border border-border hover:border-primary"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => deleteProduct(p.id)} className="p-1.5 rounded border border-border hover:border-destructive text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PromotionsAdmin() {
  const { promotions, addPromotion, updatePromotion, deletePromotion } = useStore();
  const [editing, setEditing] = useState<Promotion | null>(null);
  const [form, setForm] = useState({ name: "", price: "", duration: "", expiresAt: "", image: "" });

  function reset() { setEditing(null); setForm({ name: "", price: "", duration: "", expiresAt: "", image: "" }); }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const data = { name: form.name, price: Number(form.price), duration: form.duration, expiresAt: form.expiresAt, image: form.image };
    if (editing) updatePromotion({ ...editing, ...data });
    else addPromotion(data);
    reset();
  }

  return (
    <div>
      <h2 className="font-display text-2xl mb-4">Promociones</h2>
      <form onSubmit={submit} className="glass rounded-2xl p-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-6 mb-6">
        <Field label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Field label="Precio (Bs)" value={form.price} onChange={(v) => setForm({ ...form, price: v })} />
        <Field label="Duración" value={form.duration} onChange={(v) => setForm({ ...form, duration: v })} />
        <Field label="Hasta" type="date" value={form.expiresAt} onChange={(v) => setForm({ ...form, expiresAt: v })} />
        <Field label="Imagen URL" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
        <div className="flex items-end gap-2">
          <button className="flex-1 inline-flex items-center justify-center gap-1 bg-gradient-primary text-primary-foreground py-2.5 rounded-lg font-semibold uppercase tracking-wider text-sm">
            <Plus className="h-4 w-4" /> {editing ? "OK" : "Add"}
          </button>
          {editing && <button type="button" onClick={reset} className="px-4 py-2.5 rounded-lg border border-border text-sm">X</button>}
        </div>
      </form>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {promotions.map((p) => (
          <div key={p.id} className="glass rounded-xl p-4 flex gap-3">
            <img src={p.image} alt={p.name} className="h-20 w-20 object-cover rounded-lg bg-secondary" />
            <div className="flex-1 min-w-0">
              <h3 className="truncate">{p.name}</h3>
              <p className="text-primary font-display">Bs. {p.price}</p>
              <p className="text-xs text-muted-foreground">{p.duration} · hasta {p.expiresAt}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => { setEditing(p); setForm({ name: p.name, price: String(p.price), duration: p.duration, expiresAt: p.expiresAt, image: p.image }); }} className="p-1.5 rounded border border-border hover:border-primary"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => deletePromotion(p.id)} className="p-1.5 rounded border border-border hover:border-destructive text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
