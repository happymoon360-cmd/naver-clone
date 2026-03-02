export default function SeText({ children }: { children: React.ReactNode }) {
    return (
        <p className="blog-text text-[15px] leading-[1.82] tracking-[-0.01em] text-[#222]">
            {children}
        </p>
    );
}
