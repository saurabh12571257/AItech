import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton, SignUpButton } from '@clerk/nextjs'
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronDown, FileText, LayoutDashboard, Star, PenLine, GraduationCapIcon } from "lucide-react";  
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { checkUser } from "@/lib/checkuser";

export const Header = async () => {
    await checkUser();
    return(
        <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 h-16
        supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto h-full px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <Image 
                        src="/logo.png" 
                        alt="logo" 
                        width={250} 
                        height={80}
                        className="h-18 w-auto object-contain"
                    />
                </Link>

                <div className="flex items-center gap-2 md:gap-4">
                    <SignedIn>
                        <Link href="/dashboard">
                            <Button variant="outline">
                                <LayoutDashboard className="w-4 h-4 mr-2"/>
                                <span className="hidden md:block">Insights</span>
                            </Button>
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button>
                                    <Star className="w-4 h-4 mr-2"/>
                                    <span className="hidden md:block">Tools</span>
                                    <ChevronDown className="w-4 h-4 ml-2"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Link href="/resume" className="flex items-center gap-2">
                                        <FileText className="w-4 h-4"/>
                                        <span>Build Resume</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/ai-cover-letter" className="flex items-center gap-2">
                                        <PenLine className="w-4 h-4"/>
                                        <span>Coverletter</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/interview" className="flex items-center gap-2">
                                        <GraduationCapIcon className="w-4 h-4"/>
                                        <span>Interview Prac</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SignedIn>

                    <SignedOut>
                        <SignInButton>
                            <Button variant="outline">Sign In</Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10",
                                    userButtonPopoverCard: "shadow-xl",
                                    userPreviewMainIdentifier: "font-semibold",
                                },
                            }}
                            afterSignOutUrl="/"
                        />
                    </SignedIn>
                </div>
            </nav>
        </header>
    )
}