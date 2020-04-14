const INITIAL_STATE = { playbackStatus: 'paused' };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'playback_status':
            return { ...state, playbackStatus: action.payload };
        default:
            return state;
    }
}