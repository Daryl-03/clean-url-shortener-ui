"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/hopper-logo-transparent.svg";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
				buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
				setMobileMenuOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	
	return (

		<header className="relative" >
			<nav
				className="py-4 px-6 md:px-40 md:py-6 bg-background shadow-sm md:shadow-none flex items-center justify-between border-b-[1px] border-secondary"
			>
				<Link href="/">
					<Image
						src={logo}
						alt="Hopper Logo"
						width={2000}
						height={510}
						className="w-32 h-auto md:w-48"
					/>
				</Link>

				{/* hamburger menu */}
				<button
					className="flex flex-col gap-1 cursor-pointer md:hidden py-0.5 "
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					type="button"
					aria-label="Open menu"
					aria-expanded={mobileMenuOpen}
					ref={buttonRef}
				>
					<div className="border-2 border-foreground h-[1px] w-6 pointer-events-none"></div>
					<div className="border-2 border-foreground h-[1px] w-6 pointer-events-none"></div>
					<div className="border-2 border-foreground h-[1px] w-6 pointer-events-none"></div>
				</button>

				{/* desktop menu */}
				<div className="hidden md:flex md:gap-5 text-3xl  ">
					<Button variant={"secondary"} size={"lg"} className="font-semibold " >
						<Link
							href="/login"
							className="text-center text-md"
						>
							Log In
						</Link>
					</Button>
					<Button variant={"default"} size={"lg"} className="font-semibold " >
						<Link
							href="/signup"
							className="text-center text-md"
						>
							Sign Up
						</Link>
					</Button>
				</div>
			</nav>

			{/* mobile menu */}
			{mobileMenuOpen && (
				<div ref={menuRef} className="absolute top-full left-0 w-full bg-background shadow-lg md:hidden ">
					<div className="flex flex-col p-4 gap-2 font-semibold text-foreground">
						<Link
							href="/login"
							className="block text-center py-3 text-lg"
						>
							Login
						</Link>
						<Link
							href="/signup"
							className="block text-center  py-3 text-lg"
						>
							Signup
						</Link>
					</div>
				</div>
			)}
		</header>
	);
}