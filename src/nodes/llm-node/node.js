import { memo, useState } from "react";
import { BaseHandle } from "../../components/reactflow/base-handle";
import { BaseTriggerNode } from "../base-node";
import { BotIcon } from "lucide-react";
import { Position, useReactFlow } from "reactflow";
import { BaseDialog } from "../base-dialog";
import { toast } from "sonner";

export const LlmTriggerNode = memo((props) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { setNodes } = useReactFlow();

    const handleOpenSettings = () => setDialogOpen(true);

    const childrenBaseHandle = () => {
        return (
            <>
                <BaseHandle
                    id={'target-1'}
                    type="target"
                    position={Position.Left}
                    />
                <BaseHandle
                    id={'target-2'}
                    type="target"
                    position={Position.Bottom}
                    />
                <BaseHandle
                    id={'source-1'}
                    type="source"
                    position={Position.Right}
                />
            </>
        )
    }

    const onSubmit = (input, selectedValue, textArea, variables) => {
        if(!props.id) {
            toast.warning('something went wrong, try again later.');
            return;
        }
        else if(input.length === 0 || selectedValue.length === 0 || textArea.length === 0) {
            toast.warning('Please fill all the required fields');
            return;
        }
        setNodes((nodes) => nodes.map((node) => {
            if(node.id == props.id) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        systemPrompt: input,
                        model: selectedValue,
                        userPrompt: textArea,
                        variables
                    }
                }
            }
            return node;
        }))
    }

    return(
        <>
            <BaseDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title={'LLM Model Node Dialog Box'}
                description={'Automate your work easily with customisable LLM Models'}
                showInput={true}
                inputId={`${props.id}-input-1`}
                inputLabel={'System Prompt'}
                inputPlaceholder={'Write your powerful system prompt'}
                isSelectable={true}
                selectId={`${props.id}-select-1`}
                selectableValues={['Gemini pro 2.0','Gemini light 1.5', 'Gpt mini 1.0','Gpt base 2.5','Gtp go 3.0']}
                selectPlaceholder={'eg. Gemini pro 2.0'}
                selectableLabel={'Select models from here'}
                showTextArea={true}
                textAreaId={`${props.id}-textarea-1`}
                textAreaPlaceholder={'Enter custom prompt...'}
                onSubmit={onSubmit}
            />
            <BaseTriggerNode
                {...props}
                name={'LLM Model'}
                description={'Configure model'}
                Icon={BotIcon}
                onSettings={handleOpenSettings}
                onDoubleClick={handleOpenSettings}
                className={'bg-white'}
                childrenBaseHandle={childrenBaseHandle}
            />
        </>
    )
})