React.js is used to build Loop Machine, and Redux-Thunk is used to manage its state.

When the pads are turned on and the play button is pressed, the audio will play in a loop until the pause button is pressed.
When a switch is turned on during a loop, the new audio will start after pressing the pause button and then the play button.

An on/off switch controls each of the 9 pads. Redux keeps track of whether a pad is checked, if it is playing, and if it is waiting to start playing after the loop has ended.
The HomePage component renders the app's view. 

Local states and functions are passed as props to every pad to keep the parent component up-to-date about the audio tracks to be played.
Whenever the Play or Pause buttons are clicked, the global state variable "isPlaying" is updated.

The LooperPrevieww component loads the state of each pad and accordingly updates the switch button. 
Each time the global variable "isPlaying" changes, useEffect() renders the competent, and the function "isToPlay()" determines whether the audio should be played or not.
Each audio is managed by HTML5 audio element. 
