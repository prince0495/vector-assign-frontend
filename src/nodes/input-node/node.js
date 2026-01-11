import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-node";
import { MousePointerIcon } from "lucide-react";
import { BaseHandle } from "../../components/reactflow/base-handle";
import { Position, useReactFlow } from "reactflow";
import { BaseDialog } from "../base-dialog";
import { toast } from "sonner";

export const InputTriggerNode = memo((props) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { setNodes } = useReactFlow();

    const handleOpenSettings = () => setDialogOpen(true);

    const childrenBaseHandle = () => {
        return (
            <>
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
        else if(textArea.length === 0) {
            toast.warning('Please fill all the required fields');
            return;
        }
        setNodes((nodes) => nodes.map((node) => {
            if(node.id == props.id) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        input: textArea,
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
                title={'Input Node Dialog Box'}
                description={'Enter your input, it will automatically proccessed'}
                showTextArea={true}
                textAreaId={`${props.id}-textarea-1`}
                textAreaPlaceholder={"Enter the input here"}
                textAreaLabel={'Input'}
                onSubmit={onSubmit}
            />
            <BaseTriggerNode
                {...props}
                name={'Input Node'}
                description={'Enter your input manually'}
                Icon={MousePointerIcon}
                onSettings={handleOpenSettings}
                onDoubleClick={handleOpenSettings}
                className={'rounded-l-2xl relative group bg-white'}
                childrenBaseHandle={childrenBaseHandle}
            />
        </>
    )
})