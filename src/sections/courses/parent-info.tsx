'use client';

import type { components } from 'interfaces/interface';
import type { CourseOption } from 'src/types/course-option-dto';

import dayjs from 'dayjs';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Radio,
  Button,
  Select,
  MenuItem,
  RadioGroup,
  Typography,
  InputLabel,
  FormControl,
  FormControlLabel,
} from '@mui/material';

import { useLanguage } from 'src/contexts/language-context';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { CountrySelect } from 'src/components/country-select';

import type { ParentInfoType } from './course-register-view';

// ----------------------------------------------------------------------

export type RegisterParentSchema = zod.infer<typeof RegisterParentSchema>;

export const RegisterParentSchema = zod.object({
  parent_name: zod.string().min(1, { message: '' }),
  parent_lastname: zod.string().min(1, { message: '' }),
  parent_pn: zod.string().min(1, { message: '' }),
  parent_email: zod.string().email({ message: '' }),
  parent_phone: zod.string().min(1, { message: '' }),
  relation: zod.string().default('parent'),
  parent_dob: zod.string().min(1, { message: '' }),
  parent_gender: zod.string().min(1, { message: '' }).default('male'),
  nationality: zod.string().min(1, { message: '' }).default('Georgia'),
  country: zod.string().min(1, { message: '' }).default('Georgia'),
  address: zod.string().min(1, { message: '' }),
  days_attending: zod.number().min(1),
  city: zod.string().min(1, { message: '' }),
  course_option: zod.string().nullable(),
});

type ParentInfoProps = {
  course: components['schemas']['CourseDto'];
  parentInfo: ParentInfoType;
  setParentInfo: (info: ParentInfoType) => void;
  setActiveStep: (step: number) => void;
};

export function RegisterParentView(props: ParentInfoProps) {
  const { course, parentInfo, setParentInfo, setActiveStep } = props;

  const relations = [
    {
      title_ka: 'მშობელი',
      title_en: 'Parent',
      value: 'parent',
    },
    {
      title_ka: 'მეურვე',
      title_en: 'Guardian',
      value: 'guardian',
    },
  ];

  const courseOptions: CourseOption[] = [
    {
      course_options_id: 'default',
      course_id: course.course_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      end_date: course.end_date,
      start_date: course.start_date,
      option_price: course.price,
    },
    ...(course?.course_options ? course.course_options : []),
  ];

  const { renderLanguage } = useLanguage();

  const defaultValues = {
    parent_name: parentInfo.parent_name,
    parent_lastname: parentInfo.parent_lastname,
    parent_pn: parentInfo.parent_pn,
    parent_email: parentInfo.parent_email,
    parent_phone: parentInfo.parent_phone,
    relation: parentInfo.relation,
    parent_dob: parentInfo.parent_dob,
    parent_gender: parentInfo.parent_gender,
    days_attending: parentInfo.days_attending,
    nationality: parentInfo.nationality,
    country: parentInfo.country,
    address: parentInfo.address,
    city: parentInfo.city,
    course_option: parentInfo.course_option || null,
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

      const date1 = new Date(course ? course.start_date : 0);
      const date2 = new Date(course ? course.end_date : 0);

      const diffTime = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (data.days_attending > diffDays) {
        setError('days_attending', {
          message: renderLanguage(
            'მონაწილეობის დღეების რაოდენობა არ უნდა აღემატებოდეს კურსის ხანგრძლივობას',
            'Number of attending days should not exceed course duration'
          ),
        });
        return;
      }

      setParentInfo(data);
      setActiveStep(2);
    } catch (error) {
      console.log('SMTHIN', error);
    }
  });

  const renderBasicInfo = () => (
    <Stack
      spacing={3}
      sx={{
        p: 3,
      }}
    >
      <Typography
        sx={{ fontFeatureSettings: "'case' on", textTransform: 'uppercase' }}
        variant="subtitle2"
      >
        {renderLanguage('საბაზისო ინფორმაცია', 'Basic information')}
      </Typography>
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <Field.Text name="parent_name" label={renderLanguage('მშობლის სახელი', `Parent's name`)} />
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
          value={values.parent_dob ? dayjs(values.parent_dob) : null}
          onChange={(newValue) => {
            setValue('parent_dob', dayjs(newValue).format('YYYY-MM-DD hh:mm'));
          }}
          slotProps={{ textField: { fullWidth: true } }}
        />
        <FormControl sx={{ width: '100%' }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={values.parent_gender}
            name="radio-buttons-group"
            onChange={(e) => setValue('parent_gender', e.target.value)}
          >
            <Stack spacing={3} direction="row">
              <FormControlLabel
                value="male"
                control={<Radio />}
                label={renderLanguage('მამრობითი', 'Male')}
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label={renderLanguage('მდედრობითი', 'Femaie')}
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
        <Field.Text name="parent_pn" label={renderLanguage('პირადი ნომერი', 'Personal number')} />
      </Stack>
      <Stack>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {renderLanguage('კავშირი მოსწავლესთან', 'Relation with student')}
          </InputLabel>
          <Select
            id="demo-simple-select"
            value={values.relation}
            label={renderLanguage('კავშირი მოსწავლესთან', 'Relation with student')}
            onChange={(event) => setValue('relation', event.target.value)}
          >
            {relations.map((relation, index) => (
              <MenuItem key={relation.value} value={relation.value}>
                {renderLanguage(relation.title_ka, relation.title_en)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
        {renderLanguage('საკონტაქტო ინფორმაცია', 'Contact Info')}
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
              value = value.slice(3);
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
      {/* <Field.Text
        name="days_attending"
        label={renderLanguage('დღეების რაოდენობა', 'Number of Days Attending')}
        placeholder="7"
        type="number"
        slotProps={{}}
      /> */}
      <Select
        id="demo-simple-select"
        value={values.course_option}
        label={renderLanguage('კურსის ვარიანტი', 'Course Option')}
        onChange={(event) => setValue('course_option', event.target.value)}
      >
        {courseOptions.map((option, index) => (
          <MenuItem key={option.course_options_id} value={option.course_options_id}>
            {dayjs(option.start_date).format('DD/MM/YYYY')} -{' '}
            {dayjs(option.end_date).format('DD/MM/YYYY')} - {option.option_price} ₾
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Divider />
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto' }}>
        {renderBasicInfo()}
        {renderAddress()}
        {renderContactInfo()}
        <Stack direction="row" sx={{ p: 3, justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={() => {
              setParentInfo(values);
              setActiveStep(0);
            }}
          >
            {renderLanguage('კურსის არჩევა', 'Select Course')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            endIcon={<Iconify icon="eva:arrow-circle-right-fill" width={20} height={20} />}
            type="submit"
          >
            {renderLanguage('აპლიკანტი', 'Applicant')}
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}
