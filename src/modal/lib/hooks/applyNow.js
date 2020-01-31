import { useXProps } from './helpers';
import useTransitionState from './transitionState';

export default clickTitle => {
    const { onClick, payerId, clientId, amount, refId, onApply } = useXProps();
    const [, handleClose] = useTransitionState();

    return () => {
        onClick(clickTitle);
        /**
         * If onApply exists as an option passed in by the merchant for analytics, run onApply.
         * The function is defined by the merchant, but is optional.
         * Clicking the "Apply Now" button will trigger this function.
         */
        if (onApply) {
            onApply();
        }
        // TODO: Get finalized query param keys
        const win = window.open(
            `https://www.paypal.com/ppcreditapply/da/us?cats_id=DA_AD_OTHER&actor=merchant&mktgrefid=${refId}&amount=${amount}&${
                payerId ? `payer_id=${payerId}` : `client_id=${clientId}`
            }`
        );
        const intervalId = setInterval(() => {
            if (win.closed) {
                clearInterval(intervalId);
                handleClose('Apply Now Application Close');
            }
        }, 500);
    };
};
