  import image1Big from '../public/image-1-big.jpeg'
  import image1Small from '../public/image-1-small.jpeg'
  import image2Big from '../public/image-2-big.webp'
  import image2Small from '../public/image-2-small.webp'
  import image3Big from '../public/image-3-big.webp'
  import image3Small from '../public/image-3-small.webp'
  
  const slidesData = [
    {
      bigImg: image1Big,
      smallImg: image1Small,
      titleImg: 'T shirt image',
      title: 'Style on your own terms.',
      link: {
        goTo: 'products',
        text: 'Shop now'
      }
    },
    {
      bigImg: image2Big,
      smallImg: image2Small,
      titleImg: 'Denim pants image',
      title: 'Find your fit.',
      link: {
        goTo: 'products',
        text: 'Browse'
      }
    },
    {
      bigImg: image3Big,
      smallImg: image3Small,
      titleImg: 'titleImage',
      title: 'Confidence starts here.',
      link: {
        goTo: 'products',
        text: 'Discover'
      }
    },
  ]

  export default slidesData;