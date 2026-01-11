import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-node";
import { BaseHandle } from "../../components/reactflow/base-handle";
import { Position } from "reactflow";
import { FileBracesIcon } from "lucide-react";
import { BaseDialog } from "../base-dialog";

export const OutputTriggerNode = memo((props) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleOpenSettings = () => setDialogOpen(true);

    const childrenBaseHandle = () => {
        return (
            <>
                <BaseHandle
                    id={'target-1'}
                    type="target"
                    position={Position.Left}
                />
            </>
        )
    }

    return(
        <>
            <BaseDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title={'Output Node Dialog Box'}
                description={"You will see the output here when it's done"}
                showTextArea={true}
                textAreaId={`${props.id}-textarea-1`}
                textAreaPlaceholder={''}
                isTextAreaDisabled={true}
            />
            <BaseTriggerNode
                {...props}
                name={'Output Node'}
                description={'Double click to see output'}
                Icon={FileBracesIcon}
                onSettings={handleOpenSettings}
                onDoubleClick={handleOpenSettings}
                className={'rounded-r-2xl relative group bg-white'}
                childrenBaseHandle={childrenBaseHandle}
            />
        </>
    )
})