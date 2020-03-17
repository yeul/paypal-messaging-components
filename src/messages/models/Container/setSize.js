import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import arrayEvery from 'core-js-pure/stable/array/every';
import objectEntries from 'core-js-pure/stable/object/entries';

import { curry, objectGet, createCallbackError } from '../../../utils';
import events from './events';
import { ERRORS } from '../../services/logger';
import { getMinimumWidthOptions } from '../../../locale';

const ratioMap = {
    '1x1': [
        {
            ratio: '1x1',
            width: [120, 300]
        }
    ],
    '1x4': [
        {
            ratio: '1x2',
            width: [160, 160]
        },
        {
            ratio: '1x4',
            breakpoint: 768
        }
    ],
    '8x1': [
        {
            ratio: '6x1',
            width: [250, 768]
        },
        {
            ratio: '8x1',
            breakpoint: 768
        }
    ],
    '20x1': [
        {
            ratio: '6x1',
            width: [250, 768]
        },
        {
            ratio: '20x1',
            width: [350, 1169],
            breakpoint: 768
        }
    ]
};

function toCSSValue(value) {
    if (typeof value === 'number') {
        return `${value}px`;
    }

    if (typeof value === 'string') {
        const match = value.match(/^(\d+)x(\d+)$/);

        if (match) {
            return `${match.slice(1).reduce((denominator, numerator) => +numerator / +denominator) * 100}%`;
        }
    }

    return value;
}

function ratioStringToObject(value) {
    // Matches the following example: 1x4@500px[300px,700px]
    // All parts are optional except for the ratio
    // ratio - 1x4
    // breakpoint - 500px
    // min-width - 300px
    // max-width: 700px
    const [ratio, ...optionalRules] = value.split(/(?=[@[])/);

    if (!ratio.match(/\d+x\d+/)) return {};

    // TODO: Should we validate these values?
    const ratioObject = optionalRules.reduce(
        (accumulator, rule) => {
            if (stringStartsWith(rule, '@')) {
                accumulator.breakpoint = rule.slice(1);
            } else if (stringStartsWith(rule, '[')) {
                accumulator.width = rule.slice(1, -1).split(',');
            }

            return accumulator;
        },
        { ratio }
    );

    return ratioObject;
}

function insertFlexStyle(wrapper, ratioPreset, layout) {
    let ratioConfig = [];
    if (layout === 'flex') {
        ratioConfig = ratioMap[ratioPreset];
    } else if (Array.isArray(ratioPreset)) {
        ratioConfig = ratioPreset.map(ratioStringToObject);
    } else if (typeof ratioPreset === 'string') {
        ratioConfig = [ratioStringToObject(ratioPreset)];
    }

    const wrapperClass = `pp-flex--${ratioConfig.slice(-1)[0].ratio}`;

    const totalStyle = ratioConfig.reduce((accumulator, { breakpoint, ratio, width }) => {
        if (accumulator === '') {
            return `
                .${wrapperClass} {
                    display: block;
                    width: 100%;
                    ${
                        Array.isArray(width)
                            ? `
                                min-width: ${toCSSValue(width[0])};
                                max-width: ${toCSSValue(width[1])};`
                            : ``
                    }
                    box-sizing: border-box;
                    position: relative;
                }
        
                .${wrapperClass}::before {
                    padding-top: ${toCSSValue(ratio)};
                    content: '';
                    display: block;
                }
        
                .${wrapperClass} iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            `;
        }

        if (!breakpoint) return accumulator;

        return `
            ${accumulator}
            @media (min-width: ${toCSSValue(breakpoint)}) {
                ${
                    Array.isArray(width)
                        ? `
                            .${wrapperClass} {
                                min-width: ${toCSSValue(width[0])};
                                max-width: ${toCSSValue(width[1])};
                            }`
                        : ``
                }
                .${wrapperClass}::before {
                    padding-top: ${toCSSValue(ratio)};
                }
            }
        `;
    }, '');

    const flexStyle = document.createElement('style');
    flexStyle.textContent = totalStyle;

    wrapper.setAttribute('class', wrapperClass);
    wrapper.appendChild(flexStyle);
}

function getContainerWidth(wrapper) {
    const div = document.createElement('div');
    // Add an explicit size, to prevent incorrect size calculation when merchant styles leak into this div
    div.setAttribute('style', 'width: 100%; overflow: hidden');

    // Add an inner div to force the container as large as it can be, specifically inside a flex container
    const forceFullWidth = document.createElement('div');
    forceFullWidth.setAttribute('style', 'width: 10000px');
    div.appendChild(forceFullWidth);

    wrapper.parentNode.appendChild(div);

    const parentWidth = div.offsetWidth;
    wrapper.parentNode.removeChild(div);

    return parentWidth;
}

export default curry((container, { wrapper, options, logger, meta }) => {
    if (container.tagName !== 'IFRAME') return;

    const layout = objectGet(options, 'style.layout');
    const ratio = objectGet(options, 'style.ratio');

    if ((layout === 'flex' || layout === 'custom') && ratio) {
        insertFlexStyle(wrapper, ratio, layout);
        container.setAttribute('style', `width: 100%; border: none;`);
        container.removeAttribute('height');
    } else {
        const { minWidth } = meta;
        // Reset iframe incase of rerender using same container
        container.setAttribute('style', 'width: 100%; border: none;');
        if (minWidth) {
            container.style.setProperty('min-width', `${minWidth}px`);
        }
        // If a banner is rerendered from 'flex' to 'text' the wrapper will still have the ratio wrapper class applied
        wrapper.removeAttribute('class');

        const parentContainerWidth = getContainerWidth(wrapper);
        // container.offsetParent to check if container is nested inside 'display: none'

        const setDimensions = () => {
            // TODO: Setting the height causes this to fire again
            container.setAttribute(
                'height',
                (container.contentWindow.document.body.lastChild &&
                    container.contentWindow.document.body.lastChild.offsetHeight) ||
                    container.contentWindow.document.body.scrollHeight
            ); // container.contentWindow.document.documentElement.scrollHeight);
        };

        if (minWidth && parentContainerWidth < minWidth && layout !== 'custom') {
            const minSizeOptions = getMinimumWidthOptions();
            if (arrayEvery(objectEntries(minSizeOptions), ([key, val]) => objectGet(options, key) === val)) {
                logger.error({ name: ERRORS.MESSAGE_HIDDEN });
                logger.warn(
                    `Message hidden. PayPal Credit Message fallback requires minimum width of ${minWidth}px. Current container is ${parentContainerWidth}px. Message hidden.`
                );

                container.setAttribute('data-pp-message-hidden', 'true');
            } else {
                logger.warn(
                    `Message Overflow. PayPal Credit Message of layout type ${objectGet(
                        options,
                        'style.layout'
                    )} requires a width of at least ${minWidth}px. Current container is ${parentContainerWidth}px. Attempting fallback message.`
                );

                // Thrown error skips the rest of the render pipeline and is caught at the end
                throw createCallbackError(ERRORS.MESSAGE_OVERFLOW, () => {
                    // Highest priority styles, will re-render from attribute observer
                    objectEntries(minSizeOptions).forEach(([key, val]) => {
                        const attributeKey = `data-pp-${key.replace(/\./g, '-')}`;
                        wrapper.parentNode.setAttribute(attributeKey, val);
                    });
                });
            }
        } else {
            setDimensions();
            events(container).on('resize', setDimensions);
        }
    }

    /**
     * @param el - This represents the immediate parent to the <div class="messages"></div> banner element.
     * @param i - This is what we're going to start from when we iterate over parent elements. If we say
     * i <= 3 in the while-loop, we want to then stop at the 3rd parent up from the banner element.
     *
     * @param while el.tagName !== 'BODY' && i <= 3
     * While the element isn't the BODY element, and we're on the 3rd parent from the banner element (the ".messages" div) we do the following:
     * * if the element's height is less than the message iframe's height we'll log a warning and set the display of the message
     * to "none", then break the loop.
     * * Otherwise, we set the el to the current el's parent and iterate i++.
     */
    if (options.style.layout === 'text' && wrapper.parentNode.parentNode && logger) {
        let el = wrapper.parentNode.parentNode;
        let i = 0;
        while (el.tagName !== 'BODY' && i <= 3) {
            if (el.clientHeight < container.getAttribute('height')) {
                logger.warn(
                    `Message hidden. PayPal Credit Message of layout type text requires a height of at least ${container.getAttribute(
                        'height'
                    )}px. Current container is ${el.clientHeight}px. Message hidden.`
                );
                /* eslint-disable-next-line no-param-reassign */
                wrapper.style.display = 'none';
                break;
            }

            if (!el.parentNode) break;

            el = el.parentNode;
            /* eslint-disable-next-line no-plusplus */
            i++;
        }
    }
});
