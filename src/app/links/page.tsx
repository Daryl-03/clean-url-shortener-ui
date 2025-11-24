
import CreateLinkDialog from "@/components/links/createLinkDialog";
import LinkList from "@/components/links/linkList";
import { shortlinkApi } from "@/lib/dependencies";


export default async function LinksPage() {
	let links;
	let error = null;

	try {
		links = await shortlinkApi.getAllShortlinks();
	} catch (e) {
		console.error("Erreur fetching links:", e);
		error = "Could not fetch links. Please try again later.";
		
	}

	return (
		<main className="flex-1 px-5 md:px-24 pt-10 pb-10 md:pt-10 md:pb-0 flex flex-col gap-10 relative">
			<h1 className="md:hidden" >My links</h1>
			<h2 className="hidden md:block" >My links</h2>

			<div className="mb-40 md:mb-0">
				<LinkList links={links}></LinkList>
			</div>
				{error && <span className="text-destructive mb-4">{error}</span>}
			<CreateLinkDialog />
		</main>
	);
}