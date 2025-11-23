

export interface WorkflowStepProps {
	stepNumber: number;
	title: string;
	description: string;
	color?: string;
}

export function WorkflowStep({ stepNumber, title, description, color }: WorkflowStepProps) {
	return (
		<div className="flex flex-col gap-4 items-center md:w-1/3" >
			<div className={` rounded-full text-2xl p-1 text-primary-foreground size-14 flex items-center justify-center ${color ? color : "bg-primary"}`} >
				{stepNumber}
			</div>

			<div className="text-center flex flex-col gap-2 md:gap-4">
				<h3>
					{title}
				</h3>
				<p>
					{description}
				</p>
			</div>
		</div>
	);
}