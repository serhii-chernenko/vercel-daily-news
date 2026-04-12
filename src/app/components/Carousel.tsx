import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { clsx } from "clsx";

type CarouselProps = PropsWithChildren<ComponentPropsWithoutRef<"ul">>;

export function Carousel({ children, className, ...props }: CarouselProps) {
  return (
    <ul {...props} className={clsx("carousel m-0 list-none gap-0 p-0", className)}>
      {children}
    </ul>
  );
}

type CarouselItemProps = PropsWithChildren<ComponentPropsWithoutRef<"li">>;

export function CarouselItem({ children, className, ...props }: CarouselItemProps) {
  return (
    <li {...props} className={clsx("carousel-item", className)}>
      {children}
    </li>
  );
}
