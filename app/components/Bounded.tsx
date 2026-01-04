import React from "react"
import clsx from "clsx";


export type BoundedProps = React.ComponentPropsWithoutRef<"section"> &{
    as?: React.ElementType;
};

const Bounded = React.forwardRef<HTMLElement, BoundedProps>(
  ({ className, children, ...restProps }, ref) => (
    <section ref={ref} className={clsx("px-4 py-10 md:px-6 md:py-14 lg:py-16", className)} {...restProps}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  )
);
  
   
Bounded.displayName = "Bounded"

export default Bounded;