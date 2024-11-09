import Image from 'next/image';

import IMG_1928 from '/public/images/gallery/IMG_1928.jpg';
import IMG_1943 from '/public/images/gallery/IMG_1943.jpg';
import IMG_1951 from '/public/images/gallery/IMG_1951.jpg';
import IMG_1957 from '/public/images/gallery/IMG_1957.jpg';
import IMG_2087 from '/public/images/gallery/IMG_2087.jpg';
import IMG_2152 from '/public/images/gallery/IMG_2152.jpg';
import IMG_2168 from '/public/images/gallery/IMG_2168.jpg';
import IMG_2176 from '/public/images/gallery/IMG_2176.jpg';
import IMG_2212 from '/public/images/gallery/IMG_2212.jpg';
import IMG_2228 from '/public/images/gallery/IMG_2228.jpg';

const Gallery = () => {
  const images = [
    { image: IMG_1951, alt: 'Cat' },
    { image: IMG_1943, alt: 'Cat' },
    { image: IMG_1928, alt: 'Cat' },
    { image: IMG_1957, alt: 'Cat' },
    { image: IMG_2087, alt: 'Cat' },
    { image: IMG_2168, alt: 'Cat' },
    { image: IMG_2176, alt: 'Cat' },
    { image: IMG_2152, alt: 'Cat' },
    { image: IMG_2212, alt: 'Cat' },
    { image: IMG_2228, alt: 'Cat' },
  ];

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-2 lg:grid-cols-5 gap-4'>
        {images.map((item) => {
          return (
            <div
              key={item.image.src}
              className='relative rounded-lg overflow-hidden group'
              style={{ height: '350px' }}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                placeholder='blur'
                className='object-cover transition-transform duration-300 group-hover:scale-105'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
              <div className='absolute inset-0 bg-hl-light opacity-0 group-hover:opacity-20 transition-opacity duration-300' />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
