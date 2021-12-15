import React, { useEffect, useState } from 'react';
import './home.scss';
import { useDispatch, useSelector } from 'react-redux';
import PadsList from '../../cmps/padList/padList';
import { loadPads, savePad } from '../../store/actions/padAction.js';
import { toggle } from '../../store/actions/playerSettingsActions.js';
import { padService } from '../../services/padService.js';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

export default function Home() {
  const [isWaiting, setIsWaiting] = useState(false);
  const [waitingPad, setWaitingPad] = useState(null);
  const pads = useSelector((state) => state.padReducer.pads);
  const [isEnded, setIsEnded] = useState(false);
  const isLoading = useSelector(
    (state) => state.playerSettingsReducer.isLoading
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPads());
  }, []);

  const handlePlay = () => {
    setIsWaiting(false);
    dispatch(toggle(true));
  };

  const handlePause = (ev) => {
    ev.preventDefault();
    dispatch(toggle(false));
    setIsWaiting(false);
  };

  const updateWaiting = (padId) => {
    setIsWaiting(true);
    const loadPad = async () => {
      const _pad = await padService.getById(padId);
      setWaitingPad(_pad);
    };
    loadPad();
  };

  const updateEnding = () => {
    setIsEnded(true);
    if (waitingPad) {
      dispatch(savePad({ ...waitingPad, isPlaying: true }));
    }
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className='home'>
      <h1 className='main-title'>PLAY!</h1>
      <PadsList
        pads={pads}
        isWaiting={isWaiting}
        updateWaiting={updateWaiting}
        updateEnding={updateEnding}
        isEndedProp={isEnded}
      />
      <div className='btns'>
        <PlayCircleFilledIcon className='icon' onClick={handlePlay} />
        <PauseCircleFilledIcon className='icon' onClick={handlePause} />
      </div>
    </div>
  );
}
