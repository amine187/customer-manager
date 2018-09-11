export interface Toastr {
    maxOpened?: number; // max toasts opened. Toasts will be queued
    autoDismiss?: boolean; // dismiss current toast when max is reached
    iconClasses?: Icon; // classes used on toastr service methods
    newestOnTop?: boolean; // new toast placement
    preventDuplicates?: boolean; // block duplicate messages
    closeButton?: boolean; // show close button
    timeOut?: number; // time to live in milliseconds
    enableHtml?: boolean; // allow html in message. (UNSAFE)
    extendedTimeOut?: number; // time to close after a user hovers over toast
    progressBar?: boolean; // show progress bar
    toastClass?: string; // class on toast
    positionClass?: string; // class on toast
    titleClass?: string; // class inside toast on title
    messageClass?: string; // class inside toast on message
    tapToDismiss?: boolean; // close on click
    onActivateTick?: boolean; // fire ApplicationRef.tick() from the toast component when activated. Helps show toast from a websocket event
};

interface Icon {
    error?: string;
    info?: string;
    success?: string;
    warning?: string;
}