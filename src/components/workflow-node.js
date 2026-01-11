// import { NodeToolbar, Position } from "@xyflow/react";
import { SettingsIcon, TrashIcon } from "lucide-react";
import { NodeToolbar, Position } from "reactflow";
import { Button } from "./ui/button";

export function WorkflowNode({
    children,
    showToolbar,
    onDelete,
    onSettings,
    name,
    description,
}) {
    return (
        <>
            <NodeToolbar isVisible={showToolbar} >
                <Button size={'sm'} variant={'ghost'} onClick={onSettings}>
                    <SettingsIcon className="size-4" />
                </Button>
                <Button size={'sm'} variant={'ghost'} onClick={onDelete}>
                    <TrashIcon className="size-4" />
                </Button>
            </NodeToolbar>
            {children}
            {name && (
                <NodeToolbar 
                    position={Position.Bottom}
                    isVisible
                    className="max-w-[200px] text-center"
                >
                    <p className="font-medium">
                        {name}
                    </p>
                    {description && (
                        <p className="text-muted-foreground truncate text-sm">
                            {description}
                        </p>
                    )}
                </NodeToolbar>
            )}
        </>
    )
}