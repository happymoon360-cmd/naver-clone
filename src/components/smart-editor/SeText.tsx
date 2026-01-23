export default function SeText({ children }: { children: React.ReactNode }) {
    return (
        <div className="se-component se-text se-l-default">
            <div className="se-component-content">
                <div className="se-section se-section-text se-l-default">
                    <div className="se-module se-module-text">
                        <p className="se-text-paragraph se-text-paragraph-align- text-[16px] leading-[1.8] text-[#333]">
                            {children}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
