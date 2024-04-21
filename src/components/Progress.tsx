import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';

const Progress = () => {
  return (
    <CircularProgressbarWithChildren
      value={66}
      styles={buildStyles({
        strokeLinecap: 'round',

        // Text size
        textSize: '16px',

        // How long animation takes to go from one percentage to another, in seconds
        pathTransitionDuration: 0.5,

        // Can specify path transition in more detail, or remove it entirely
        // pathTransition: 'none',

        // Colors
        pathColor: '#98FCE4',
        textColor: '#f88',
        trailColor: '#163832',
        backgroundColor: '#163832',
      })}
    >
      <div style={{ fontSize: 12, marginTop: -5 }}>
        <strong>66%</strong>
      </div>
    </CircularProgressbarWithChildren>
  );
};

export default Progress;
