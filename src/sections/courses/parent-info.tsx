'use client';

import type { components } from 'interfaces/interface';
import type { IDatePickerControl } from 'src/types/common';

import dayjs from 'dayjs';
import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Radio,
  Button,
  RadioGroup,
  Typography,
  FormControl,
  FormControlLabel,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useLanguage } from 'src/contexts/language-context';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { CountrySelect } from 'src/components/country-select';

import { CourseThankYou } from './thank-you/thank-you';
import { ParentInfoType } from './course-register-view';

// ----------------------------------------------------------------------

export type RegisterParentSchema = zod.infer<typeof RegisterParentSchema>;

export const RegisterParentSchema = zod.object({
  parent_name: zod.string().min(1),
  parent_lastname: zod.string().min(1),
  parent_pn: zod.string().min(1),
  parent_email: zod.string().email(),
  parent_phone: zod.string().min(1),
  relation: zod.string().default('parent'),
  parent_dob: zod.string().min(1),
  gender: zod.string().min(1).default('male'),
  nationality: zod.string().min(1).default('Georgia'),
  country: zod.string().min(1).default('Georgia'),
  address: zod.string().min(1),
  city: zod.string().min(1),
});

type ParentInfoProps = {
  course: components['schemas']['CourseDto'];
  parentInfo: ParentInfoType;
  setParentInfo: (info: ParentInfoType) => void;
  setActiveStep: (step: number) => void;
};

export function RegisterParentView(props: ParentInfoProps) {
  const { course, parentInfo, setParentInfo, setActiveStep } = props;

  const router = useRouter();

  const [startDate, setStartDate] = useState<IDatePickerControl>(dayjs(new Date()));

  const { renderLanguage } = useLanguage();

  const defaultValues = {
    parent_name: parentInfo.parent_name,
    parent_lastname: parentInfo.parent_lastname,
    parent_pn: parentInfo.parent_pn,
    parent_email: parentInfo.parent_email,
    parent_phone: parentInfo.parent_phone,
    relation: parentInfo.relation,
    parent_dob: parentInfo.parent_dob,
    gender: parentInfo.gender,
    nationality: parentInfo.nationality,
    country: parentInfo.country,
    address: parentInfo.address,
    city: parentInfo.city,
  };

  const methods = useForm<RegisterParentSchema>({
    resolver: zodResolver(RegisterParentSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  console.log('VALUES:', values);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const isValid = /^\+995 5\d{2} \d{3} \d{3}$/.test(data.parent_phone);

      if (!isValid) {
        setError('parent_phone', {
          message: renderLanguage(
            'ტელეფონის ფორმატი არასწორია',
            'Phone number format is incorrect'
          ),
        });
      }
      setParentInfo(data);
      setActiveStep(2);
    } catch (error) {
      console.log('SMTHIN', error);
    }
  });

  const renderBasicInfo = () => (
    <Stack spacing={3} sx={{ p: 3 }}>
      <Typography
        sx={{ fontFeatureSettings: "'case' on", textTransform: 'uppercase' }}
        variant="subtitle2"
      >
        {renderLanguage('საბაზისო ინფორმაცია', 'Basic information')}
      </Typography>
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <Field.Text name="parent_name" label={renderLanguage('მშობლის სახელი', 'Parent name')} />
        <Field.Text
          name="parent_lastname"
          label={renderLanguage('მშობლის გვარი', "Parent's last name")}
        />
      </Stack>
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <DatePicker
          openTo="year"
          views={['year', 'month', 'day']}
          label={renderLanguage('დაბადების თარიღი', 'date of birth')}
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue);
            setValue('parent_dob', dayjs(newValue).format('YYYY-MM-DD hh:mm'));
          }}
          slotProps={{ textField: { fullWidth: true } }}
        />
        <FormControl sx={{ width: '100%' }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={values.gender}
            name="radio-buttons-group"
            onChange={(e) => setValue('gender', e.target.value)}
          >
            <Stack spacing={3} direction="row">
              <FormControlLabel
                value="male"
                control={<Radio />}
                label={renderLanguage('კაცი', 'Male')}
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label={renderLanguage('ქალი', 'Femaie')}
              />
            </Stack>
          </RadioGroup>
        </FormControl>
      </Stack>
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <CountrySelect
          sx={{ width: '100%' }}
          label={renderLanguage('მოქალაქეობა', 'Nationality')}
          defaultValue={values.nationality}
          onChange={(e, value) => setValue('nationality', value)}
        />
        {/* <Field.Text name="parent_name" label={renderLanguage('მშობლის სახელი', 'Parent name')} /> */}
        <Field.Text name="parent_pn" label={renderLanguage('პირადი ნომერი', 'Personal number')} />
      </Stack>
    </Stack>
  );

  const renderAddress = () => (
    <Stack spacing={3} sx={{ p: 3 }}>
      <Typography
        sx={{ fontFeatureSettings: "'case' on", textTransform: 'uppercase' }}
        variant="subtitle2"
      >
        {renderLanguage('მისამართი', 'Address')}
      </Typography>
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <Field.Text name="address" label={renderLanguage('მისამართი', 'Address')} />
        <Field.Text name="city" label={renderLanguage('ქალაქი', 'City')} />
        <CountrySelect
          sx={{ width: '100%' }}
          label={renderLanguage('ქვეყანა', 'Country')}
          defaultValue={values.country}
          onChange={(e, value) => setValue('country', value)}
        />
      </Stack>
    </Stack>
  );

  const renderContactInfo = () => (
    <Stack spacing={3} sx={{ p: 3 }}>
      <Typography
        sx={{ fontFeatureSettings: "'case' on", textTransform: 'uppercase' }}
        variant="subtitle2"
      >
        {renderLanguage('მისამართი', 'Address')}
      </Typography>
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <Field.Text name="parent_email" label={renderLanguage('ელ.ფოსტა', 'Email')} />
        <Field.Text
          name="parent_phone"
          label={renderLanguage('ტელეფონის ნომერი', 'Phone number')}
          placeholder="+995 5XX XXX XXX"
          value={values.parent_phone}
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters

            // Handle complete deletion
            if (value === '') {
              setValue('parent_phone', '');
              return;
            }

            // If the user deletes back to just "+99", reset to "+995" or clear
            if (value === '99') {
              setValue('parent_phone', '+995');
              return;
            }

            // Handle backspace properly
            if (value.startsWith('995')) {
              value = value.slice(3); // Remove the country code for easier handling
            }

            let formattedValue = '+995';

            if (value.length > 0) {
              formattedValue += ` ${value.slice(0, 3)}`;
            }
            if (value.length > 3) {
              formattedValue += ` ${value.slice(3, 6)}`;
            }
            if (value.length > 6) {
              formattedValue += ` ${value.slice(6, 9)}`;
            }

            setValue('parent_phone', formattedValue.trim());
          }}
        />
      </Stack>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        <Card>
          <Divider />
          {renderBasicInfo()}
          {renderAddress()}
          {renderContactInfo()}
          <Stack direction="row" sx={{ p: 3, justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={() => setActiveStep(0)}>
              {renderLanguage('უკან', 'Back')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              endIcon={<Iconify icon="eva:arrow-circle-right-fill" width={20} height={20} />}
              type="submit"
            >
              {renderLanguage('მოსწავლე', 'Child')}
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Form>
  );
}
