import Image from "next/image";

interface SeImageProps {
    src: string;
    caption?: string;
    width?: number;
    height?: number;
}

export default function SeImage({ src, caption, width = 900, height = 900 }: SeImageProps) {
    return (
        <div className="se-component se-image se-l-default my-8">
            <div className="se-component-content se-component-content-fit">
                <div className="se-section se-section-image se-l-default se-section-align-">
                    <div className="se-module se-module-image relative w-full aspect-square bg-gray-100">
                        {/* Using standard img tag for simplicity or Next Image */}
                        <img src={src} alt={caption || ""} className="w-full h-auto object-cover" />
                    </div>
                    {caption && (
                        <div className="se-module se-module-text se-caption mt-3 text-center">
                            <p className="se-text-paragraph text-[12px] text-[#888]">{caption}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
