'use client'

import type {
  ICheckoutCardOption,
  ICheckoutPaymentOption,
  ICheckoutDeliveryOption,
} from 'src/types/checkout';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Grid from '@mui/material/Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { Form } from 'src/components/hook-form';

import { PaymentNewCardForm } from '../payment/payment-new-card-form';

// ----------------------------------------------------------------------

const DELIVERY_OPTIONS: ICheckoutDeliveryOption[] = [
  { value: 0, label: 'Free', description: '5-7 days delivery' },
  { value: 10, label: 'Standard', description: '3-5 days delivery' },
  { value: 20, label: 'Express', description: '2-3 days delivery' },
];

const PAYMENT_OPTIONS: ICheckoutPaymentOption[] = [
  {
    value: 'paypal',
    label: 'Pay with Paypal',
    description: 'You will be redirected to PayPal website to complete your purchase securely.',
  },
  {
    value: 'creditcard',
    label: 'Credit / Debit card',
    description: 'We support Mastercard, Visa, Discover and Stripe.',
  },
  { value: 'cash', label: 'Cash', description: 'Pay with cash when your order is delivered.' },
];

const CARD_OPTIONS: ICheckoutCardOption[] = [
  { value: 'visa1', label: '**** **** **** 1212 - Jimmy Holland' },
  { value: 'visa2', label: '**** **** **** 2424 - Shawn Stokes' },
  { value: 'mastercard', label: '**** **** **** 4545 - Cole Armstrong' },
];

// ----------------------------------------------------------------------

export type PaymentSchemaType = zod.infer<typeof PaymentSchema>;

export const PaymentSchema = zod.object({
  payment: zod.string().min(1, { message: 'Payment is required!' }),

});

// ----------------------------------------------------------------------

export function PayForApplicationView() {
  const defaultValues: PaymentSchemaType = {
    payment: '',
  };

  const methods = useForm<PaymentSchemaType>({
    resolver: zodResolver(PaymentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <PaymentNewCardForm />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Complete order
          </LoadingButton>
        </Grid>
      </Grid>
    </Form>
  );
}
