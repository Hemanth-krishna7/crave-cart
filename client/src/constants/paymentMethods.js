export const PAYMENT_METHODS = [
  {
    id: 'cod',
    label: 'Cash on Delivery',
    description: 'Pay with cash upon delivery of your order.',
    icon: '💵',
  },
  {
    id: 'upi',
    label: 'UPI (Paytm, Google Pay, PhonePe)',
    description: 'Pay instantly using your preferred UPI application.',
    icon: '📱',
  },
  {
    id: 'card',
    label: 'Credit / Debit Card',
    description: 'Pay securely using Visa, Mastercard, or RuPay cards.',
    icon: '💳',
  },
];
export const DEFAULT_PAYMENT_METHOD = 'cod';
