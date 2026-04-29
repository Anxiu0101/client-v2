"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Dialog, DialogContent, DialogTrigger , DialogTitle} from "@/components/ui/dialog"

interface TravelGalleryProps {
  images: string[]
  aspectRatio?: number
  autoplayInterval?: number
}

export function TravelGallery({
  images,
  aspectRatio = 16 / 9,
  autoplayInterval = 6000,
}: TravelGalleryProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const onSelect = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return
    setCurrent(carouselApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    const timer = setInterval(() => api.scrollNext(), autoplayInterval)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
      clearInterval(timer)
    }
  }, [api, autoplayInterval, onSelect])

  return (
    <div className="my-6">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full max-w-2xl mx-auto">
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={i}>
              <Dialog>
                <DialogTrigger asChild>
                  <button type="button" className="w-full text-left cursor-zoom-in">
                    <AspectRatio ratio={aspectRatio}>
                      <Image
                        src={"/images/gallery/" + src}
                        alt={`Image ${i + 1}`}
                        fill
                        className="rounded-lg object-cover"
                        sizes="(max-width: 768px) 100vw, 672px"
                      />
                    </AspectRatio>
                  </button>
                </DialogTrigger>
                <DialogTitle>旅途风光</DialogTitle>
                <DialogContent showCloseButton={false} className="max-w-[95vw] max-h-[95vh] p-1 bg-black/90 border-0 sm:max-w-[90vw] sm:max-h-[90vh]">
                  <Image
                    src={"/images/gallery/" + src}
                    alt={`Image ${i + 1}`}
                    width={1920}
                    height={1080}
                    className="w-full h-full max-h-[93vh] object-contain sm:max-h-[88vh]"
                    sizes="95vw"
                  />
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      <div className="flex justify-center gap-2 mt-3">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`size-2 rounded-full transition-colors ${
              i === current ? "bg-foreground" : "bg-muted-foreground/40"
            }`}
            onClick={() => api?.scrollTo(i)}
          />
        ))}
      </div>
    </div>
  )
}
