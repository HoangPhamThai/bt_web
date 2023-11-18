import { ChoseItem } from "../models/ChoseItem.js";
import { NavPill } from "../models/NavPill.js";

export function getNavPillMetadata(data) {
  if (data == null) return null;
  if (data.navPills == null) return null;
  return data.navPills.map(
    (item) =>
      new NavPill({
        tabName: item.tabName,
        showName: item.showName,
        type: item.type,
      })
  );
}

export function getPanelItemByType({ data, type }) {
  if (data == null) return null;
  if (data.tabPanes == null) return null;
  let arr = [];

  for (let item of data.tabPanes) {
    if (item.type === type) {
      arr.push(
        new ChoseItem({
          id: item.id,
          type: item.type,
          name: item.name,
          desc: item.desc,
          imgSrc_jpg: item.imgSrc_jpg,
          imgSrc_png: item.imgSrc_png,
        })
      );
    }
  }
  return arr;
}
