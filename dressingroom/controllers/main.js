import { getNavPillMetadata, getPanelItemByType } from "../utils/callData.js";
import * as constants from "../constants/constants.js";
import * as controller from "./controllers.js";

var selectedTab = "";
var navPillsData = [];

fetch("../data/Data.json")
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    navPillsData = getNavPillMetadata(json);
    selectedTab = navPillsData[0].type;


    // topClothesData = getPanelItemByType({
    //   data: json,
    //   type: constants.topClothes,
    // });
    // bottomClothesData = getPanelItemByType({
    //   data: json,
    //   type: constants.botclothes,
    // });
    // shoesData = getPanelItemByType({ data: json, type: constants.shoes });
    // handbagsData = getPanelItemByType({ data: json, type: constants.handbags });
    // necklacesData = getPanelItemByType({
    //   data: json,
    //   type: constants.necklaces,
    // });
    // hairstyleData = getPanelItemByType({
    //   data: json,
    //   type: constants.hairstyle,
    // });
    // backgroundData = getPanelItemByType({
    //   data: json,
    //   type: constants.background,
    // });

    controller.renderNavPills(json, selectedTab);
    // console.log(topClothesData);
  });
