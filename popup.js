const supportedSites = {
  "www.roblox.com": "Roblox"
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const url = new URL(tabs[0].url);
  const domain = url.hostname;
  const siteLabel = supportedSites[domain];

  document.getElementById("site").textContent = `Site: ${domain}`;

  if (siteLabel) {
    document.getElementById("status").textContent = `✅ Supported: ${siteLabel}`;
    document.getElementById("status").classList.add("supported");
  } else {
    document.getElementById("status").textContent = `❌ Not supported`;
    document.getElementById("status").classList.add("unsupported");
  }
});

// Versioning and Update Check Simulation
const currentVersion = '1.0';
document.getElementById("version").textContent = currentVersion;

const checkForUpdates = () => {
  document.getElementById("updateStatus").textContent = 'Checking for updates...';

  // Simulate an update check
  setTimeout(() => {
    const latestVersion = '1.1'; // Assume the latest version is 1.1
    if (currentVersion !== latestVersion) {
      document.getElementById("updateStatus").textContent = `🚨 Update Available: ${latestVersion}`;
    } else {
      document.getElementById("updateStatus").textContent = `✅ You are up to date!`;
    }
  }, 2000); // Simulate delay
};

document.getElementById("checkUpdateBtn").addEventListener('click', checkForUpdates);
