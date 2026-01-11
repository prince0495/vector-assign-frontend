// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap, Panel } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import 'reactflow/dist/style.css';
import { InitialNode } from './components/initial-node';
import { createId } from '@paralleldrive/cuid2';
import { AddNodeButton } from './components/add-node-button';
import { InputTriggerNode } from './nodes/input-node/node';
import { HttpTriggerNode } from './nodes/http-node/node';
import { OutputTriggerNode } from './nodes/output-node/node';
import { LlmTriggerNode } from './nodes/llm-node/node';
import { StorageNode } from './nodes/storage-node/node';
import { SubmitButton } from './submit';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  INITIAL_NODE: InitialNode,
  INPUT_NODE: InputTriggerNode,
  HTTP_NODE: HttpTriggerNode,
  OUTPUT_NODE: OutputTriggerNode,
  LLM_NODE: LlmTriggerNode,
  STORAGE_NODE: StorageNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    
    const {
      nodes,
      edges,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect,
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = createId();
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
            
            const hasInitialTrigger = nodes.some(
              (node) => node.type === 'INITIAL_NODE'
            );
            
            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div ref={reactFlowWrapper} style={{width: '100wv', height: '70vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                fitView
            >
                <Background color="#aaa" gap={gridSize} />
                <Controls />
                <MiniMap />
                <Panel position="top-right" >
                  <AddNodeButton/>
                </Panel>
            </ReactFlow>
        </div>
        </>
    )
}
