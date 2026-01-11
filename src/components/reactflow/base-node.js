import { forwardRef } from "react";
import { CheckCircle2Icon, Loader2Icon, XCircleIcon } from "lucide-react";
import clsx from "clsx";

export const BaseNode = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      "relative rounded-sm border border-muted-foreground bg-card text-card-foreground hover:bg-accent",
      
      className,
    )}
    tabIndex={0}
    {...props}
  >
    {props.children}
  </div>
));
BaseNode.displayName = "BaseNode";

/**
 * A container for a consistent header layout intended to be used inside the
 * `<BaseNode />` component.
 */
export const BaseNodeHeader = forwardRef(({ className, ...props }, ref) => (
  <header
    ref={ref}
    {...props}
    className={clsx(
      "mx-0 my-0 -mb-1 flex flex-row items-center justify-between gap-2 px-3 py-2",
      // Remove or modify these classes if you modify the padding in the
      // `<BaseNode />` component.
      className,
    )}
  />
));
BaseNodeHeader.displayName = "BaseNodeHeader";

/**
 * The title text for the node. To maintain a native application feel, the title
 * text is not selectable.
 */
export const BaseNodeHeaderTitle = forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    data-slot="base-node-title"
    className={clsx("user-select-none flex-1 font-semibold", className)}
    {...props}
  />
));
BaseNodeHeaderTitle.displayName = "BaseNodeHeaderTitle";

export const BaseNodeContent = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="base-node-content"
    className={clsx("flex flex-col gap-y-2 p-3", className)}
    {...props}
  />
));
BaseNodeContent.displayName = "BaseNodeContent";

export const BaseNodeFooter = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="base-node-footer"
    className={clsx(
      "flex flex-col items-center gap-y-2 border-t px-3 pb-3 pt-2",
      className,
    )}
    {...props}
  />
));
BaseNodeFooter.displayName = "BaseNodeFooter";
