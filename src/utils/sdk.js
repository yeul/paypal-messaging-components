import arrayFrom from 'core-js-pure/stable/array/from';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import objectAssign from 'core-js-pure/stable/object/assign';

/* eslint-disable eslint-comments/disable-enable-pair, no-else-return */
import {
    getClientID,
    getMerchantID,
    getSDKScript,
    getEnv as getSDKEnv,
    getCurrency as getSDKCurrency,
    getSDKMeta
} from '@paypal/sdk-client/src';
import { base64decode, base64encode } from 'belter/src';

// SDK helper functions with standalone build polyfills

export function getEnv() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKEnv();
    } else {
        return __ENV__;
    }
}

export function getAccount() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        // TODO: Should we pass both up if they exist so that nodeweb can create a partner context?
        return getMerchantID()[0] || `client-id:${getClientID()}`;
    } else {
        return undefined;
    }
}

export function getScript() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKScript();
    } else {
        return (
            // eslint-disable-next-line compat/compat
            document.currentScript ||
            document.querySelector('script[src$="messaging.js"]') ||
            document.querySelector('script[src$="merchant.js"]')
        );
    }
}

export function getCurrency() {
    if (__MESSAGES__.__TARGET__ === 'SDK') {
        return getSDKCurrency();
    } else {
        return undefined;
    }
}

export function getTargetMeta() {
    const metaObject = {
        componentUrl:
            getEnv() !== 'production'
                ? 'http://localhost.paypal.com:8080/smart-credit-modal.js'
                : `https://www.paypalobjects.com/upstream/bizcomponents/js/versioned/smart-credit-modal@${__MESSAGES__.__VERSION__}.js`
    };

    if (__MESSAGES__.__TARGET__ === 'SDK') {
        objectAssign(metaObject, JSON.parse(base64decode(getSDKMeta())));
    } else {
        const script = getScript();

        objectAssign(metaObject, {
            url: script ? script.src : 'https://www.paypalobjects.com/upstream/bizcomponents/js/messaging.js',
            attributes:
                script &&
                arrayFrom(script.attributes)
                    .filter(({ name }) => stringStartsWith(name, 'data-pp-'))
                    .map(({ name, value }) => [name, value])
        });
    }

    return base64encode(JSON.stringify(metaObject));
}
