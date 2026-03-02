import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="w-full bg-bg-subtle border-t border-border py-6 mt-auto">
            <div className="max-w-[1080px] mx-auto px-4 text-center">
                <div className="text-sm text-text-light mb-2">
                    Made with ❤️ and coffee
                </div>
                <div className="text-xs text-text-light mb-2">
                    © {currentYear} My Blog. All rights reserved.
                </div>
                <div className="text-xs">
                    <Link href="/admin" className="text-gray-300 hover:text-text-light transition-colors">
                        Admin
                    </Link>
                </div>
            </div>
        </footer>
    );
}
