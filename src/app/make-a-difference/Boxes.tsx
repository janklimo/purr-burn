import Image from 'next/image';

import box1 from '/public/images/gallery/boxes/box1.jpg';
import box2 from '/public/images/gallery/boxes/box2.jpg';
import box3 from '/public/images/gallery/boxes/box3.jpg';

const Boxes = () => {
  const images = [
    { image: box1, alt: 'Cat' },
    { image: box2, alt: 'Cat' },
    { image: box3, alt: 'Cat' },
  ];

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-3 gap-4'>
        {images.map((item) => {
          return (
            <div
              key={item.image.src}
              className='relative rounded-lg overflow-hidden group h-40 md:h-60'
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

export default Boxes;
