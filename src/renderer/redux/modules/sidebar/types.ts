export const OPEN_SIDEBAR = 'OPEN_SIDEBAR';

export interface SidebarState {
    isOpenSidebar : boolean;
    isSetting : boolean;
};

export interface OpenSidebarAction {
    type : typeof OPEN_SIDEBAR;
    payload : SidebarType;
};

interface SidebarType {
    isSetting : boolean;
};