import Image from "next/image";

interface SeImageProps {
    src: string;
    caption?: string;
    width?: number;
    height?: number;
}

export default function SeImage({ src, caption, width = 900, height = 900 }: SeImageProps) {
    return (
        <div className="se-component se-image se-l-default my-2">
            <div className="se-component-content se-component-content-fit">
                <div className="se-section se-section-image se-l-default se-section-align-">
                    <div className="se-module se-module-image relative w-full overflow-hidden rounded-[10px] bg-[#f1f3f5]">
                        <Image
                            src={src}
                            alt={caption || "Post image"}
                            width={width}
                            height={height}
                            className="h-auto w-full object-cover"
                        />
                    </div>
                    {caption && (
                        <div className="se-module se-module-text se-caption mt-2 text-center">
                            <p className="se-text-paragraph text-[12px] text-[#8a8a8a]">{caption}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
