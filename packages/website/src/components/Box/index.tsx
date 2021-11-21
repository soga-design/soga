import {
  AllHTMLAttributes,
  forwardRef,
  createElement,
  ElementType,
} from "react";

import { Atoms, sprinkles } from "styles/sprinkles.css";
import { classnames } from "utils/styles";

type HTMLProperties = Omit<
  AllHTMLAttributes<HTMLElement>,
  "as" | "color" | "height" | "width"
>;

interface Props extends Atoms, HTMLProperties {
  as?: ElementType;
}

export const Box = forwardRef<HTMLElement, Props>(
  ({ as = "div", className, ...props }: Props, ref) => {
    const atomProps: Record<string, unknown> = {};
    const nativeProps: Record<string, unknown> = {};

    Object.keys(props).forEach((key) => {
      if (sprinkles.properties.has(key as keyof Omit<Atoms, "reset">)) {
        atomProps[key] = props[key as keyof typeof props];
      } else {
        nativeProps[key] = props[key as keyof typeof props];
      }
    });

    const atomicClasses = sprinkles(atomProps);

    return createElement(as, {
      className: classnames(atomicClasses, className),
      ...nativeProps,
      ref,
    });
  }
);

export type BoxProps = Parameters<typeof Box>[0];

Box.displayName = "Box";
