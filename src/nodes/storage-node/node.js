import { memo, useState } from "react";
import { BaseHandle } from "../../components/reactflow/base-handle";
import { BaseTriggerNode } from "../base-node";
import { DatabaseIcon } from "lucide-react";
import { Position, useReactFlow } from "reactflow";
import { BaseDialog } from "../base-dialog";
import { toast } from "sonner";

export const StorageNode = memo((props) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { setNodes } = useReactFlow();

    const handleOpenSettings = () => setDialogOpen(true);

    const childrenBaseHandle = () => {
        return (
            <>
                <BaseHandle
                    id={'target-1'}
                    type="target"
                    position={Position.Top}
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
        else if(input.length === 0 || selectedValue.length === 0) {
            toast.warning('Please fill all the required fields');
            return;
        }
        setNodes((nodes) => nodes.map((node) => {
            if(node.id == props.id) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        capacity: input,
                        storageType: selectedValue,
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
                title={'Storage Node Dialog Box'}
                description={"It's important to cache the data with a Storage Node to increase the efficiency"}
                showInput
                inputId={`${props.id}-input-1`}
                inputLabel={'Enter the amount of storage required in MB'}
                inputPlaceholder={'eg. 512 (512MB)'}
                isSelectable={true}
                selectableValues={['HDD','SSD','DISK']}
                selectId={`${props.id}-select-1`}
                selectPlaceholder={'eg. HDD'}
                selectableLabel={'Choose type of memory option'}
                onSubmit={onSubmit}
            />
            <BaseTriggerNode
                {...props}
                name={'Secondary Storage'}
                description={'Store & retrive data'}
                Icon={DatabaseIcon}
                onSettings={handleOpenSettings}
                onDoubleClick={handleOpenSettings}
                className={'rounded-l-full rounded-r-full relative group bg-white'}
                childrenBaseHandle={childrenBaseHandle}
            />
        </>
    )
})