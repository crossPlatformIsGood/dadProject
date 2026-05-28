import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-seal focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-seal text-white hover:bg-seal-hover active:scale-[0.98]",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline:
					"border border-rule bg-surface text-ink hover:bg-paper-strong active:scale-[0.98]",
				secondary:
					"bg-paper-strong text-ink hover:bg-rule-soft active:scale-[0.98]",
				ghost: "text-ink hover:bg-paper-strong",
				"ghost-outline":
					"border border-rule bg-surface text-ink hover:bg-paper-strong active:scale-[0.98]",
				seal: "bg-surface text-seal border border-seal hover:bg-seal hover:text-white active:scale-[0.98]",
				link: "text-seal underline-offset-4 hover:underline",
			},
			size: {
				default: "h-10 px-5",
				sm: "h-8 px-4 text-xs",
				lg: "h-11 px-6",
				xl: "h-12 px-8 text-base",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
