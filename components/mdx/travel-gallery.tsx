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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface TravelGalleryProps {
  images: string[]
  aspectRatio?: number
  autoplayInterval?: number
}

export function TravelGallery({
  images,
  aspectRatio = 16 / 9,
  autoplayInterval = 4000,
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
      <Carousel setApi={setApi} className="w-full max-w-2xl mx-auto">
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
                <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black/90 border-0">
                  <div className="relative w-full h-full flex items-center justify-center p-2">
                    <Image
                      src={"/images/gallery/" + src}
                      alt={`Image ${i + 1}`}
                      width={1920}
                      height={1080}
                      className="max-w-full max-h-[85vh] object-contain rounded"
                      sizes="90vw"
                    />
                  </div>
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
