import Image from "next/image";

interface SeImageProps {
    src: string;
    caption?: string;
    width?: number;
    height?: number;
}

export default function SeImage({ src, caption, width = 900, height = 900 }: SeImageProps) {
    return (
        <figure className="blog-image my-2">
            <div className="relative w-full overflow-hidden rounded-[10px] bg-[#f1f3f5]">
                <Image
                    src={src}
                    alt={caption || "Post image"}
                    width={width}
                    height={height}
                    className="h-auto w-full object-cover"
                />
            </div>
            {caption && (
                <figcaption className="mt-2 text-center text-[12px] text-[#8a8a8a]">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
