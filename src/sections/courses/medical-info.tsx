'use client';

import type { components } from 'interfaces/interface';

import { z as zod } from 'zod';
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

import { useLanguage } from 'src/contexts/language-context';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import type { MedicalInfoType } from './course-register-view';

// ----------------------------------------------------------------------

type MedicalInfoProps = {
  course: components['schemas']['CourseDto'];
  medicalInfo: MedicalInfoType;
  setMedicalInfo: (info: MedicalInfoType) => void;
  setActiveStep: (step: number) => void;
};

export function MedicalInfo(props: MedicalInfoProps) {
  const { course, medicalInfo, setMedicalInfo, setActiveStep } = props;

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

  console.log('VALUES:', values, errors);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setMedicalInfo(data);
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
              label={renderLanguage('გთხოვთ ჩამოწეროთ ალერგიები', 'Please write alergens')}
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
                'Does student have diet restrictions?'
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
              label={renderLanguage('გთხოვთ ჩამოწეროთ შეზღუდვები', 'Please write restrictions')}
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
                'Does student take any medical pills??'
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
              label={renderLanguage('გთხოვთ ჩამოწეროთ მედიკამენტები', 'Please write medicaments')}
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
              {renderLanguage('სამედიცინო ინფორმაცია', 'Medical Info')}
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Form>
  );
}
