import { animated, useSpring } from '@react-spring/web';
import { FC } from 'react';

interface Props {
  end: number;
}

const Counter: FC<Props> = ({ end }) => {
  const spring = useSpring({
    number: end,
    from: { number: 1_000_000_000 },
    config: { duration: 1000 },
  });

  return (
    <animated.div className='text-accent text-xl font-mono'>
      {spring.number.to((value) =>
        value.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      )}
    </animated.div>
  );
};

export default Counter;
