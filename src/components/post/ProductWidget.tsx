import { blogConfig } from '@/lib/blogConfig';

export default function ProductWidget() {
  const { product } = blogConfig;

  if (!product.name || !product.url) return null;

  return (
    <div className="mt-5 rounded-lg border border-[var(--color-border)] p-4">
      <p className="text-xs font-semibold text-[var(--color-text-light)] mb-3">
        요즘 쓰는 것들
      </p>
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-sm text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
      >
        <span>{product.name}</span>
      </a>
    </div>
  );
}
