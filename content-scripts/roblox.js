(async function () {
    const url = chrome.runtime.getURL("dictionaries/roblox.json");
    const res = await fetch(url);
    const translations = await res.json();

    function translateTextNodes() {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            let original = node.textContent;
            for (const [en, et] of Object.entries(translations)) {
                const regex = new RegExp(`\\b${en}\\b`, 'gi');
                original = original.replace(regex, et);
            }
            node.textContent = original;
        }
    }

    function translateAttributes() {
        const attributes = ['placeholder', 'title', 'alt', 'aria-label', 'value'];
        document.querySelectorAll('*').forEach(el => {
            attributes.forEach(attr => {
                let val = el.getAttribute(attr);
                if (val) {
                    for (const [en, et] of Object.entries(translations)) {
                        const regex = new RegExp(`\\b${en}\\b`, 'gi');
                        val = val.replace(regex, et);
                    }
                    el.setAttribute(attr, val);
                }
            });
        });
    }

    function translateAll() {
        translateTextNodes();
        translateAttributes();
    }

    translateAll();

    const observer = new MutationObserver(translateAll);
    observer.observe(document.body, { childList: true, subtree: true });
})();
