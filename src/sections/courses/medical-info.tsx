'use client';

import type { components } from 'interfaces/interface';

import { z as zod } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import {
  Radio,
  Button,
  Checkbox,
  RadioGroup,
  Typography,
  FormControl,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';

import apiClient from 'src/api/apiClient';
import { useLanguage } from 'src/contexts/language-context';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import type { ParentInfoType, MedicalInfoType, StudentInfoType } from './course-register-view';

// ----------------------------------------------------------------------

type MedicalInfoProps = {
  course: components['schemas']['CourseDto'];
  medicalInfo: MedicalInfoType;
  setMedicalInfo: (info: MedicalInfoType) => void;
  setActiveStep: (step: number) => void;
  parentInfo: ParentInfoType;
  studentInfo: StudentInfoType;
};

export function MedicalInfo(props: MedicalInfoProps) {
  const { course, medicalInfo, setMedicalInfo, setActiveStep, parentInfo, studentInfo } = props;

  const { renderLanguage } = useLanguage();
  type MedicalInfoSchema = zod.infer<typeof MedicalInfoSchema>;
  const MedicalInfoSchema = zod
    .object({
      alergens: zod.string().min(1, { message: '' }).nullable(),
      medicaments: zod.string().min(1, { message: '' }).nullable(),
      diet_restrictions: zod.string().min(1, { message: '' }).nullable(),
      physical_disabilities: zod.string().min(1, { message: '' }).nullable(),
      additional_info: zod.string().min(1, { message: '' }).nullable(),
      medical_terms: zod.boolean().default(false),
      terms_and_conditions: zod.boolean().default(false),
    })
    .refine((data) => data.medical_terms === true, {
      message: renderLanguage(
        'აპლიკაციის გაგზავნისთვის უნდა დაეთანხმოთ ინფორმაციის სიზუსტეს',
        'To send application you must agree on information accuracy'
      ),
      path: ['medical_terms'],
    })
    .refine((data) => data.terms_and_conditions === true, {
      message: renderLanguage(
        'აპლიკაციის გაგზავნისთვის უნდა დაეთანხმოთ წესებსა და პირობებს',
        'To send application you must agree on terms and conditions'
      ),
      path: ['terms_and_conditions'],
    });

  const defaultValues = {
    alergens: medicalInfo.alergens,
    medicaments: medicalInfo.medicaments,
    diet_restrictions: medicalInfo.diet_restrictions,
    physical_disabilities: medicalInfo.physical_disabilities,
    additional_info: medicalInfo.additional_info,
    medical_terms: medicalInfo.medical_terms,
    terms_and_conditions: medicalInfo.terms_and_conditions,
  };

  const methods = useForm<MedicalInfoSchema>({
    resolver: zodResolver(MedicalInfoSchema),
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
      setMedicalInfo(data);
      await apiClient('/api/v1/application', 'post', {
        body: {
          ...parentInfo,
          ...studentInfo,
          ...medicalInfo,
          potential_roommate: studentInfo.potential_roommate ? studentInfo.potential_roommate : '',
          diet_restrictions: values.diet_restrictions ? values.diet_restrictions : '',
          alergens: values.alergens ? values.alergens : '',
          medicaments: values.medicaments ? values.medicaments : '',
          physical_disabilities: values.physical_disabilities
            ? values.physical_disabilities
            : '',
          additional_info: values.additional_info ? values.additional_info : '',
          course_id: course?.course_id || '',
        },
      });

      toast.success(
        renderLanguage('აპლიკაცია წარმატებით გაიგზავნა', 'Application sent succesfully')
      );

      setActiveStep(4);
    } catch (error) {
      console.log('SMTHIN', error);
    }
  });

  const renderBasicInfo = () => (
    <Stack spacing={3} sx={{ p: 3 }}>
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <FormControl sx={{ width: '100%' }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={values.alergens !== null ? 'yes' : 'no'}
            name="radio-buttons-group"
            onChange={(e) => {
              if (e.target.value === 'no') {
                setValue('alergens', null);
                return;
              }
              setValue('alergens', '');
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontFeatureSettings: "'case' on", textTransform: 'uppercase' }}
            >
              {renderLanguage('აქვს თუ არა სტუდენტს ალერგია?', 'Does student have alergies?')}
            </Typography>
            <Stack spacing={3} direction="row">
              <FormControlLabel
                value="no"
                control={<Radio />}
                label={renderLanguage('არა', 'No')}
              />
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label={renderLanguage('კი', 'Yes')}
              />
            </Stack>
          </RadioGroup>
          {values.alergens !== null && (
            <Field.Text
              name="alergens"
              label={renderLanguage('გთხოვთ, დააზუსტოთ', 'Please specify')}
              fullWidth
              multiline
              rows={3}
            />
          )}
        </FormControl>
        <FormControl sx={{ width: '100%' }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={values.diet_restrictions !== null ? 'yes' : 'no'}
            name="radio-buttons-group"
            onChange={(e) => {
              if (e.target.value === 'no') {
                setValue('diet_restrictions', null);
                return;
              }
              setValue('diet_restrictions', '');
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontFeatureSettings: "'case' on", textTransform: 'uppercase' }}
            >
              {renderLanguage(
                'აქვს თუ არა სტუდენტს დიეტური შეზღუდვები?',
                'Does student have dietary restrictions?'
              )}
            </Typography>
            <Stack spacing={3} direction="row">
              <FormControlLabel
                value="no"
                control={<Radio />}
                label={renderLanguage('არა', 'No')}
              />
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label={renderLanguage('კი', 'Yes')}
              />
            </Stack>
          </RadioGroup>
          {values.diet_restrictions !== null && (
            <Field.Text
              name="diet_restrictions"
              label={renderLanguage('გთხოვთ, დააზუსტოთ', 'Please specify')}
              fullWidth
              multiline
              rows={3}
            />
          )}
        </FormControl>
      </Stack>
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <FormControl sx={{ width: '100%' }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={values.medicaments !== null ? 'yes' : 'no'}
            name="radio-buttons-group"
            onChange={(e) => {
              if (e.target.value === 'no') {
                setValue('medicaments', null);
                return;
              }
              setValue('medicaments', '');
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontFeatureSettings: "'case' on", textTransform: 'uppercase' }}
            >
              {renderLanguage(
                'იღებს თუ არა სტუდენტი რაიმე სახის მედიკამენტებს?',
                'Does student take any medication?'
              )}
            </Typography>
            <Stack spacing={3} direction="row">
              <FormControlLabel
                value="no"
                control={<Radio />}
                label={renderLanguage('არა', 'No')}
              />
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label={renderLanguage('კი', 'Yes')}
              />
            </Stack>
          </RadioGroup>
          {values.medicaments !== null && (
            <Field.Text
              name="medicaments"
              label={renderLanguage(
                'გთხოვთ, დააზუსტოთ მედიკამენტი და დოზა',
                'Please specify medication and dosage'
              )}
              fullWidth
              multiline
              rows={3}
            />
          )}
        </FormControl>
        <FormControl sx={{ width: '100%' }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={values.physical_disabilities !== null ? 'yes' : 'no'}
            name="radio-buttons-group"
            onChange={(e) => {
              if (e.target.value === 'no') {
                setValue('physical_disabilities', null);
                return;
              }
              setValue('physical_disabilities', '');
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontFeatureSettings: "'case' on", textTransform: 'uppercase' }}
            >
              {renderLanguage(
                'აქვს თუ არა სტუდენტს რაიმე სამედიცინო მდგომარეობა ან ფიზიკური შეზღუდვები?',
                'Does student have any medical or physical restrictions?'
              )}
            </Typography>
            <Stack spacing={3} direction="row">
              <FormControlLabel
                value="no"
                control={<Radio />}
                label={renderLanguage('არა', 'No')}
              />
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label={renderLanguage('კი', 'Yes')}
              />
            </Stack>
          </RadioGroup>
          {values.physical_disabilities !== null && (
            <Field.Text
              name="physical_disabilities"
              label={renderLanguage('გთხოვთ, განმარტოთ', 'Please explain')}
              fullWidth
              multiline
              rows={3}
            />
          )}
        </FormControl>
      </Stack>
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <FormControl sx={{ width: '100%' }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={values.additional_info !== null ? 'yes' : 'no'}
            name="radio-buttons-group"
            onChange={(e) => {
              if (e.target.value === 'no') {
                setValue('additional_info', null);
                return;
              }
              setValue('additional_info', '');
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontFeatureSettings: "'case' on", textTransform: 'uppercase' }}
            >
              {renderLanguage(
                'არის თუ არა რაიმე დამატებითი ინფორმაცია, რომელიც უნდა ვიცოდეთ სტუდენტებზე?',
                'Is there any additional information we should know about the student?'
              )}
            </Typography>
            <Stack spacing={3} direction="row">
              <FormControlLabel
                value="no"
                control={<Radio />}
                label={renderLanguage('არა', 'No')}
              />
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label={renderLanguage('კი', 'Yes')}
              />
            </Stack>
          </RadioGroup>
          {values.additional_info !== null && (
            <Field.Text
              name="additional_info"
              label={renderLanguage('გთხოვთ ჩამოწეროთ', 'Please write')}
              fullWidth
              multiline
              rows={3}
            />
          )}
        </FormControl>
      </Stack>
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <FormControl sx={{ width: '100%' }}>
          <FormControlLabel
            value="end"
            control={<Checkbox value={values.medical_terms} />}
            onChange={(e) => setValue('medical_terms', values.medical_terms ? false : true)}
            label={renderLanguage(
              'ფორმის შევსებით, ვადასტურებ, რომ გავეცი ყველა მნიშვნელოვანი და შესაბამისი ინფორმაცია ჩემი შვილის ჯანმრთელობისა და სამედიცინო ისტორიაზე.',
              "By completing the form, I confirm that I have provided all relevant and relevant information about my child's health and medical history."
            )}
            labelPlacement="end"
          />
          <FormHelperText sx={{ color: 'error.main' }}>
            {errors.medical_terms?.message ? errors.medical_terms.message : ''}
          </FormHelperText>
        </FormControl>
      </Stack>
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <FormControl sx={{ width: '100%' }}>
          <FormControlLabel
            value="end"
            control={<Checkbox value={values.terms_and_conditions} name="medical_terms" />}
            onChange={(e) =>
              setValue('terms_and_conditions', values.terms_and_conditions ? false : true)
            }
            label={
              <Typography variant="body2">
                {renderLanguage(
                  'აპლიკაციის გაგზავნით ვადასტურებ რომ გავეცანი',
                  'By sending application I agree on'
                )}{' '}
                <a>{renderLanguage('წესებსა და პირობებს', 'Terms and conditions')}</a>
              </Typography>
            }
            labelPlacement="end"
          />
          <FormHelperText sx={{ color: 'error.main' }}>
            {errors.terms_and_conditions?.message ? errors.terms_and_conditions.message : ''}
          </FormHelperText>
        </FormControl>
      </Stack>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        <Card>
          <Divider />
          {renderBasicInfo()}
          <Stack direction="row" sx={{ p: 3, justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              onClick={() => {
                setMedicalInfo(values);
                setActiveStep(2);
              }}
            >
              {renderLanguage('მოსწავლე', 'Student')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              endIcon={<Iconify icon="eva:arrow-circle-right-fill" width={20} height={20} />}
              type="submit"
            >
              {renderLanguage('აპლიკაციის გაგზავნა', 'Send Application')}
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Form>
  );
}
