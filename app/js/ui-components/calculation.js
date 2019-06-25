import { prices } from "../data/prices.js";

const fromSelect = document.querySelector('select[name="from"]');
const toSelect = document.querySelector('select[name="to"]');
const juniorsCheckbox = document.querySelector('input[name="juniors"]');
const timeCheckbox = document.querySelector('input[name="time"]');
const ageCheckbox = document.querySelector('input[name="age"]');
const resultOutput = document.querySelector(".result-output");

export const getPrice = () => {
  if (fromSelect.value === "" || toSelect.value === "") {
    return;
  }

  const basePrice = prices.filter(price => fromSelect.value === price.from && toSelect.value === price.to)[0].price;

  let price = basePrice;

  if (juniorsCheckbox.checked) {
    price += basePrice * 0.5;
  }

  if (timeCheckbox.checked) {
    price -= basePrice * 0.5;
  }

  if (ageCheckbox.checked) {
    price += basePrice * 0.5;
  }

  resultOutput.value = price.toLocaleString("de") + " EUR";
};

export const initPriceEventListener = () => {
  fromSelect.addEventListener("change", getPrice);
  toSelect.addEventListener("change", getPrice);
  juniorsCheckbox.addEventListener("change", getPrice);
  timeCheckbox.addEventListener("change", getPrice);
  ageCheckbox.addEventListener("change", getPrice);
};
