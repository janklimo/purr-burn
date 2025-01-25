import Image from 'next/image';
import { FC } from 'react';
import { RenderSlideProps } from 'yet-another-react-lightbox/*';
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
} from 'yet-another-react-lightbox/core';

const LightboxImage: FC<RenderSlideProps> = ({ slide, rect }) => {
  const { imageFit } = useLightboxProps().carousel;
  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isImageSlide(slide)) {
    return null;
  }
  const slideHeight = slide.height || 400;
  const slideWidth = slide.width || 200;

  const width = !cover
    ? Math.round(Math.min(rect.width, (rect.height / slideHeight) * slideWidth))
    : rect.width;

  const height = !cover
    ? Math.round(Math.min(rect.height, (rect.width / slideWidth) * slideHeight))
    : rect.height;

  return (
    <div style={{ position: 'relative', width, height }}>
      <Image
        alt=''
        src={slide as unknown as string}
        loading='eager'
        draggable={false}
        style={{ objectFit: cover ? 'cover' : 'contain' }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
      />
    </div>
  );
};

export default LightboxImage;
