import toast from 'react-hot-toast';

let style = {
    style: {
        border: '1px solid var(--highlight-color)',
        padding: '16px',
        color: 'var(--font-color)',
        backgroundColor: 'var(--bg-color)',
        zIndex: "200"
    },
    iconTheme: {
        primary: ' var(--highlight-color)',
        secondary: 'var(--bg-color)',
    },
}
export function success(msg) {
    toast.success(msg, style)
};
export function error(msg) {
    toast.error(msg, style)
};
export function message(msg) {
    toast(msg, style)
};