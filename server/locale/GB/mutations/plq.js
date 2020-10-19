import Logo from '../logos';
import {
    textWrap,
    messageLogoWidth,
    xSmallFallback,
    smallFallback,
    logo20x1,
    setLogoTop
} from '../../../message/mediaQueries';
import { textLogoMutations, flexLogoMutations } from './common';

export default {
    'layout:text': [
        [
            'default',
            ({ textSize }) => ({
                styles: [
                    `.message__headline > .tag--medium .weak.br { white-space: nowrap; }`,
                    xSmallFallback(textSize * 16),
                    textWrap(textSize * 32, textSize, '.locale--GB'),
                    messageLogoWidth(false, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PRIMARY.COLOR,
                headline: [
                    {
                        tag: 'medium',
                        br: ['payments']
                    },
                    { tag: 'xsmall' }
                ],
                disclaimer: ['default']
            })
        ],
        [
            'logo.type:primary && logo.position:right',
            ({ textSize }) => ({
                styles: [
                    `.message__headline > .tag--medium .weak.br { white-space: nowrap; }`,
                    `@media screen and (max-width: ${textSize *
                        14.15}px) { .message__headline > .tag--medium > span > span:first-child { white-space: normal; } }`,
                    xSmallFallback(textSize * 10.75),
                    setLogoTop(textSize * 31 + 10),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:primary && logo.position:top',
            ({ textSize }) => ({
                styles: [
                    `.message__headline > .tag--medium .weak.br { white-space: nowrap; }`,
                    `@media screen and (max-width: ${textSize *
                        14.15}px) { .message__headline > .tag--medium > span > span:first-child { white-space: normal; } }`,
                    xSmallFallback(textSize * 10.75),
                    messageLogoWidth(textSize * 6, textSize * 4, textSize * 1.25)
                ]
            })
        ],
        [
            'logo.type:alternative',
            ({ textSize }) => ({
                styles: [
                    `.message__headline > .tag--medium .weak.br { display: inline-block; transform: translateX(-3.8px); white-space: nowrap; } .message__messaging span.br { white-space: nowrap; }`,
                    `@media screen and (max-width: ${textSize * 10.6}px) { .message__content { white-space: nowrap; }}`,
                    textWrap(textSize * 32, textSize, '.locale--GB'),
                    xSmallFallback(textSize * 11.5),
                    messageLogoWidth(textSize * 1.75, textSize * 4, textSize * 1.25)
                ],
                logo: Logo.PRIMARY.COLOR[0]
            })
        ],
        [
            'logo.type:none',
            ({ textSize }) => ({
                styles: [smallFallback(textSize * 17)],
                logo: false,
                headline: [
                    {
                        tag: 'medium'
                    },
                    {
                        tag: 'small',
                        replace: [['later.', 'later']]
                    }
                ]
            })
        ],
        [
            'logo.type:inline',
            ({ textSize }) => ({
                styles: [smallFallback(textSize * 17 + 4), `.message__logo { width: ${textSize * 4}px }`],
                logo: Logo.ALT_NO_PP.COLOR,
                headline: [
                    {
                        tag: 'medium'
                    },
                    {
                        tag: 'small',
                        replace: [['later.', 'later']]
                    }
                ]
            })
        ],
        ...textLogoMutations
    ],

    'layout:flex': [
        [
            'default',
            {
                logo: Logo.PRIMARY.WHITE,
                headline: [
                    {
                        tag: 'xsmall'
                    },
                    {
                        tag: 'medium'
                    }
                ],
                disclaimer: ['default'],
                styles: [
                    '.message__headline .tag--medium > span:first-child:after { content: "."; }',
                    '.message__headline .tag--medium .weak { display: none; }'
                ]
            }
        ],
        [
            'ratio:20x1',
            {
                styles: [
                    logo20x1(),
                    '.message__headline .tag--medium .weak { display: none; }',
                    '.message__headline .tag--medium > span:first-child:after { content: "."; }'
                ]
            }
        ],
        [
            'ratio:8x1',
            {
                headline: [
                    {
                        tag: 'xsmall'
                    },
                    {
                        tag: 'medium',
                        br: ['payments']
                    }
                ],
                styles: [
                    '.message__headline .tag--medium > span:first-child > span:last-child:after { content: "."; }',
                    '.message__headline .tag--medium .weak { display: none; }',
                    '@media (min-aspect-ratio: 80/11) { .message__disclaimer { margin-left: 0;} }'
                ]
            }
        ],
        ...flexLogoMutations
    ]
};
