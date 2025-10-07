import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function RateStar({ rating, count = 0, isOutOf = 5 }) {
  const stars = [];

  for(let i = 0; i < isOutOf; i++) {
    if(rating >= i) {
      stars.push(<FaStar key={i} color="gold" />);
    } else if(rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} color="gold" />);
    } else {
      stars.push(<FaRegStar key={i} color="gold" />);
    }
  }

  return (
    <div className="flex items-center gap-1">
      {stars} <small>{`(${count} reviews)`}</small>
    </div>
  )
}
