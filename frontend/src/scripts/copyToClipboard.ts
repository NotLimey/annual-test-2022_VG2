function fallbackCopyTextToClipboard(text: string): boolean {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        return true;
    } catch (err) {
        return false;
    }

    document.body.removeChild(textArea);
}
export default async function copyTextToClipboard(text: string): Promise<boolean> {
    if (!navigator.clipboard) {
        var val = fallbackCopyTextToClipboard(text);
        return val;
    }
    var successful = true;
    await navigator.clipboard.writeText(text).then(s => successful = true).catch(() => successful = false);
    return successful;
}