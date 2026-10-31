chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.warn("Buddy: side panel setup failed", error));

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["buddyApiUrl"], (values) => {
    if (!values.buddyApiUrl) {
      chrome.storage.local.set({ buddyApiUrl: "http://127.0.0.1:8787" });
    }
  });
});
