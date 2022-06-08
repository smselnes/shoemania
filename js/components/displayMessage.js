export function displayMessage(messageType, message, targetElement) {
  const element = document.querySelector(targetElement);

  element.innerHTML = `<div class="p-1 message ${messageType}">${message}</div>`;
}
