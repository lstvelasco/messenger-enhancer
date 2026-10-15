// ---------------------------------------------------------
// 1. PRIVACY & UI ENHANCEMENT SETTINGS
// ---------------------------------------------------------
function applyEnhancerSettings() {
  chrome.storage.sync.get(
    {
      enabled: true,
      blurSidebar: true,
      blurMainChat: true,
      allowHover: true,
      blurLevel: 8,
      compactMode: false,
      hideTyping: true,
      chatFontSize: 15,
    },
    (data) => {
      const bodyClass = document.body.classList;

      bodyClass.toggle("privacy-enabled", data.enabled);
      bodyClass.toggle("blur-sidebar", data.blurSidebar);
      bodyClass.toggle("blur-main-chat", data.blurMainChat);
      bodyClass.toggle("allow-hover", data.allowHover);
      bodyClass.toggle("compact-chat-mode", data.compactMode);
      bodyClass.toggle("hide-typing-indicator", data.hideTyping);

      document.documentElement.style.setProperty(
        "--privacy-blur-amount",
        `${data.blurLevel}px`,
      );
      document.documentElement.style.setProperty(
        "--chat-font-size",
        `${data.chatFontSize}px`,
      );
    },
  );
}

applyEnhancerSettings();

chrome.storage.onChanged.addListener(() => {
  applyEnhancerSettings();
});

// ---------------------------------------------------------
// 2. SELECTIVE UNHIDE / REVEAL VIA CTRL + LEFT CLICK (PER-ROW TARGETING)
// ---------------------------------------------------------
document.addEventListener(
  "click",
  (e) => {
    if (!e.ctrlKey && !e.metaKey) return;

    // Direct targeting: hanapin ang pinakamalapit na row container
    // Sa KANAN: hanapin ang outer [role="article"] o div[aria-roledescription="message"]
    // Sa KALIWA: hanapin ang [role="gridcell"]
    let targetRow = e.target.closest(
      '[role="article"], div[aria-roledescription="message"], [role="gridcell"]',
    );

    // Fallback: Kapag mas malalim na element ang na-click sa kanan, umakyat hanggang sa pinaka-outer article
    if (!targetRow) {
      const mainChat = e.target.closest('[role="main"]');
      if (mainChat) {
        let parent = e.target;
        while (parent && parent !== mainChat) {
          if (
            parent.getAttribute &&
            (parent.getAttribute("role") === "article" ||
              parent.getAttribute("aria-roledescription") === "message")
          ) {
            targetRow = parent;
            break;
          }
          parent = parent.parentElement;
        }
      }
    }

    if (targetRow) {
      e.preventDefault();
      e.stopPropagation();

      // I-toggle ang custom-revealed class
      targetRow.classList.toggle("custom-revealed");
    }
  },
  true,
);

// Pindutin ang 'ESC' key para i-reset ang lahat ng in-unhide
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".custom-revealed").forEach((el) => {
      el.classList.remove("custom-revealed");
    });
  }
});

// ---------------------------------------------------------
// 3. CHAT FORMATTING & SMART TEXT TRANSFORMATION
// ---------------------------------------------------------
document.addEventListener(
  "keydown",
  (e) => {
    const activeEl = document.activeElement;

    if (!activeEl || activeEl.getAttribute("role") !== "textbox") return;

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const selectedText = selection.toString();
    if (!selectedText) return;

    const isCmdOrCtrl = e.ctrlKey || e.metaKey;
    let transformedText = null;

    // --- A. MARKDOWN FORMATTING ---
    if (
      isCmdOrCtrl &&
      !e.shiftKey &&
      !e.altKey &&
      e.key.toLowerCase() === "b"
    ) {
      transformedText = `*${selectedText}*`;
    } else if (
      isCmdOrCtrl &&
      !e.shiftKey &&
      !e.altKey &&
      e.key.toLowerCase() === "i"
    ) {
      transformedText = `_${selectedText}_`;
    } else if (
      isCmdOrCtrl &&
      e.shiftKey &&
      !e.altKey &&
      e.key.toLowerCase() === "x"
    ) {
      transformedText = `~${selectedText}~`;
    } else if (
      isCmdOrCtrl &&
      e.shiftKey &&
      !e.altKey &&
      e.key.toLowerCase() === "m"
    ) {
      transformedText = `\`${selectedText}\``;
    }

    // --- B. SMART TEXT CASE TRANSFORMATION ---
    else if (e.altKey && !isCmdOrCtrl && !e.shiftKey) {
      const key = e.key.toLowerCase();

      if (key === "u") {
        transformedText = selectedText.toUpperCase();
      } else if (key === "l") {
        transformedText = selectedText.toLowerCase();
      } else if (key === "t") {
        transformedText = selectedText
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase());
      }
    }

    if (transformedText !== null) {
      e.preventDefault();
      e.stopPropagation();

      document.execCommand("insertText", false, transformedText);
    }
  },
  true,
);
