import type { Vegetable } from "../../types/vegetable";

type Props = {
  vegetable: Vegetable;
  onOpen: (v: Vegetable) => void;
};

export function VegetableCard({ vegetable, onOpen }: Props) {
  return (
    <button
      type="button"
      onClick={() => onOpen(vegetable)}
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-emerald-900/10 bg-white text-left shadow-sm ring-emerald-600/0 transition hover:border-emerald-700/25 hover:shadow-lg hover:ring-2 hover:ring-emerald-600/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-emerald-950/5">
        <img
          src={vegetable.画像URL}
          alt=""
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-1 px-4 pb-4 pt-3">
        <h2 className="line-clamp-2 text-base font-semibold text-emerald-950">
          {vegetable.名前}
        </h2>
        <p className="text-sm text-emerald-800/75">{vegetable.属}</p>
      </div>
    </button>
  );
}
