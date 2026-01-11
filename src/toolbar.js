// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap' }} className='flex items-center justify-center gap-10 font-bold'>
                <DraggableNode type='INPUT_NODE' label='Input' />
                <DraggableNode type='LLM_NODE' label='LLM' />
                <DraggableNode type='OUTPUT_NODE' label='Output' />
                <DraggableNode type='STORAGE_NODE' label='Storage' />
                <DraggableNode type='HTTP_NODE' label='Http' />
            </div>
        </div>
    );
};
