import { getNavPillMetadata, getPanelItemByType } from "../utils/callData.js";


export function renderNavPills(data, activeTab) {
  let navPillsData = getNavPillMetadata(data);
  let navContent = "";
  let tabContent = "";
  navPillsData.forEach((item) => {
    let clothesData = getPanelItemByType({ data: data, type: item.type });

    navContent += `
    <li class="nav-item mx-2 my-2">
        <button class="nav-link w-full ${item.type == activeTab ? "active" : ""}" aria-current="page" id="${item.tabName}" data-bs-toggle="tab" data-bs-target="#${item.type}">${item.showName}</button>
    </li>
        `;

    tabContent += `
        <div class="tab-pane ${item.type == activeTab ? "active" : ""}" id="${item.type}" role="tabpanel" aria-labelledby="${item.tabName}">
        <div class="grid grid-cols-3">
        `;

    clothesData.forEach((clothesItem) => {
      tabContent += `<div class="mx-3 my-3">
      <img src="${clothesItem.imgSrc_jpg}" class="rounded-start" alt="..."/> 
      </div>
      `;
    });
    tabContent += `</div></div>`;
  });

  document.getElementById("nav-pills").innerHTML = navContent;
  document.getElementById("clothes-content").innerHTML = tabContent;

  navPillsData.forEach((item) =>{
    document.getElementById(item.tabName).addEventListener("click", () => {
      let selectedTab = item.type;
      renderNavPills(data, selectedTab);
    })
  })
}
