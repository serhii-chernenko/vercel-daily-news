import type { PropsWithChildren } from "react";
import { Carousel, CarouselItem } from "@/app/components/Carousel";

export function ArticleCarousel({ children }: PropsWithChildren) {
  return <Carousel>{children}</Carousel>;
}

export function ArticleCarouselItem({ children }: PropsWithChildren) {
  return (
    <CarouselItem className="my-4 mb-10 ml-4 w-4/5 scroll-ml-4 last:mr-4 last:scroll-mr-4 sm:w-3/5 md:w-1/2 lg:w-1/3 xl:w-[calc(25%-(var(--spacing)*5))]">
      {children}
    </CarouselItem>
  );
}
