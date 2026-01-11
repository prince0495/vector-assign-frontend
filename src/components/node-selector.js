import { createId } from "@paralleldrive/cuid2";
import { GlobeIcon, MousePointerIcon, FileBracesIcon, BotIcon, DatabaseIcon } from 'lucide-react';
import { useCallback } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { useReactFlow } from "reactflow";
import { toast } from "sonner";

const inputNodes = [
    {
        type: 'INPUT_NODE',
        label: "Input manually",
        description: "Runs the flow on clicking a button. Good for getting started quickly.",
        icon: MousePointerIcon,
    },
]
const httpNodes = [
    {
        type: 'HTTP_NODE',
        label: "HTTP Request",
        description: "Makes an HTTP request.",
        icon: GlobeIcon,
    },
]
const outputNodes = [
    {
        type: 'OUTPUT_NODE',
        label: "Output",
        description: "See the output with the help of output node. Double click it to expand.",
        icon: FileBracesIcon
    }
]
const llmNodes = [
    {
        type: 'LLM_NODE',
        label: "LLM Models",
        description: "Leverage the power of customizable LLM models to 100x your productivity.",
        icon: BotIcon
    }
]
const storageNodes = [
    {
        type: 'STORAGE_NODE',
        label: "Store data",
        description: "It's better to cache your data to speed up the operations, choose the data storage wisely.",
        icon: DatabaseIcon
    }
]




export function NodeSelector({
    open,
    onOpenChange,
    children,
}) {
    const { setNodes, getNodes } = useReactFlow();

    const handleNodeSelect = useCallback((selection) => {
        if(selection.type === 'INPUT_NODE') {
            const nodes = getNodes();
            const hasManualTrigger = nodes.some(
                (node) => node.type === 'INPUT_NODE',
            );

            if(hasManualTrigger) {
                toast.error("Only one manual trigger is allowed per workflow");
                return;
            }
        }

        setNodes((nodes) => {
            const hasInitialTrigger = nodes.some(
                (node) => node.type === 'INITIAL_NODE',
            );

            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const flowPosition = {
                x: centerX + (Math.random() - 0.5) * 200,
                y: centerY + (Math.random() - 0.5) * 200, 
            };

            const nodeId = createId();

            const newNode = {
                id: nodeId,
                data: { id: nodeId, nodeType: selection.type},
                position: flowPosition,
                type: selection.type,
            };
            
            if(hasInitialTrigger) {
                return [newNode];
            }

            return [...nodes, newNode];
        });
        onOpenChange(false);
    }, [setNodes, getNodes, onOpenChange]);

    return (
        <Sheet open={open} onOpenChange={onOpenChange} className='bg-white'>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto bg-white">
                <SheetHeader>
                    <SheetTitle>
                        What triggers this workflow?
                    </SheetTitle>
                    <SheetDescription>
                        A trigger is a step that starts your workflow.
                    </SheetDescription>
                </SheetHeader>
                <div>
                    {inputNodes.map((nodeType) => {
                        const Icon = nodeType.icon;

                        return (
                            <div
                                key={nodeType.type}
                                className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
                                onClick={() => handleNodeSelect(nodeType)}
                            >
                                <div className="flex items-center gap-6 w-full overflow-hidden">
                                    {typeof Icon === 'string' ? (
                                        <img
                                            src={Icon}
                                            alt={nodeType.label}
                                        />
                                    ): (
                                        <Icon className="size-5" />
                                    )}
                                    <div className="flex flex-col items-start text-left">
                                        <span className="font-medium text-sm">
                                            {nodeType.label}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {nodeType.description}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Separator/> 
                <div>
                    {httpNodes.map((nodeType) => {
                        const Icon = nodeType.icon;

                        return (
                            <div
                                key={nodeType.type}
                                className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
                                onClick={() => handleNodeSelect(nodeType)}
                            >
                                <div className="flex items-center gap-6 w-full overflow-hidden">
                                    {typeof Icon === 'string' ? (
                                        <img
                                            src={Icon}
                                            alt={nodeType.label}
                                        />
                                    ): (
                                        <Icon className="size-5" />
                                    )}
                                    <div className="flex flex-col items-start text-left">
                                        <span className="font-medium text-sm">
                                            {nodeType.label}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {nodeType.description}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Separator/>
                <div>
                    {outputNodes.map((nodeType) => {
                        const Icon = nodeType.icon;

                        return (
                            <div
                                key={nodeType.type}
                                className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
                                onClick={() => handleNodeSelect(nodeType)}
                            >
                                <div className="flex items-center gap-6 w-full overflow-hidden">
                                    {typeof Icon === 'string' ? (
                                        <img
                                            src={Icon}
                                            alt={nodeType.label}
                                        />
                                    ): (
                                        <Icon className="size-5" />
                                    )}
                                    <div className="flex flex-col items-start text-left">
                                        <span className="font-medium text-sm">
                                            {nodeType.label}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {nodeType.description}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Separator/>
                <div>
                    {llmNodes.map((nodeType) => {
                        const Icon = nodeType.icon;

                        return (
                            <div
                                key={nodeType.type}
                                className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
                                onClick={() => handleNodeSelect(nodeType)}
                            >
                                <div className="flex items-center gap-6 w-full overflow-hidden">
                                    {typeof Icon === 'string' ? (
                                        <img
                                            src={Icon}
                                            alt={nodeType.label}
                                            width={20}
                                        />
                                    ): (
                                        <Icon className="size-5" />
                                    )}
                                    <div className="flex flex-col items-start text-left">
                                        <span className="font-medium text-sm">
                                            {nodeType.label}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {nodeType.description}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Separator/>
                <div>
                    {storageNodes.map((nodeType) => {
                        const Icon = nodeType.icon;

                        return (
                            <div
                                key={nodeType.type}
                                className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
                                onClick={() => handleNodeSelect(nodeType)}
                            >
                                <div className="flex items-center gap-6 w-full overflow-hidden">
                                    {typeof Icon === 'string' ? (
                                        <img
                                            src={Icon}
                                            alt={nodeType.label}
                                            width={20}
                                        />
                                    ): (
                                        <Icon className="size-5" />
                                    )}
                                    <div className="flex flex-col items-start text-left">
                                        <span className="font-medium text-sm">
                                            {nodeType.label}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {nodeType.description}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                
            </SheetContent>
        </Sheet>
    )
}