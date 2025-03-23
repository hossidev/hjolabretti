import clsx from "clsx";
import { CSSProperties, ElementType, ReactNode } from "react";

type BoundedProps = {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function Bounded({
  as: Comp = "section",
  className,
  children,
  ...restProps
}: BoundedProps) {
  return (
    // @ts-expect-error - This is a workaround to allow the component to be used with a custom element type
    <Comp
      // @ts-expect-error - This is a workaround to allow the component to be used with a custom element type
      className={clsx(
        "px-6 ~py-10/16 [.header+&]:pt-44 [.header+&]:md:pt-32",
        className
      )}
      {...restProps}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Comp>
  );
}
