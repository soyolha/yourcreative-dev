
import clsx from "clsx";
import React from "react";

export type { BoundedProps} from"@/app/components/Bounded";



type BoundedProps = {
    as?: React.ElementType;
    className?: string;
    children:React.ReactNode;
}
const Bounded = React.forwardRef<HTMLElement, BoundedProps>(
  ({ className, children, ...restProps }, ref) => (
    <section ref={ref} className={clsx("px-4 py-10 md:px-6 md:py-14 lg:py-16", className)} {...restProps}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  )
);
  
   
Bounded.displayName = "Bounded"

export default Bounded;
