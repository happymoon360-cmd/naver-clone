export default function SeQuote({ children }: { children: React.ReactNode }) {
    return (
        <div className="se-component se-quotation se-l-quotation_line my-2.5">
            <div className="se-component-content">
                <div className="se-section se-section-quotation se-l-quotation_line">
                    <blockquote className="se-quotation-container rounded-[4px] bg-[#e9f5d0] px-3 py-1.5">
                        <div className="se-module se-module-text se-quote">
                            <p className="se-text-paragraph text-[15px] font-medium leading-[1.75] tracking-[-0.01em] text-[#202020]">
                                {children}
                            </p>
                        </div>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}
