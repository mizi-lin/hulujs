export const open = (url: string, target: '_blank' | '_self' = '_blank') => {
    const a = document.createElement('a');
    a.href = url;
    a.target = target;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        a.parentElement?.removeChild(a);
    }, 30);
};
