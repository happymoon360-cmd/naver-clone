export default function SeText({ children }: { children: React.ReactNode }) {
    return (
        <div className="se-component se-text se-l-default">
            <div className="se-component-content">
                <div className="se-section se-section-text se-l-default">
                    <div className="se-module se-module-text">
                        <p className="se-text-paragraph text-[17px] leading-[1.9] tracking-[-0.01em] text-[#222]">
                            {children}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
