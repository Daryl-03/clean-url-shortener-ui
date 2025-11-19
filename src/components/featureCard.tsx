import { LucideProps } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";


interface FeatureCardProps {
	icon: React.ElementType<LucideProps>;
	title: string;
	description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
	return (
		<Card className="border-border md:w-1/3">
			<CardHeader>
				<Icon className="text-primary" size={32} />
			</CardHeader>
			<CardContent className="gap-5 flex flex-col" >
				<h3>
					{title}
				</h3>
				<p className="text-muted-foreground">
					{description}
				</p>
			</CardContent>
		</Card>
	);
}