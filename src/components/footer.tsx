"use client";

export default function Footer() {
	return (
		<footer className="w-full border-t-[1px] border-secondary mt-20">
			<div className="container mx-auto py-8 px-6 md:px-40 flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center">
				<p className="text-muted-foreground">&copy; {new Date().getFullYear()} Hopper. All rights reserved.</p>
				<div className="flex gap-4">
					<a href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</a>
					<a href="/terms" className="text-muted-foreground hover:text-foreground">Terms</a>
				</div>
			</div>
		</footer>
	);
}