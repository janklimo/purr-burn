import Image from 'next/image';

const Gallery = () => {
  const images = [
    { src: '/images/gallery/IMG_1951.jpg', alt: 'Cat' },
    { src: '/images/gallery/IMG_1943.jpg', alt: 'Cat' },
    { src: '/images/gallery/IMG_1928.jpg', alt: 'Cat' },
    { src: '/images/gallery/IMG_1957.jpg', alt: 'Cat' },
    { src: '/images/gallery/IMG_2087.jpg', alt: 'Cat' },
    { src: '/images/gallery/IMG_2168.jpg', alt: 'Cat' },
    { src: '/images/gallery/IMG_2176.jpg', alt: 'Cat' },
    { src: '/images/gallery/IMG_2152.jpg', alt: 'Cat' },
    { src: '/images/gallery/IMG_2212.jpg', alt: 'Cat' },
    { src: '/images/gallery/IMG_2228.jpg', alt: 'Cat' },
  ];

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-2 lg:grid-cols-5 gap-4'>
        {images.map((image) => {
          return (
            <div
              key={image.src}
              className='relative rounded-lg overflow-hidden group'
              style={{ height: '350px' }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
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
