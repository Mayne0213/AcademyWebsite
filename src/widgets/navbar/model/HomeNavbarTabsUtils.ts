import tabs from "./HomeNavbarTabs";

const GetTabsValue = (identifier: string, pathname: string) => {
  for (const [index, tab] of tabs.entries()) {
    for (const [, item] of tab.submenu.entries()) {
      if (item.href === pathname) {
        if (identifier === "Title") {
          return tab.label;
        } else if (identifier === "SubTitle") {
          return item.label;
        } else if (identifier === "SubTitleEnglish") {
          return item.englishLabel;
        } else if (identifier === "Image") {
          return tab.imageHref;
        } else if (identifier === "Index") {
          return index;
        } else if (identifier === "Description") {
          return item.description;
        }
      }
    }
  }
};

export default GetTabsValue; 