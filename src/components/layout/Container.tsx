import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
    return (
        <div className={`w-full max-w-[768px] mx-auto bg-white min-h-screen ${className}`}>
            {children}
        </div>
    );
}
