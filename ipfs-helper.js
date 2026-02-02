const HELPER = "https://adde9708.github.io/ipfs-helper/?url=";

function isIPFS(url) {
  return url.startsWith("ipfs://") || url.startsWith("ipns://");
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link) return;

  // Require Alt+click so normal navigation isn't hijacked
  if (!event.altKey) return;

  const url = link.href;
  if (!isIPFS(url)) return;

  event.preventDefault();
  window.open(HELPER + encodeURIComponent(url), "_blank", "noopener");
});
