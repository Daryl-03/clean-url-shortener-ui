"use client";
import Link from "next/link";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar"
import { Link2, LogOut } from "lucide-react";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";


export default function Header({ isAuthenticated }: { isAuthenticated: boolean | null }) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const logoutPath = "/api/auth/logout";
	const loginPath = "/api/auth/login";
	const signupPath = "/api/auth/register";

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
				className="py-4 px-6 md:px-10 md:py-6 bg-background shadow-sm md:shadow-none flex items-center justify-between border-b-[1px] border-secondary"
			>
				<div className="flex items-center">
					<Link href="/">
						<Image
							src="/hopper-logo-transparent.svg"
							alt="Hopper Logo"
							width={2000}
							height={510}
							className="w-32 h-auto md:w-48"
						/>
						
					</Link>
					{process.env.NEXT_PUBLIC_STAGE === 'production' ? '' : `[${process.env.NEXT_PUBLIC_STAGE}]`}
					
					{isAuthenticated &&
						<Button variant={"secondary"} size={"lg"} className="font-semibold ml-4 hidden md:flex items-center hover:bg-primary bg-primary/80" asChild>
							<Link
								href="/links"
								className="text-primary-foreground hover:text-foreground font-semibold"
							>
								<Link2 className="text-primary-foreground" ></Link2>
								<span className="text-primary-foreground">My Links</span>
							</Link>
						</Button>}
				</div>

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

				{/* offline desktop menu */}
				{!isAuthenticated &&
					<div className="hidden md:flex md:gap-5 text-3xl  ">
						<Button variant={"secondary"} size={"lg"} className="font-semibold " asChild>
							<a
								href={loginPath}
								className="text-center text-md"

							>
								Log In
							</a>
						</Button>
						<Button variant={"default"} size={"lg"} className="font-semibold " asChild>
							<a
								href={signupPath}
								className="text-center text-md"
							>
								Sign Up
							</a>
						</Button>

					</div>

				}

				{/* {
					!isAuthenticated &&
					<div className="hidden md:flex">
						<Link
							href="/links"
							className="text-foreground/90 hover:text-foreground font-semibold"
						>
							My Links
						</Link>
					</div>
				} */}

				{/* user avatar */}
				{
					isAuthenticated &&
					<div className="hidden md:flex gap-20 items-center">
						{/* <Link
							href="/links"
							className="text-foreground/90 hover:text-foreground font-semibold"
						>
							My Links
						</Link> */}
						<Menubar className="outline-none border-none bg-background focus:bg-background active:bg-background" >
							<MenubarMenu  >
								<MenubarTrigger className="outline-none border-none" >
									<Avatar className="cursor-pointer " >
										<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
										<AvatarFallback>You</AvatarFallback>
									</Avatar>
								</MenubarTrigger>
								<MenubarContent className="border-secondary " >
									<MenubarItem className="cursor-pointer" >
										<a
											href={logoutPath}
											className="w-full text-center flex justify-center"
										>
											<LogOut className="inline-block mb-1 mr-2" />
											<span className="" >
												Logout
											</span>
										</a>
									</MenubarItem>
								</MenubarContent>
							</MenubarMenu>
						</Menubar>
					</div>
				}
			</nav>

			{/* mobile menu */}
			{mobileMenuOpen && (
				<div ref={menuRef} className="absolute top-full left-0 w-full bg-background shadow-lg md:hidden ">

					{
						!isAuthenticated &&
						<div className="flex flex-col p-4 gap-2 font-semibold text-foreground">
							<a
								href={loginPath}
								className="block text-center py-3 text-lg"
							>
								Login
							</a>
							<a
								href={signupPath}
								className="block text-center  py-3 text-lg"
							>
								Signup
							</a>
						</div>
					}

					{
						isAuthenticated &&
						<div className="flex flex-col items-center justify-center p-4 gap-5 font-semibold text-foreground">
							<Link
								href="/links"
								className="text-primary-foreground flex gap-2 hover:text-foreground font-semibold"
							>
								<Link2 className="text-foreground" ></Link2>
								<span className="text-foreground">My Links</span>
							</Link>

							{/* logout mobile */}
							<a
								href={logoutPath}
								className="border-t-border border-t-[1px] w-full text-center pt-3 flex justify-center"
							>
								<LogOut className="inline-block mb-1 mr-2" />
								<span className="" >
									Logout
								</span>
							</a>
						</div>
					}
				</div>
			)}
		</header>
	);
}