import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const RatingStars = ({ rating }) => {
  const starIcons = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    starIcons.push(<FaStar key={i} color="#FFD700" />);
  }

  if (hasHalfStar) {
    starIcons.push(<FaStarHalfAlt key={starIcons.length} color="#FFD700" />);
  }

  return <>{starIcons}</>;
};

export default RatingStars;
