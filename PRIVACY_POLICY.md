# Privacy Policy for Messenger Enhancer & Privacy Guard

**Last updated:** October 16, 2026

**Messenger Enhancer & Privacy Guard** ("we", "our", or "extension") is committed to protecting your privacy. This Privacy Policy explains how our browser extension handles user data.

---

## 1. Zero Data Collection & Storage
We believe in absolute data privacy. 

* **No Personal Data Collection:** We do **NOT** collect, log, transmit, track, or share any personal information, messages, contact details, Facebook account credentials, or browsing history.
* **No Telemetry or Tracking:** The extension contains **no analytics software, tracking pixels, or external code execution**.
* **100% Client-Side Operation:** All core functions (privacy blur filters, screenshot utilities, and text formatting) run entirely within your local browser instance.

---

## 2. Extension Permissions Explained
Our extension requests specific permissions strictly necessary for its features to function locally on your device:

* **`storage`**: Used exclusively to save your UI preferences (such as blur intensity level, compact mode state, and font size settings) locally on your device via `chrome.storage.sync`.
* **`declarativeNetRequest`**: Used strictly to suppress outgoing network requests for typing status indicators and read receipts to provide the user-enabled "Stealth Mode" feature.
* **Host Permissions (`https://*.messenger.com/*` & `https://*.facebook.com/*`)**: Used solely to apply CSS styles, layout adjustments, and keyboard event listeners while navigating Facebook Messenger Web.

---

## 3. Third-Party Services
The extension does **not** communicate with any third-party servers, databases, or cloud services. 

Optional external links embedded within the extension UI (such as Buy Me a Coffee, GitHub, and developer website links) open directly in your browser and are subject to their respective privacy policies.

---

## 4. Changes to This Privacy Policy
We may update this Privacy Policy from time to time to reflect functional updates or regulatory compliance. Any changes will be posted directly in this repository.

---

## 5. Contact & Support
If you have any questions or concerns regarding this Privacy Policy or the security of the extension, feel free to open an issue on GitHub or reach out:

* **Developer:** lstvelasco
* **Website:** [velascode.com](https://velascode.com)
* **GitHub Repository:** [github.com/lstvelasco/messenger-enhancer](https://github.com/lstvelasco/messenger-enhancer)