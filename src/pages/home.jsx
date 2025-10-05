import Carousel from '../components/Carousel'
import slidesData from '../../data/slidesData'

export default function Home() {
  return (
    <div>
      <Carousel 
        data={slidesData}
        autoSlideTime={4000}
      />
    </div>
  )
}


