import { memo, useState } from "react";
import { Position, useReactFlow } from "reactflow";
import { BaseNode, BaseNodeContent } from "../components/reactflow/base-node";
import { WorkflowNode } from "../components/workflow-node";

export const BaseTriggerNode = memo(
    ({
        id,
        Icon,
        name,
        description,
        children,
        className,
        childrenBaseHandle,
        onSettings,
        onDoubleClick
    }) => {
        const { setNodes, setEdges } = useReactFlow();

        const handleDelete = () => {
            setNodes((currentNodes) => {
                const updatedNodes = currentNodes.filter((node) => node.id !== id);
                return updatedNodes;
            })
            setEdges((currentEdges) => {
                const updatedEdges = currentEdges.filter(
                    (edge) => edge.source !== id && edge.target !== id
                );
                return updatedEdges;
            })
        };
        return (
            <WorkflowNode
                name={name}
                description={description}
                onDelete={handleDelete}
                onSettings={onSettings}
            >
                <BaseNode onDoubleClick={onDoubleClick} className={className}>
                    <BaseNodeContent>
                        {typeof Icon === 'string'? (
                            <img src={Icon} alt={name} width={16} height={16} />
                        ): (
                            <Icon className="size-4 text-muted-foreground" />
                        )}
                        {children}
                        {childrenBaseHandle?.()}
                    </BaseNodeContent>
                </BaseNode>
            </WorkflowNode>
        )
    }
);