import { forwardRef } from "react";
// import { Handle } from "@xyflow/react";

import clsx from "clsx";
import { Handle } from "reactflow";

export const BaseHandle = forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <Handle
        ref={ref}
        className={clsx(
          "h-[11px] w-[11px] rounded-full border border-slate-300 bg-slate-100 transition dark:border-secondary dark:bg-secondary",
          className,
        )}
        {...props}
      >
        {children}
      </Handle>
    );
  },
);

BaseHandle.displayName = "BaseHandle";
