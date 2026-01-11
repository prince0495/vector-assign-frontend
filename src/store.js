// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [
      {
        id: 'n1',
        position: {x: window.innerWidth/2, y: window.innerHeight/2},
        data: {id: 'n1', nodeType: 'INITIAL_NODE'},
        type: 'INITIAL_NODE'
      },
    ],
    edges: [],
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (newNode) => {
      set((state) => {
        const hasInitialNode = state.nodes.some(
          (node) => node.type === 'INITIAL_NODE'
        );

        const filteredNodes = hasInitialNode
          ? state.nodes.filter((node) => node.type !== 'INITIAL_NODE')
          : state.nodes;

        return {
          nodes: [...filteredNodes, newNode],
        };
      });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
  }));
