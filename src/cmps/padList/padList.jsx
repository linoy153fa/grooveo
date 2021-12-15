import './padList.scss';
import PadPreview from '../padPreview/padPreview';
export default function LooperList({
  pads,
  isWaiting,
  updateWaiting,
  updateEnding,
  isEnded,
}) {
  return (
    <div className='pad-list flex justify-center'>
      <div className='grid-list grid'>
        {pads
          .sort((a, b) => (a._id > b._id ? 1 : -1))
          .map((pad) => (
            <PadPreview
              key={pad._id}
              id={pad._id}
              isWaiting={isWaiting}
              updateWaiting={updateWaiting}
              updateEnding={updateEnding}
              isEnded={isEnded}
            />
          ))}
      </div>
    </div>
  );
}
