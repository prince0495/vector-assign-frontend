"use client";

import { forwardRef } from "react";
// import {
//   Handle,
//   Position,
// } from "@xyflow/react";
import { BaseNode } from "./base-node";
import { Handle, Position } from "reactflow";

export const PlaceholderNode = forwardRef(
  ({ children, onClick }, ref) => {

    return (
      <BaseNode
        ref={ref}
        className="w-auto h-auto border-dashed border-gray-400 bg-card p-2 text-center text-gray-400 shadow-none cursor-pointer hover:border-gray-500 hover:bg-gray-50"
        onClick={onClick}
      >
        {children}
        <Handle
          type="target"
          style={{ visibility: "hidden" }}
          position={Position.Top}
          isConnectable={false}
        />
        <Handle
          type="source"
          style={{ visibility: "hidden" }}
          position={Position.Bottom}
          isConnectable={false}
        />
      </BaseNode>
    );
  },
);

PlaceholderNode.displayName = "PlaceholderNode";
