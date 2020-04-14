const INITIAL_STATE = { footerVisible: true };

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'show_footer':
			return { footerVisible: true };
		case 'hide_footer':
			return { footerVisible: false };
		default:
			return state;
	}
}
