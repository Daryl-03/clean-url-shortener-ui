"use client";

import { Button } from "@/components/ui/button";

import { ChartSpline, Shield, Zap } from "lucide-react";
import { FeatureCard } from "@/components/featureCard";
import { WorkflowStep } from "@/components/workflowStep";

export default function Home() {

	

	return (
		<>	
			<main className="min-h-screen px-10 py-14 md:py-20 flex flex-col items-center gap-20 md:gap-30 md:px-60">
				<div className="text-center">
					<h1>
						Shorten. Share. Track. 
					</h1>
					<p className="mt-6 text-lg text-foreground/70">
						The simplest way to create, manage, and analyze your links.
					</p>

					<Button variant={"default"} size={"lg"} className="mt-8 font-semibold md:w-60 md:h-12 md:text-2xl" >
						Get Started
					</Button>
				</div >


				<div className="flex flex-col items-center md:gap-10" >
					<h2 className="text-center text-foreground/80">
						Why choose Hopper?
					</h2>

					<div className="flex flex-col md:flex-row gap-10 mt-10 md:gap-6 md:px-20">
						<FeatureCard icon={Zap} title="Link Like a Pro" description="Ditch the long, messy URLs. Connect your custom domain in minutes and share with confidence." />
						<FeatureCard icon={ChartSpline} title="Detailed Analytics" description="Gain insights into who is clicking your links with detailed reports and tracking." />
						<FeatureCard icon={Shield} title="Secure and Reliable" description="Your links are safe with our top-notch security measures and reliable uptime." />

					</div>
				</div>

				<div className="w-full text-center flex flex-col items-center">
                    <h2 className="text-foreground/80">Hopper Workflow</h2>
                    <p className="mt-2 md:mt-6 text-md text-foreground/70">
						Getting started with Hopper is quick and easy.
					</p>
					<div className="mt-8 flex flex-col md:flex-row gap-10 md:gap-10 md:px-20">
						<WorkflowStep stepNumber={1} title="Sign Up" description="Create your free Hopper account in seconds to access all features." color="bg-primary" />
						<WorkflowStep stepNumber={2} title="Create Links" description="Create and customize your short links with ease." color="bg-teal-400" />
						<WorkflowStep stepNumber={3} title="Analyze" description="Track the performance of your links with detailed analytics." color="bg-primary" />
					</div>
                </div>
			</main>
		</>
	);
}