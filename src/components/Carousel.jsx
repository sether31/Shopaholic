import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TbArrowBigLeftLineFilled, TbArrowBigRightLineFilled } from 'react-icons/tb'


export default function Carousel({
  data,
  autoSlideTime
}) {

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isCurrentIndex = currentIndex === 0;
    const newIndex = isCurrentIndex ? data.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  const nextSlide = () => {
    const isCurrentIndex = currentIndex === data.length - 1;
    const newIndex = isCurrentIndex ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }


  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextSlide()
    }, autoSlideTime)

    return () => clearInterval(autoSlide);
  }, [currentIndex]);

  // get current slide data
  const slide = data[currentIndex] || {};

  return (
    <div
      className='relative w-full duration-500 h-dvh group'
    >
      <picture>
        <source media="(max-width: 800px)" srcSet={slide.smallImg} />
        <img 
          src={slide.bigImg} 
          alt={slide.titleImg} 
          className='absolute object-cover w-full h-full'
        />
      </picture>


      {/* main content */}
      <div className='relative flex flex-col items-center justify-center h-full gap-8'>
        {slide.title && (
          <h1 className='p-4 text-2xl font-bold text-white w-max sm:text-3xl md:text-5xl lg:text-7xl bg-black/60'>
            {slide.title}
          </h1>
        )} 
        {slide.link && (
          <Link 
            to={slide.link.goTo}
            className='px-8 py-2 font-bold text-white transition-colors bg-blue-500 rounded-sm cursor-pointer text-md sm:text-xl hover:bg-blue-700 w-max'
          >
            {slide.link.text}
          </Link>
        )}
      </div>

      {/* buttons */}
      <h1 className='absolute hidden -translate-y-1/2 cursor-pointer group-hover:block top-1/2 right-3 sm:right-5 z-2' onClick={nextSlide}>
        <TbArrowBigRightLineFilled className='transition-colors text-[40px] sm:text-[50px] hover:text-blue-500' />
      </h1>
      <h1 className='absolute hidden -translate-y-1/2 cursor-pointer group-hover:block top-1/2 left-3 sm:left-5 z-2' onClick={prevSlide}>
        <TbArrowBigLeftLineFilled className='transition-colors text-[40px] sm:text-[50px] hover:text-blue-500' />
      </h1>
    </div>
  )
}
