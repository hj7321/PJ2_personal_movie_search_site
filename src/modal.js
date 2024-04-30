export const openModal = (content) => {
  const $modalBox = document.querySelector(".modal-box");
  const $message = document.querySelector(".message");
  const $checkBtn = document.querySelector(".check-btn");
  $modalBox.style.display = "flex";
  $message.textContent = content;
  $checkBtn.addEventListener("click", () => ($modalBox.style.display = "none"));
};
