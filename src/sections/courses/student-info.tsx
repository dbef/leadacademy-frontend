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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Radio,
  Button,
  Select,
  MenuItem,
  RadioGroup,
  Typography,
  FormControl,
  FormControlLabel,
  InputLabel,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useLanguage } from 'src/contexts/language-context';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { CountrySelect } from 'src/components/country-select';

import type { ParentInfoType, StudentInfoType } from './course-register-view';

// ----------------------------------------------------------------------

export type RegisterStudentSchema = zod.infer<typeof RegisterStudentSchema>;

export const RegisterStudentSchema = zod.object({
  student_name: zod.string().min(1, { message: '' }),
  student_lastname: zod.string().min(1, { message: '' }),
  student_pn: zod.string().min(1, { message: '' }),
  student_email: zod.string().email({ message: '' }),
  student_phone: zod.string().min(1, { message: '' }),
  student_class: zod.string().min(1, { message: '' }),
  student_dob: zod.string().min(1, { message: '' }),
  student_gender: zod.string().min(1, { message: '' }).default('male'),
  program: zod.string().min(1, { message: '' }),
  potential_roommate: zod.string().nullable(),
  special_needs: zod.string().nullable(),
  relationship_with_peers: zod.string().nullable(),
  social_skills: zod.string().nullable(),
});

type StudentInfoProps = {
  course: components['schemas']['CourseDto'];
  studentInfo: StudentInfoType;
  setStudentInfo: (info: StudentInfoType) => void;
  setActiveStep: (step: number) => void;
  parentInfo: ParentInfoType;
};

export function RegisterStudentInfo(props: StudentInfoProps) {
  const { course, studentInfo, setStudentInfo, setActiveStep, parentInfo } = props;

  const classes = ['IX', 'X', 'XI', 'XII'];
  const programs = [
    {
      title_ka: 'ამერიკული პროგრამა',
      title_en: 'American Program',
      value: 'american',
    },
    {
      title_ka: 'ქართული პროგრამა',
      title_en: 'Georgian Program',
      value: 'georgian',
    },
    {
      title_ka: 'IB',
      title_en: 'IB',
      value: 'ib',
    },
    {
      title_ka: 'DYP',
      title_en: 'DYP',
      value: 'dyp',
    },
  ];

  const router = useRouter();

  const { renderLanguage } = useLanguage();

  const defaultValues = {
    student_name: studentInfo.student_name,
    student_lastname: studentInfo.student_lastname,
    student_pn: studentInfo.student_pn,
    student_email: studentInfo.student_email,
    student_phone: studentInfo.student_phone,
    student_class: studentInfo.student_class,
    student_dob: studentInfo.student_dob,
    student_gender: studentInfo.student_gender,
    program: studentInfo.program,
    potential_roommate: studentInfo.potential_roommate,
    special_needs: studentInfo.special_needs,
    relationship_with_peers: studentInfo.relationship_with_peers,
    social_skills: studentInfo.social_skills,
  };

  const methods = useForm<RegisterStudentSchema>({
    resolver: zodResolver(RegisterStudentSchema),
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
      const isValid = /^\+995 5\d{2} \d{3} \d{3}$/.test(data.student_phone);

      if (!isValid) {
        setError('student_phone', {
          message: renderLanguage(
            'ტელეფონის ფორმატი არასწორია',
            'Phone number format is incorrect'
          ),
        });
      }

      if (parentInfo.parent_pn === values.student_pn) {
        setError('student_pn', {
          message: renderLanguage(
            'მშობელი და მოსწავლეს პირადი ნომერი ერთი და იგივეა',
            "Parent and student's personal ID number is the same"
          ),
        });

        return;
      }
      setStudentInfo(data);
      setActiveStep(3);
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
        <Field.Text
          name="student_name"
          label={renderLanguage('აპლიკანტის სახელი', `Applicant's name`)}
        />
        <Field.Text
          name="student_lastname"
          label={renderLanguage('აპლიკანტის გვარი', "Applicant's last name")}
        />
      </Stack>
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <DatePicker
          openTo="year"
          views={['year', 'month', 'day']}
          label={renderLanguage('დაბადების თარიღი', 'date of birth')}
          value={values.student_dob ? dayjs(values.student_dob) : null}
          onChange={(newValue) => {
            setValue('student_dob', dayjs(newValue).format('YYYY-MM-DD hh:mm'));
          }}
          slotProps={{ textField: { fullWidth: true } }}
        />
        <FormControl sx={{ width: '100%' }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={values.student_gender}
            name="radio-buttons-group"
            onChange={(e) => setValue('student_gender', e.target.value)}
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{renderLanguage('კლასი', 'Class')}</InputLabel>
          <Select
            id="demo-simple-select"
            value={values.student_class}
            label={renderLanguage('კლასი', 'Class')}
            error={Boolean(errors.student_class)}
            onChange={(event) => setValue('student_class', event.target.value)}
          >
            {classes.map((classItem, index) => (
              <MenuItem key={classItem} value={classItem}>
                {classItem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* <Field.Text name="student_name" label={renderLanguage('მოსწავლის სახელი', 'Student name')} /> */}
        <Field.Text
          name="student_pn"
          label={renderLanguage(
            'პირადი ნომერი/პასპორტის ნომერი',
            'Personal ID number/Passport Number'
          )}
        />
      </Stack>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          {renderLanguage('პროგრამა', 'Program')}
        </InputLabel>
        <Select
          id="demo-simple-select"
          value={values.program}
          error={Boolean(errors.program)}
          label={renderLanguage('პროგრამა', 'Program')}
          onChange={(event) => setValue('program', event.target.value)}
        >
          {programs.map((classItem, index) => (
            <MenuItem key={classItem.value} value={classItem.value}>
              {renderLanguage(classItem.title_ka, classItem.title_en)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
        <Field.Text name="student_email" label={renderLanguage('ელ.ფოსტა', 'Email')} />
        <Field.Text
          name="student_phone"
          label={renderLanguage('ტელეფონის ნომერი', 'Phone number')}
          placeholder="+995 5XX XXX XXX"
          value={values.student_phone}
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters

            // Handle complete deletion
            if (value === '') {
              setValue('student_phone', '');
              return;
            }

            // If the user deletes back to just "+99", reset to "+995" or clear
            if (value === '99') {
              setValue('student_phone', '+995');
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

            setValue('student_phone', formattedValue.trim());
          }}
        />
      </Stack>
      <Stack spacing={3}>
        <Typography
          variant="subtitle2"
          sx={{ fontFeatureSettings: "'case' on", textTransform: 'uppercase' }}
        >
          {renderLanguage(
            'აქვს თუ არა აპლიკანტს რაიმე სპეციალური საგანმანათლებლო საჭიროება?',
            'Does applicant have any special educational needs?'
          )}
        </Typography>
        <Field.Text
          name="special_needs"
          label={renderLanguage('გთხოვთ ჩამოწეროთ', 'Please write')}
          fullWidth
          multiline
          rows={3}
        />
        <Typography
          variant="subtitle2"
          sx={{ fontFeatureSettings: "'case' on", textTransform: 'uppercase' }}
        >
          {renderLanguage(
            'როგორ ურთიერთობს აპლიკანტი თანატოლებთან?',
            'How does applicant interact with peers?'
          )}
        </Typography>
        <Field.Text
          name="relationship_with_peers"
          label={renderLanguage('გთხოვთ ჩამოწეროთ', 'Please write')}
          fullWidth
          multiline
          rows={3}
        />
        <Typography
          variant="subtitle2"
          sx={{ fontFeatureSettings: "'case' on", textTransform: 'uppercase' }}
        >
          {renderLanguage(
            'არის თუ არა რაიმე, რაც უნდა ვიცოდეთ აპლიკანტის ქცევისა და სოციალური უნარების შესახებ?',
            'Is there anything we should know about applicant’s behaviour or social skills?'
          )}
        </Typography>
        <Field.Text
          name="social_skills"
          label={renderLanguage('გთხოვთ ჩამოწეროთ', 'Please write')}
          fullWidth
          multiline
          rows={3}
        />
        <Stack spacing={1}>
          <Typography
            variant="subtitle2"
            sx={{
              fontFeatureSettings: "'case' on",
            }}
          >
            {renderLanguage('პოტენციური რუმმეითი', 'Potential Roommate')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray', fontSize: '0.8rem' }}>
            {renderLanguage(
              'პოტენციური რუმმეითი - ვისთან ერთად მოვდივარ (მიუთითეთ ერთი ან ორი პოტენციური რუმმეითი. აკადემია, შესაძლებლობის ფარგლებში, გაითვალისწინებს მიწოდებულ ინფორმაციას განთავსების დროს.)',
              'Potential Roommate - Who I Am Coming With (Please indicate one or two potential roommates. The academy will consider the provided information during the placement process.)'
            )}
          </Typography>
          <Field.Text
            name="potential_roommate"
            label={renderLanguage('პოტენციური რუმმეითი', 'Potential Roommate')}
            fullWidth
            multiline
            rows={3}
          />
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto' }}>
        <Divider />
        {renderBasicInfo()}
        {renderContactInfo()}
        <Stack direction="row" sx={{ p: 3, justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={() => {
              setStudentInfo(values);
              setActiveStep(1);
            }}
          >
            {renderLanguage('მშობელი', 'Parent')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            endIcon={<Iconify icon="eva:arrow-circle-right-fill" width={20} height={20} />}
            type="submit"
          >
            {renderLanguage('სამედიცინო ინფორმაცია', 'Medical Info')}
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}
