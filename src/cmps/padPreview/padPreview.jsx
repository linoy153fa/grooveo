import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { padService } from '../../services/padService.js';
import { savePad } from '../../store/actions/padAction.js';
import { toggle } from '../../store/actions/playerSettingsActions.js';
import Switch from '@material-ui/core/Switch';
import { getAudio } from '../../services/utilService.js';
import './padPreview.scss';
export default function PadPreview({
  id,
  isWaiting,
  updateWaiting,
  updateEnding,
}) {
  const dispatch = useDispatch();
  const { isPlaying } = useSelector((state) => state.playerSettingsReducer);
  const [pad, setPad] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const audioPlayer = useRef();

  useEffect(async () => {
    const _pad = await padService.getById(id);
    setPad(_pad);
    return () => {
      dispatch(toggle(false));
    };
  }, []);

  useEffect(() => {
    if (pad) {
      setIsChecked(pad.isChecked);
    }
  }, [pad?.isChecked]);

  useEffect(() => {
    if (pad?.isChecked && !isPlaying) {
      dispatch(savePad({ ...pad, isPlaying: true }));
    }
    if (pad) isToPlay();
  }, [pad?.isChecked, isPlaying, pad?.isPlaying]);

  const handleChange = ({ target }) => {
    const { checked } = target;
    setIsChecked(checked);
    const padToSave = {
      ...pad,
      isChecked: checked,
      isWaiting: isPlaying,
    };
    dispatch(savePad(padToSave));
    if (checked && isPlaying) {
      updateWaiting(pad._id);
    }
  };

  const isToPlay = () => {
    if (isChecked && isPlaying) {
      audioPlayer.current.play();
      dispatch(savePad({ ...pad, isPlaying: true }));
    } else if (!isPlaying) {
      audioPlayer.current.pause();
      dispatch(savePad({ ...pad, isPlaying: false, isWaiting: false }));
    }
  };

  const handleEnded = () => {
    if (isWaiting && isPlaying) {
      updateEnding(true);
    }
    if (isPlaying) {
      audioPlayer.current.play();
    }
  };

  if (!pad) return <div>...wait</div>;
  return (
    <div className='pad-preview col'>
      <h2 className='title'>{pad.title}</h2>
      <div className='toggle-container'>
        <audio ref={audioPlayer} src={getAudio(+id)} onEnded={handleEnded} />
        <Switch
          checked={isChecked}
          onChange={handleChange}
          name='isChecked'
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      </div>
    </div>
  );
}
