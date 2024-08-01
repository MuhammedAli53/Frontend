import userMenuData from "../../helpers/data/user-menu.json";

export const getMenuItems = (role) => {
    if (!userMenuData || !role) return;
    const menu = userMenuData[role.toLowerCase()];
    return menu;
  };