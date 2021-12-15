
export function toggle(isPlaying) {
    return async dispatch => {
        try {
            dispatch({ type: 'TOGGLE', isPlaying })
        } catch (err) {
            console.log('toggle fail', err)
        }
    }
}