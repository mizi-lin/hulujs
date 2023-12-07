export const open = (url, target = '_blank') => {
    const a = document.createElement('a');
    a.href = url;
    a.target = target;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        a.parentElement?.removeChild(a);
    }, 30);
};
