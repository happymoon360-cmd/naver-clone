export default function SeQuote({ children }: { children: React.ReactNode }) {
    return (
        <div className="se-component se-quotation se-l-quotation_line my-8">
            <div className="se-component-content">
                <div className="se-section se-section-quotation se-l-quotation_line">
                    <blockquote className="se-quotation-container border-l-[3px] border-naver-green pl-4">
                        <div className="se-module se-module-text se-quote">
                            <p className="se-text-paragraph text-[16px] font-bold text-[#333]">
                                {children}
                            </p>
                        </div>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}
