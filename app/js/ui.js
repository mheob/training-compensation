/* eslint-disable no-undef */
import { getPrice, initPriceEventListener } from "./ui-components/calculation.js";

document.addEventListener("DOMContentLoaded", function() {
  M.Sidenav.init(document.querySelectorAll(".side-menu"), { edge: "right" });
  M.FormSelect.init(document.querySelectorAll("select"));
  M.Tooltip.init(document.querySelectorAll(".tooltip"));
});

// render price
if (document.body.classList.contains("calculate")) {
  getPrice();
  initPriceEventListener();
}
