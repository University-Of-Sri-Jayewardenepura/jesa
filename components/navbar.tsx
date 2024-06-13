"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export function Navbar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-2xl mx-2 md:mx-auto z-50 border border-primary/50 rounded-full  ",
        className
      )}
    >
      <div className="flex justify-between items-center px-4 py-3 bg-background/60 backdrop-blur-xl rounded-full shadow-lg">
        <a className="flex items-center space-x-4" href="/">
          <Image
            src="/images/jesa-icon.ico"
            width={24}
            height={24}
            alt="JESA 2024"
            className="h-8 w-8"
          />
          <h1 className="text-lg font-semibold hidden md:block bg-gradient-to-br from-amber-300 to-amber-500 bg-clip-text text-transparent">
            JESA 2024
          </h1>
        </a>
        <div className="flex items-center space-x-4">
          <Link href="/awards" className=" hidden md:block">
            Awards
          </Link>
          <Link href="/hall-of-fame" className="hidden md:block">
            Hall of Fame
          </Link>
          <Button asChild className="rounded-full">
            <Link href="/register">Register</Link>
          </Button>
          <MobileNav className="md:hidden" />
        </div>
      </div>
    </div>
  );
}

function MobileNav({ className }: { className?: string }) {
  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-primary/50"
          >
            <Menu className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <span className="sr-only">Mobile Navigation Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href="/awards">Awards</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/hall-of-fame">Hall of Fame</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
