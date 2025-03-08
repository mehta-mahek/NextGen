import Link from "next/link";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "HOME", href: "/" },
  { name: "DASHBOARD", href: "/dashboard" },
  { name: "REPORT", href: "/report" },
  { name: "CHATBOT", href: "/chatbot" },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-transparent z-50">
      <nav className="container mx-auto flex justify-center py-4 space-x-16">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "text-base font-semibold transition-colors hover:text-white",
              item.name === "DASHBOARD"
                ? "text-white border-b-2 border-white"
                : "text-gray-400"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}

