import React, { useState, useRef } from 'react';

interface ImageZoomViewerProps {
  imageUrl: string;
  altText?: string;
  zoomFactor?: number;
  imageContainerClassName?: string; // e.g., "w-96 h-96"
  imageClassName?: string;         // e.g., "object-contain"
  zoomPaneClassName?: string;      // For additional styling of zoom pane
  zoomPaneWidth?: number;
  zoomPaneHeight?: number;
}

const ImageZoomViewer: React.FC<ImageZoomViewerProps> = ({
  imageUrl,
  altText = "Product image",
  zoomFactor = 2.5,
  imageContainerClassName = "w-96 h-96", 
  imageClassName = "object-contain", // 'object-contain' ensures the whole image is visible
  zoomPaneClassName = "",
  zoomPaneWidth = 350, // Adjusted default size
  zoomPaneHeight = 350, // Adjusted default size
}) => {
  console.log('ImageZoomViewer loaded for image:', imageUrl);

  const [showZoom, setShowZoom] = useState(false);
  const [bgPosX, setBgPosX] = useState(0);
  const [bgPosY, setBgPosY] = useState(0);
  
  // Stores the rendered dimensions of the <img> element, set by onLoad
  const [imgRenderedWidth, setImgRenderedWidth] = useState(0);
  const [imgRenderedHeight, setImgRenderedHeight] = useState(0);

  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null); // Ref for the div handling mouse events

  const handleMouseEnter = () => {
    // Ensure image is loaded and dimensions are known before showing zoom
    if (imageRef.current && imageRef.current.complete && imgRenderedWidth > 0 && imgRenderedHeight > 0) {
      setShowZoom(true);
    } else if (imageRef.current) { 
      // If image not fully loaded but element exists, still set showZoom.
      // Calculations in handleMouseMove will be skipped if dimensions are zero.
      setShowZoom(true);
    }
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !imageContainerRef.current || imgRenderedWidth === 0 || imgRenderedHeight === 0) {
      // If image dimensions are not properly set, abort calculation.
      return;
    }
    
    // Get the actual rendered image's bounding box. This is crucial if using object-contain,
    // as the <img> element's box might be different from its container.
    const imgRect = imageRef.current.getBoundingClientRect();
    
    // Mouse position relative to the viewport
    const clientX = event.clientX;
    const clientY = event.clientY;

    // Mouse position relative to the actual image element
    // This accounts for padding/margins if any, and the image's position on the page.
    const mouseXOnImage = clientX - imgRect.left;
    const mouseYOnImage = clientY - imgRect.top;
    
    // Clamp mouse coordinates to be within the image's actual bounds
    // imgRect.width and imgRect.height are the visual dimensions of the image element
    const relativeX = Math.max(0, Math.min(mouseXOnImage, imgRect.width));
    const relativeY = Math.max(0, Math.min(mouseYOnImage, imgRect.height));

    // Calculate background position for the zoom pane
    // The goal is to center the point (relativeX, relativeY) of the original image in the zoom pane.
    let newBgPosX = (zoomPaneWidth / 2) - (relativeX * zoomFactor);
    let newBgPosY = (zoomPaneHeight / 2) - (relativeY * zoomFactor);

    // Clamp background position to prevent zooming outside the image content.
    // The scaled image dimensions are based on `imgRenderedWidth/Height` (from offsetWidth/Height)
    // as these represent the image's layout dimensions before any dynamic scaling like object-fit.
    // However, for visual consistency, backgroundSize should relate to the actual visible part that is being hovered.
    // So, using imgRect.width/height (actual visual size) for scaled dimensions in clamping is more accurate.
    const scaledImgVisualWidth = imgRect.width * zoomFactor;
    const scaledImgVisualHeight = imgRect.height * zoomFactor;

    newBgPosX = Math.max(zoomPaneWidth - scaledImgVisualWidth, Math.min(0, newBgPosX));
    newBgPosY = Math.max(zoomPaneHeight - scaledImgVisualHeight, Math.min(0, newBgPosY));
    
    setBgPosX(newBgPosX);
    setBgPosY(newBgPosY);
  };
  
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgElement = event.currentTarget;
    // Use offsetWidth/offsetHeight for layout-based dimensions for backgroundSize consistency
    setImgRenderedWidth(imgElement.offsetWidth);
    setImgRenderedHeight(imgElement.offsetHeight);
    console.log(`Image loaded: ${imageUrl}, rendered (offset) dimensions: ${imgElement.offsetWidth}x${imgElement.offsetHeight}`);
    
    // If mouse is already over, and zoom was true, this ensures zoom pane updates with correct dimensions.
    // This can happen if mouseEnter fired before image fully loaded and set its dimensions.
    // Triggering a fake mouse move could update position, but usually not needed if mouse is still.
  };

  return (
    <div className="flex flex-row flex-wrap gap-4 items-start"> {/* Main layout container, flex-wrap for responsiveness */}
      <div
        ref={imageContainerRef}
        className={`relative border border-gray-200 dark:border-gray-700 ${imageContainerClassName}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{ cursor: 'crosshair' }} // Visual cue for zoom interaction
      >
        <img
          ref={imageRef}
          src={imageUrl}
          alt={altText}
          className={`w-full h-full ${imageClassName}`}
          onLoad={handleImageLoad}
          draggable="false" // Prevents native image drag conflicting with mouse events
        />
      </div>

      {/* Zoom Pane: Rendered only when showZoom is true and image dimensions are known */}
      {showZoom && imgRenderedWidth > 0 && imgRenderedHeight > 0 && (
        <div
          className={`border border-gray-300 dark:border-gray-600 overflow-hidden shadow-xl ${zoomPaneClassName}`}
          style={{
            width: `${zoomPaneWidth}px`,
            height: `${zoomPaneHeight}px`,
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: 'no-repeat',
            // backgroundSize uses imgRenderedWidth/Height (from offsetWidth/Height)
            // This assumes these are the dimensions of the image content itself.
            backgroundSize: `${imgRenderedWidth * zoomFactor}px ${imgRenderedHeight * zoomFactor}px`,
            backgroundPositionX: `${bgPosX}px`,
            backgroundPositionY: `${bgPosY}px`,
          }}
          role="img" // Semantically, this div is presenting an image (zoomed)
          aria-label={`${altText} - zoomed view`}
        />
      )}
    </div>
  );
};

export default ImageZoomViewer;