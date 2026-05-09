import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import type { Vegetable } from "../../types/vegetable";

type Props = {
  vegetable: Vegetable | null;
  onClose: () => void;
};

export function VegetableDetailModal({ vegetable, onClose }: Props) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!vegetable) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [vegetable, onClose]);

  if (!vegetable) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
    >
      <button
        type="button"
        aria-label="閉じる（背景）"
        className="modal-overlay-enter absolute inset-0 bg-black/65 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="modal-panel-enter relative z-10 flex h-full min-h-0 w-full max-h-full flex-col overflow-hidden bg-white shadow-2xl sm:h-auto sm:max-h-[90vh] sm:max-w-lg sm:rounded-lg"
      >
        <div className="relative shrink-0 border-b border-neutral-200">
          <div className="aspect-video max-h-[38vh] w-full overflow-hidden bg-neutral-100 sm:max-h-[40vh]">
            <img
              src={vegetable.画像URL}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="閉じる"
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900/70 text-white transition hover:bg-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X className="h-5 w-5" strokeWidth={2} aria-hidden />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-10 pt-6 sm:px-6">
          <p className="text-xs text-neutral-500">
            {vegetable.科} / {vegetable.属}
          </p>
          <h2
            id={titleId}
            className="mt-2 text-xl font-semibold text-neutral-900"
          >
            {vegetable.名前}
          </h2>

          <div className="mt-8 space-y-8 border-t border-neutral-200 pt-8">
            <div>
              <h3 className="text-sm font-semibold text-neutral-600">語源</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-800">
                {vegetable.語源}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-600">説明</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-800">
                {vegetable.説明}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
