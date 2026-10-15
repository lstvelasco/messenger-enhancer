document.addEventListener("DOMContentLoaded", () => {
  const fields = [
    "togglePrivacy",
    "blurSidebar",
    "blurMainChat",
    "allowHover",
    "compactMode",
    "hideTyping",
  ];
  const blurRange = document.getElementById("blurRange");
  const blurVal = document.getElementById("blurVal");
  const fontSizeRange = document.getElementById("fontSizeRange");
  const fontVal = document.getElementById("fontVal");
  const resetBtn = document.getElementById("resetDefaults");

  // QR Modal Elements
  const btnShowQr = document.getElementById("btn-show-qr");
  const btnCloseQr = document.getElementById("btn-close-qr");
  const qrModal = document.getElementById("qr-modal");

  const defaultSettings = {
    enabled: true,
    blurSidebar: true,
    blurMainChat: true,
    allowHover: true,
    blurLevel: 8,
    compactMode: false,
    hideTyping: true,
    chatFontSize: 15,
  };

  function applyDataToUI(data) {
    document.getElementById("togglePrivacy").checked = data.enabled;
    document.getElementById("blurSidebar").checked = data.blurSidebar;
    document.getElementById("blurMainChat").checked = data.blurMainChat;
    document.getElementById("allowHover").checked = data.allowHover;
    document.getElementById("compactMode").checked = data.compactMode;
    document.getElementById("hideTyping").checked = data.hideTyping;

    blurRange.value = data.blurLevel;
    blurVal.textContent = `${data.blurLevel}px`;

    fontSizeRange.value = data.chatFontSize;
    fontVal.textContent = `${data.chatFontSize}px`;
  }

  // Load Settings
  chrome.storage.sync.get(defaultSettings, (data) => {
    applyDataToUI(data);
  });

  // Listeners for switches
  fields.forEach((id) => {
    document.getElementById(id).addEventListener("change", saveSettings);
  });

  // Listeners for sliders
  blurRange.addEventListener("input", () => {
    blurVal.textContent = `${blurRange.value}px`;
    saveSettings();
  });

  fontSizeRange.addEventListener("input", () => {
    fontVal.textContent = `${fontSizeRange.value}px`;
    saveSettings();
  });

  // Reset to Defaults Button Event
  resetBtn.addEventListener("click", () => {
    chrome.storage.sync.set(defaultSettings, () => {
      applyDataToUI(defaultSettings);
    });
  });

  // QR Modal Events
  if (btnShowQr && qrModal && btnCloseQr) {
    btnShowQr.addEventListener("click", () => {
      qrModal.style.display = "flex";
    });
    btnCloseQr.addEventListener("click", () => {
      qrModal.style.display = "none";
    });
  }

  function saveSettings() {
    chrome.storage.sync.set({
      enabled: document.getElementById("togglePrivacy").checked,
      blurSidebar: document.getElementById("blurSidebar").checked,
      blurMainChat: document.getElementById("blurMainChat").checked,
      allowHover: document.getElementById("allowHover").checked,
      blurLevel: parseInt(blurRange.value, 10),
      compactMode: document.getElementById("compactMode").checked,
      hideTyping: document.getElementById("hideTyping").checked,
      chatFontSize: parseInt(fontSizeRange.value, 10),
    });
  }
});
