"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
	return (
		<div className="flex flex-col flex-1 items-center justify-center h-full w-full py-20">
			<Loader2 className="animate-spin text-primary mb-4" size={48} />
			<span className="text-lg text-muted-foreground">Chargement des statistiques...</span>
		</div>
	);
}
