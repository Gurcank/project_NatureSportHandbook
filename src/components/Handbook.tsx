"use client";

import NotebookSpread, { type NotebookNote } from "./NotebookSpread";
import React from "react";

export type { NotebookNote };

export default function Handbook({
	leftNotes = [],
	rightNotes = [],
	size = "xl",
	leftContent,
	rightContent,
	leftOverlay,
	rightOverlay,
	stickyMode,
	showHomeSticky,
	className,
}: {
	leftNotes?: NotebookNote[];
	rightNotes?: NotebookNote[];
	size?: 'b6' | 'regular' | 'xl';
	leftContent?: React.ReactNode;
	rightContent?: React.ReactNode;
	leftOverlay?: React.ReactNode;
	rightOverlay?: React.ReactNode;
	stickyMode?: 'home' | 'page';
	showHomeSticky?: boolean;
	className?: string;
}) {
	return (
		<div className={className ?? "flex-1 mx-auto w-full max-w-[88rem] px-4 py-4 sm:py-5"}>
			<NotebookSpread
				leftNotes={leftNotes}
				rightNotes={rightNotes}
				size={size}
				leftContent={leftContent}
				rightContent={rightContent}
				leftOverlay={leftOverlay}
				rightOverlay={rightOverlay}
				stickyMode={stickyMode}
				showHomeSticky={showHomeSticky}
			/>
		</div>
	);
}
