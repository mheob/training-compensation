/* eslint-disable no-undef */
document.addEventListener("DOMContentLoaded", function() {
  // nav menu
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, { edge: "right" });

  const select = document.querySelectorAll("select");
  M.FormSelect.init(select);
});
