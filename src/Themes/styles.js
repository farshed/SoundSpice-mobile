export const contrastColor = (props) => props.theme.contrast;
export const backgroundColor = (props) => props.theme.background;
export const foregroundColor = (props) => props.theme.foreground;
export const foreground2Color = (props) => props.theme.foreground2;
export const elevatedBGColor = (props) => props.theme.elevatedBG;
export const backdropColor = (props) => props.theme.backdrop;
export const contrastTransColor = (opacity) => (props) => `${props.theme.contrastTrans}${opacity})`;
export const fgTransColor = (opacity) => (props) => `${props.theme.fgTrans}${opacity})`;
