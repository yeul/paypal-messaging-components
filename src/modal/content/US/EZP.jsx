/** @jsx h */
import { h } from 'preact';

import { useXProps } from '../../lib/hooks';
import Icon from '../../parts/Icon';
import Calculator from '../../parts/Calculator';

const instructions = [
    ['monogram', 'Choose PayPal Credit at checkout and use the Easy Payment plan that works for you.'],
    ['calendar', 'Split your purchase into monthly payments, with nothing due for at least 25 days.'],
    ['truck', "If your items ship separately, we'll split the price of each item across your equal monthly payments."]
];

export const Header = () => {
    const { onClick } = useXProps();

    return (
        <div className="content-header">
            <div className="content-header__image-wrapper">
                <div style={{ width: '115%' }}>
                    <Icon name="cart" />
                </div>
            </div>
            <h1 className="content-header__title">Split your purchases into monthly payments</h1>
            <p className="content-header__tag">Subject to credit approval.</p>
            <a
                onClick={() => onClick('Apply Now')}
                href="https://www.paypal.com/ppcreditapply/da/us?cats_id=DA_AD_OTHER"
                target="_blank"
                rel="noopener noreferrer"
            >
                <button className="content-header__button" type="button">
                    Apply Now
                </button>
            </a>
        </div>
    );
};

export const Content = () => {
    const { onClick } = useXProps();

    return (
        <section className="content-body">
            <Calculator />

            <hr className="content-body__divider" />

            <h2 className="content-body__title">How it works</h2>
            <ul className="content-body__instructions-list">
                {instructions.map(([icon, instruction]) => (
                    <li className="content-body__instructions-item">
                        <div>
                            <Icon name={icon} />
                        </div>
                        <p>{instruction}</p>
                    </li>
                ))}
            </ul>

            <hr className="content-body__divider" />

            <h2 className="content-body__title">About promotional offers</h2>
            <p>
                PayPal Credit promotional offers may vary depending on when and where you shop. Offers aren&apos;t valid
                on previous returns, refunds, and exchanges, or when using the Send Money feature in your PayPal
                account.
            </p>

            <hr className="content-body__divider" />

            <div className="content-body__terms">
                <p>
                    <a
                        onClick={() => onClick('Legal Terms')}
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.paypal.com/us/webapps/mpp/ppcterms"
                    >
                        Click here
                    </a>{' '}
                    to view the PayPal Credit Terms and Conditions.
                </p>
                <p>
                    PayPal Credit is subject to credit approval as determined by the lender, Synchrony Bank, and is
                    available to US customers who are of legal age in their state of residence. You must pay with PayPal
                    Credit to get the offers. Offers not valid on previous purchases, returns or exchanges. Minimum
                    purchase required is before shipping and tax. For New Accounts: Variable Purchase APR is 25.99%. The
                    APR is accurate as of 9/1/2019 and will vary with the market based on the Prime Rate (as defined in
                    your credit card agreement). Minimum interest charge is $2.00.
                </p>
                <p>Copyright {new Date().getFullYear()} Bill Me Later, Inc. All rights reserved.</p>
            </div>
        </section>
    );
};
