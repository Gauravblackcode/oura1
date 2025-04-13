import styles from './tutorial-boundary.module.scss';

interface TCDots {
  totalDots: number;
  activeDot: number;
}

const TutorialCarouselDots: React.FC<TCDots> = ({ totalDots = 3, activeDot = 1 }) => {
  const dotIndices = Array.from({ length: totalDots }, (_, index) => index);
  return (
    <div className={styles.dot_wrapper}>
      {dotIndices.map(dotIndex => (
        <span key={dotIndex} data-active={dotIndex === activeDot} />
      ))}
    </div>
  );
};

export default TutorialCarouselDots;
