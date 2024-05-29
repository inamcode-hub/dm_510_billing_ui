import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateState } from '../../../../lib/redux/features/payment/paymentSlice';
import { Divider, styled } from '@mui/material';

const taxRates: Record<string, { type: string; rate: number }> = {
  AB: { type: 'GST', rate: 0.05 },
  BC: { type: 'PST+GST', rate: 0.12 },
  MB: { type: 'PST+GST', rate: 0.12 },
  NB: { type: 'HST', rate: 0.15 },
  NL: { type: 'HST', rate: 0.15 },
  NS: { type: 'HST', rate: 0.15 },
  NT: { type: 'GST', rate: 0.05 },
  NU: { type: 'GST', rate: 0.05 },
  ON: { type: 'HST', rate: 0.13 },
  PE: { type: 'HST', rate: 0.15 },
  QC: { type: 'QST+GST', rate: 0.14975 },
  SK: { type: 'PST+GST', rate: 0.11 },
  YT: { type: 'GST', rate: 0.05 },
};

const getCurrency = (country: string) => {
  switch (country) {
    case 'US':
      return 'USD';
    case 'CA':
      return 'CAD';
    default:
      return 'USD';
  }
};

const AmountCalculator: React.FC = () => {
  const dispatch = useDispatch();
  const { country, province, packagePrices, packageName, packageSerialNumber } =
    useSelector((state: any) => state.payment);

  const [taxType, setTaxType] = useState('');
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [packagePrice, setPackagePrice] = useState(0);

  useEffect(() => {
    const price =
      packagePrices[country]?.[packageName] ||
      packagePrices['default'][packageName];

    setPackagePrice(price);

    let calculatedTax = 0;

    if (country === 'CA' && taxRates[province]) {
      const taxRateInfo = taxRates[province];
      calculatedTax = price * taxRateInfo.rate;
      setTaxType(taxRateInfo.type);
      setTaxAmount(calculatedTax);
    } else {
      setTaxType('No Tax');
      setTaxAmount(0);
    }

    const calculatedTotal = price + calculatedTax;
    setTotalPrice(calculatedTotal);

    // Update packagePrice in the Redux store
    dispatch(updateState({ key: 'packagePrice', value: calculatedTotal }));
  }, [country, province, packagePrices, packageName, dispatch]);

  const currency = getCurrency(country);

  return (
    <React.Fragment>
      <Wrapper>
        <div className="dryermaster-serial-numbers">
          <span>
            {packageSerialNumber.length > 1
              ? 'Dryermaster Serial Numbers:'
              : 'Dryermaster Serial Number:'}
          </span>
          <span>{packageSerialNumber.join(', ')}</span>
        </div>
        <div className="package-name">
          <span>Package Name:</span> <span>{packageName}</span>
        </div>
        <div className="package-price">
          <span>Package Price:</span>
          <span>{packagePrice.toFixed(2)}</span>
        </div>
        {country === 'CA' ? (
          <>
            <div className="tax-type">
              <span>Tax Type:</span> <span>{taxType}</span>
            </div>
            <div className="tax-amount">
              <span>Tax Amount:</span>
              <span>{taxAmount.toFixed(2)}</span>
            </div>
          </>
        ) : (
          <div className="tax-amount">
            <span>Tax Amount:</span> <span>0.00 {currency}</span>
          </div>
        )}
        <Divider />
        <div className="total-price">
          <span>Total Price:</span>
          <span>
            {totalPrice.toFixed(2)} {currency}
          </span>
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled('div')({
  margin: '1rem 0',

  border: '1px solid #ccc',
  borderRadius: '5px',

  '& span:first-of-type': {
    fontWeight: 'bold',
  },
  '& div': {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0.3rem 0',
    padding: '0.5rem',
  },
});
export default AmountCalculator;
