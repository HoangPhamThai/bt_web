import { getNavPillMetadata, getPanelItemByType } from "../utils/callData.js";
import * as constants from "../constants/constants.js";

const defaultTopClothes = "./../images/allbody/bikini_branew.png";

export function renderNavPills(data, activeTab) {
  let navPillsData = getNavPillMetadata(data);
  let navContent = "";
  let tabContent = "";
  navPillsData.forEach((item) => {
    let clothesData = getPanelItemByType({ data: data, type: item.type });

    navContent += `
    <li class="nav-item mx-2 my-2">
        <button class="nav-link w-full ${
          item.type == activeTab ? "active" : ""
        }" aria-current="page" id="${
      item.tabName
    }" data-bs-toggle="tab" data-bs-target="#${item.type}">${
      item.showName
    }</button>
    </li>
        `;

    tabContent += `
        <div class="tab-pane ${item.type == activeTab ? "active" : ""}" id="${
      item.type
    }" role="tabpanel" aria-labelledby="${item.tabName}">
        <div class="grid grid-cols-4">
        `;

    clothesData.forEach((clothesItem) => {
      tabContent += `<div class="mx-3 my-3">
      <img src="${clothesItem.imgSrc_jpg}" class="rounded-start" alt="..." onclick="handleChangeClothes('${item.type}', '${clothesItem.imgSrc_png}')"/> 
      </div>
      `;
    });
    tabContent += `</div></div>`;
  });

  document.getElementById("nav-pills").innerHTML = navContent;
  document.getElementById("clothes-content").innerHTML = tabContent;

  navPillsData.forEach((item) => {
    document.getElementById(item.tabName).addEventListener("click", () => {
      let selectedTab = item.type;
      renderNavPills(data, selectedTab);
    });
  });
}

window.handleChangeClothes = (type, src) => {
  switch (type) {
    case constants.topClothes:
      changeImage({
        elementId: "bikinitop",
        type: type,
        src: src,
      });
      break;
    case constants.botclothes:
      changeImage({
        elementId: "bikinibottom",
        type: type,
        src: src,
      });
      break;
    case constants.shoes:
      changeImage({
        elementId: "feet",
        type: type,
        src: src,
      });
      break;
    case constants.handbags:
      changeImage({
        elementId: "handbag",
        type: type,
        src: src,
      });
      break;
    case constants.necklaces:
      changeImage({
        elementId: "necklace",
        type: type,
        src: src,
      });
      break;
    case constants.hairstyle:
      changeImage({
        elementId: "hairstyle",
        type: type,
        src: src,
      });
      break;
    case constants.background:
      changeImage({
        elementId: "background",
        type: type,
        src: src,
      });
      break;
  }
};

function changeImage({ elementId, type, src }) {
  let objStyle = document.getElementsByClassName(elementId)[0].style;
  let backgroundSize = "250px 500px";
  let zIndex = 1;

  switch (type) {
    case constants.topClothes:
      zIndex = 3;
      break;
    case constants.botclothes:
      zIndex = 2;
      break;
    case constants.shoes:
      backgroundSize = "500px 1000px";
      break;
    case constants.handbags:
    case constants.necklaces:
      backgroundSize = "500px 1000px";
      zIndex = 4;
      break;
    case constants.hairstyle:
      backgroundSize = "1000px 1000px";
      zIndex = 3;
      break;
    case constants.background:
      backgroundSize = "900px 1500px";
      zIndex = -1;
      break;
  }

  objStyle.background = `url('${src}')`;
  objStyle.backgroundSize = backgroundSize;
  objStyle.zIndex = zIndex;
}
