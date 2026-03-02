export default function SeQuote({ children }: { children: React.ReactNode }) {
    return (
        <blockquote className="blog-quote my-2.5 rounded-[4px] bg-[#e0f2fe] px-3 py-1.5 text-[15px] font-medium leading-[1.75] tracking-[-0.01em] text-[#202020]">
            {children}
        </blockquote>
    );
}
