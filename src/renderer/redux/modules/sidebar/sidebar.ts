import { OPEN_SIDEBAR, OpenSidebarAction, SidebarState } from './types';

export const openSidebar = (isSetting : boolean) : OpenSidebarAction => {
    return {
        type : OPEN_SIDEBAR,
        payload : {
            isSetting
        }
    };
};

const initialState : SidebarState = {
    isOpenSidebar : false,
    isSetting : false
};

const reducer = (state : SidebarState, action : OpenSidebarAction) : SidebarState => {
    switch(action.type) {
        case OPEN_SIDEBAR :
            return  applyOpenSidebar(state, action);

        default :
            return initialState;
    }
};

const applyOpenSidebar = (state : SidebarState, action : OpenSidebarAction) : SidebarState => {
    return {
        ...state,
        isOpenSidebar : !state.isOpenSidebar,
        isSetting : action.payload.isSetting
    };
};

export default reducer;