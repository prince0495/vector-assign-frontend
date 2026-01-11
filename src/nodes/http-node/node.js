import { memo, useState } from "react";
import { BaseHandle } from "../../components/reactflow/base-handle";
import { BaseTriggerNode } from "../base-node";
import { GlobeIcon } from "lucide-react";
import { Position, useReactFlow } from "reactflow";
import { BaseDialog } from "../base-dialog";
import { toast } from "sonner";

export const HttpTriggerNode = memo((props) => {
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
                    id={'source-1'}
                    type="source"
                    position={Position.Right}
                    />
            </>
        )
    }

    const nodeData = props.data;
    const description = nodeData?.endpoint ? `${nodeData.method || "GET"}: ${nodeData.endpoint}` : "Not configured";

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
                        endpoint: input,
                        method: selectedValue,
                        body: textArea,
                        variables,
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
                title={'Http Node Dialog Box'}
                description={'Fill complete information of your https request point'}
                showInput={true}
                inputId={`${props.id}-input-1`}
                inputLabel={'Valid Http URL'}
                inputPlaceholder={'Endpoint'}
                isSelectable={true}
                selectId={`${props.id}-select-1`}
                selectableValues={['GET','POST','PUT','PATCH','DELETE']}
                selectPlaceholder={'eg. GET'}
                selectableLabel={'Http Request'}
                showTextArea={true}
                textAreaId={`${props.id}-textarea-1`}
                textAreaPlaceholder={'Enter Request Body ...'}
                onSubmit={onSubmit}
            />
            <BaseTriggerNode
                {...props}
                name={'Http Request'}
                description={description}
                Icon={GlobeIcon}
                onSettings={handleOpenSettings}
                onDoubleClick={handleOpenSettings}
                className={'bg-white'}
                childrenBaseHandle={childrenBaseHandle}
            />
        </>
    )
})