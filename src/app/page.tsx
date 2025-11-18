import Link from "next/dist/client/link";
import Image from "next/image";

export default function Home() {
	return (
		<div className="font-sans justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 flex">
			<h1>
				Hello I'm tired
			</h1>
			<div className="flex ">
				<Link href="/login">
					Login
				</Link>
				<Link href="/signup">
					Sign Up
				</Link>

			</div>
		</div>
	);
}