const HELPER = "https://adde9708.github.io/ipfs-helper/?url=";

function isIPFSorIPNS(url) {
  if (/^ip(f|n)s:\/\//i.test(url)) return true;

  try {
    const parsed = new URL(url.toLowerCase());
    if (
      parsed.hostname.includes("ipfs") ||
      parsed.hostname.includes("ipns") ||
      parsed.pathname.startsWith("/ipfs/") ||
      parsed.pathname.startsWith("/ipns/")
    )
      return true;
  } catch {
    return false;
  }

  return false;
}

function normalizeToIPFSorIPNS(url) {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname;

    if (path.startsWith("/ipfs/")) {
      return "ipfs://" + path.slice(6);
    }
    if (path.startsWith("/ipns/")) {
      return "ipns://" + path.slice(6);
    }

    if (parsed.hostname.startsWith("ipns.")) {
      const domain = parsed.hostname.slice(5);
      return "ipns://" + domain + parsed.pathname;
    }

    if (parsed.hostname.includes(".ipfs.")) {
      const parts = parsed.hostname.split(".ipfs.");
      const cid = parts[0];
      return "ipfs://" + cid + parsed.pathname;
    }

    return url;
  } catch {
    return url;
  }
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link) return;
  if (!event.altKey) return;

  const url = link.href;
  if (!isIPFSorIPNS(url)) return;

  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  const normalizedUrl = normalizeToIPFSorIPNS(url);

  window.location.href = HELPER + encodeURIComponent(normalizedUrl);
});
