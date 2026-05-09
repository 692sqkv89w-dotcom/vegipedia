import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Vegetable } from "../types/vegetable";
import { vegetables } from "./data/vegetables";
import { VegetableCard } from "./components/VegetableCard";
import { VegetableDetailModal } from "./components/VegetableDetailModal";

function normalize(s: string): string {
  return s.trim().toLowerCase();
}

function matchesQuery(v: Vegetable, q: string): boolean {
  if (!q) return true;
  const n = normalize(q);
  return (
    normalize(v.名前).includes(n) ||
    normalize(v.科).includes(n) ||
    normalize(v.説明).includes(n)
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Vegetable | null>(null);

  const filtered = useMemo(
    () => vegetables.filter((v) => matchesQuery(v, query)),
    [query],
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-stone-50">
      <header className="border-b border-emerald-900/10 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <h1 className="text-xl font-semibold tracking-tight text-emerald-950 sm:text-2xl">
            野菜リスト解説
          </h1>
        </div>
      </header>

      <div className="pointer-events-none fixed right-4 top-4 z-40 sm:right-6 sm:top-6">
        <label className="pointer-events-auto flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white/95 px-3 py-2 shadow-lg shadow-emerald-950/10 backdrop-blur-md sm:px-4">
          <Search
            className="h-4 w-4 shrink-0 text-emerald-700"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="名前・科・説明で検索"
            autoComplete="off"
            className="w-[min(52vw,220px)] bg-transparent text-sm text-emerald-950 placeholder:text-emerald-800/45 focus:outline-none sm:w-56"
            aria-label="検索（名前・科・説明）"
          />
        </label>
      </div>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6">
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-emerald-900/75">
          科・属・語源・説明から野菜を検索できます。カードを選ぶと詳細が開きます。
        </p>

        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-emerald-800/25 bg-white/60 px-6 py-12 text-center text-emerald-900/70">
            「{query}」に一致する野菜がありません。
          </p>
        ) : (
          <>
            <p className="mb-4 text-sm text-emerald-800/65">
              {filtered.length} 件を表示
            </p>
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-6 xl:grid-cols-4">
              {filtered.map((v) => (
                <li key={v.id}>
                  <VegetableCard vegetable={v} onOpen={setSelected} />
                </li>
              ))}
            </ul>
          </>
        )}
      </main>

      <VegetableDetailModal
        vegetable={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
