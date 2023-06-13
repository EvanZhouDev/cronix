import toast from 'react-hot-toast';

import useIsMobile from "./useIsMobile.js"
export default function useCustomToaster() {
    let isMobile = useIsMobile();
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
        position: isMobile ? "bottom-center" : "top-right"
    }
    function success(msg) {
        toast.success(msg, style)
    };
    function error(msg) {
        toast.error(msg, style)
    };
    function message(msg) {
        toast(msg, style)
    };

    return { success, error, message }
}