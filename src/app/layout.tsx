import type {Metadata} from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
// @ts-ignore
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hopper - Shorten, Share, and Track Your Links",
  description: "The simplest way to create, manage, and analyze your links. Connect your custom domain, gain insights with detailed reports, and share with confidence.",
  openGraph: {
    title: "Hopper - Shorten, Share, and Track Your Links",
    description: "The simplest way to create, manage, and analyze your links.",
    url: "https://hopper.rylverse.dev", 
    siteName: "Hopper",
    locale: 'en_US',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

	const { isAuthenticated } = await getKindeServerSession();
	const isAuthed = await isAuthenticated();
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${plusJakartaSans.variable} antialiased`}
      >
		<Header isAuthenticated={isAuthed} />
        {children}
		<Footer/>
      </body>
    </html>
  );
}
