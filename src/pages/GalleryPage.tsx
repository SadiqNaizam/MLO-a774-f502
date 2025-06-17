import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ImageZoomViewer from '@/components/ImageZoomViewer';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

// Placeholder images for the gallery
const galleryItems = [
  { id: "front", src: "https://picsum.photos/seed/mclone_laptop1/1024/768", alt: "MacClone - Front View" },
  { id: "angle", src: "https://picsum.photos/seed/mclone_laptop2/1024/768", alt: "MacClone - Angled View" },
  { id: "keyboard", src: "https://picsum.photos/seed/mclone_laptop3/1024/768", alt: "MacClone - Keyboard Detail" },
  { id: "ports", src: "https://picsum.photos/seed/mclone_laptop4/1024/768", alt: "MacClone - Side Profile with Ports" },
  { id: "lifestyle", src: "https://picsum.photos/seed/mclone_laptop5/1024/768", alt: "MacClone - Open on Desk (Lifestyle)" },
  { id: "top_closed", src: "https://picsum.photos/seed/mclone_laptop6/1024/768", alt: "MacClone - Top View, Closed" },
  { id: "screen_detail", src: "https://picsum.photos/seed/mclone_laptop7/1024/768", alt: "MacClone - Screen Detail" },
  { id: "hinge_detail", src: "https://picsum.photos/seed/mclone_laptop8/1024/768", alt: "MacClone - Hinge Detail" },
];

const GalleryPage = () => {
  console.log('GalleryPage loaded');

  const [mainImageSrc, setMainImageSrc] = useState(galleryItems[0].src);
  const [mainImageAlt, setMainImageAlt] = useState(galleryItems[0].alt);

  const handleThumbnailClick = (image: { src: string; alt: string }) => {
    setMainImageSrc(image.src);
    setMainImageAlt(image.alt);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-28"> {/* Adjust pt for fixed header height */}
        
        <section className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">Product Gallery</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore the MacClone from every angle. Select a thumbnail to view it larger, and hover over the main image to zoom in on details.
          </p>
        </section>

        <section className="mb-16">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Main Image Zoom Viewer */}
            <div className="lg:w-2/3 w-full flex justify-center items-center">
              <ImageZoomViewer
                imageUrl={mainImageSrc}
                altText={mainImageAlt}
                imageContainerClassName="w-full max-w-2xl aspect-[16/10] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-2xl border border-border"
                imageClassName="w-full h-full object-contain"
                zoomPaneWidth={350} 
                zoomPaneHeight={350}
                zoomPaneClassName="hidden md:block" // Hide zoom pane on smaller screens if it feels too cluttered
              />
            </div>

            {/* Thumbnails */}
            <div className="lg:w-1/3 w-full lg:max-h-[calc(theme(aspectRatio.16/10)_*_min(100vw,theme(maxWidth.2xl)))] lg:overflow-y-auto pr-1"> {/* Match height of viewer and make scrollable */}
               <h2 className="text-xl font-semibold mb-4 text-left">More Views</h2>
               <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-3">
                 {galleryItems.map((img) => (
                   <button
                     key={img.id}
                     onClick={() => handleThumbnailClick(img)}
                     className={`rounded-lg overflow-hidden border-2 transition-all duration-150 ease-in-out
                                 ${mainImageSrc === img.src ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background' : 'border-border hover:border-primary/70'}
                                 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background`}
                     aria-label={`View ${img.alt}`}
                   >
                     <img
                       src={img.src}
                       alt={img.alt + " thumbnail"}
                       className="w-full h-auto aspect-square object-cover cursor-pointer"
                       loading="lazy"
                     />
                   </button>
                 ))}
               </div>
            </div>
          </div>
        </section>

        <section className="py-12 border-t border-border">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Discover Even More Details</h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {galleryItems.map((image, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="group">
                    <Card className="overflow-hidden shadow-lg rounded-lg transition-shadow hover:shadow-xl">
                      <CardContent className="flex aspect-video items-center justify-center p-0">
                        <img 
                          src={image.src} 
                          alt={image.alt} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </CardContent>
                    </Card>
                    <p className="text-center text-sm text-muted-foreground mt-3">{image.alt}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-10px] sm:left-[-20px] top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 disabled:opacity-50" />
            <CarouselNext className="absolute right-[-10px] sm:right-[-20px] top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 disabled:opacity-50" />
          </Carousel>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;