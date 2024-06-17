import React from 'react';
import { useSprings, animated } from 'react-spring';
import { AiFillHeart } from 'react-icons/ai';

const FloatingHearts = ({ show, count = 10 }) => {
  const springs = useSprings(
    count,
    [...Array(count)].map(() => ({
      from: { transform: 'translateY(100vh)', opacity: 1 },
      to: {
        transform: show ? 'translateY(-100vh)' : 'translateY(100vh)',
        opacity: 0
      },
      config: { duration: 3000 },
      reset: true
    }))
  );

  return springs.map((props, index) => (
    <animated.div
      key={index}
      style={{
        ...props,
        position: 'fixed',
        left: `${10 + (index * 5) % 90}vw`,
        bottom: '-5vh', 
      }}
    >
      <AiFillHeart size="30px" color="red" />
    </animated.div>
  ));
};

export default FloatingHearts;