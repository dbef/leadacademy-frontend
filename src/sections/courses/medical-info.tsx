'use client';

import type { FieldError } from 'react-hook-form';
import type { components } from 'interfaces/interface';

import { toast } from 'sonner';
import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Radio,
  Modal,
  Alert,
  Button,
  Checkbox,
  RadioGroup,
  Typography,
  FormControl,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';

import apiClient from 'src/api/apiClient';
import { Language, useLanguage } from 'src/contexts/language-context';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { termsAndConditions } from './data';

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

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const mediaTerms = [
    {
      title_ka: 'ვადასტურებ, რომ ვაცხადებ თანხმობას, ჩემი შვილის ფოტოების გამოყენებაზე',
      title_en: ` I confirm that I have given prior consent for my child's photos to be taken.`,
      key: 'confirm',
    },
    {
      title_ka: 'უარს ვამბობ ჩემი შვილის ფოტოების გამოყენებაზე',
      title_en: `I refuse to give prior permission to use my child’s photos.`,
      key: 'reject',
    },
  ];

  const router = useRouter();

  const emergencyRelations = [
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

  const { renderLanguage, language } = useLanguage();
  type MedicalInfoSchema = zod.infer<typeof MedicalInfoSchema>;
  const MedicalInfoSchema = zod
    .object({
      alergens: zod.string().min(1, { message: '' }).nullable(),
      medicaments: zod.string().min(1, { message: '' }).nullable(),
      diet_restrictions: zod.string().min(1, { message: '' }).nullable(),
      physical_disabilities: zod.string().min(1, { message: '' }).nullable(),
      additional_info: zod.string().min(1, { message: '' }).nullable(),
      emergency_relation: zod.string().nullable(),
      emergency_contact_name: zod.string().nullable(),
      emergency_contact_phone: zod.string().nullable(),
      additional_comfort_info: zod.string().nullable(),
      medical_terms: zod.boolean().default(false),
      terms_and_conditions: zod.boolean().default(false),
      cancellation_refund_policy: zod.boolean().default(false),
      fees_and_payment: zod.boolean().default(false),
      media_release: zod.string().nullable().default(null),
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
    })
    .refine((data) => data.cancellation_refund_policy === true, {
      message: renderLanguage(
        'აპლიკაციის გაგზავნისთვის უნდა დაეთანხმოთ წესებსა და პირობებს',
        'To send application you must agree on terms and conditions'
      ),
      path: ['cancellation_refund_policy'],
    })
    .refine((data) => data.fees_and_payment === true, {
      message: renderLanguage(
        'აპლიკაციის გაგზავნისთვის უნდა დაეთანხმოთ წესებსა და პირობებს',
        'To send application you must agree on terms and conditions'
      ),
      path: ['fees_and_payment'],
    })
    .refine((data) => data.media_release !== null, {
      message: renderLanguage(
        'გთხოვთ აირჩიეთ ერთერთი ვარიანტი',
        'Please select one of the options'
      ),
      path: ['media_release'],
    });

  const defaultValues = {
    alergens: medicalInfo.alergens,
    medicaments: medicalInfo.medicaments,
    diet_restrictions: medicalInfo.diet_restrictions,
    physical_disabilities: medicalInfo.physical_disabilities,
    additional_info: medicalInfo.additional_info,
    medical_terms: medicalInfo.medical_terms,
    terms_and_conditions: medicalInfo.terms_and_conditions,
    emergency_relation: medicalInfo.emergency_relation,
    emergency_contact_name: medicalInfo.emergency_contact_name,
    emergency_contact_phone: medicalInfo.emergency_contact_phone,
    additional_comfort_info: medicalInfo.additional_comfort_info,
    cancellation_refund_policy: medicalInfo.cancellation_refund_policy,
    fees_and_payment: medicalInfo.fees_and_payment,
    media_release: medicalInfo.media_release,
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '80%',
    overflow: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    outline: 'none',
    p: 4,
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
      setLoading(true);

      const application = await apiClient('/api/v1/application', 'post', {
        body: {
          ...parentInfo,
          ...studentInfo,
          ...medicalInfo,
          potential_roommate: studentInfo.potential_roommate ? studentInfo.potential_roommate : '',
          diet_restrictions: values.diet_restrictions ? values.diet_restrictions : '',
          alergens: values.alergens ? values.alergens : '',
          medicaments: values.medicaments ? values.medicaments : '',
          physical_disabilities: values.physical_disabilities ? values.physical_disabilities : '',
          additional_info: values.additional_info ? values.additional_info : '',
          additional_comfort_info: values.additional_comfort_info
            ? values.additional_comfort_info
            : '',
          emergency_relation: values.emergency_relation ? values.emergency_relation : '',
          emergency_contact_name: values.emergency_contact_name
            ? values.emergency_contact_name
            : '',
          emergency_contact_phone: values.emergency_contact_phone
            ? values.emergency_contact_phone
            : '',
          special_needs: studentInfo.special_needs ? studentInfo.special_needs : '',
          relationship_with_peers: studentInfo.relationship_with_peers
            ? studentInfo.relationship_with_peers
            : '',
          social_skills: studentInfo.social_skills ? studentInfo.social_skills : '',
          course_id: course?.course_id || '',
          media_release: values.media_release ? values.media_release : '',
          course_option_id: parentInfo.course_option || 'default',
        },
      });

      router.push(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payment/redirect/${application.application_id}`
      );
    } catch (error: any) {
      if (error.message === 'API request failed with status 409') {
        toast.error(
          renderLanguage('აპლიკანტი უკვე დარეგისტრირებულია', 'Applicant is already registered')
        );
        setLoading(false);
        return;
      }
      setLoading(false);
      toast.error(renderLanguage(`${error.message}`, `${error.message}`));
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
              {renderLanguage('აქვს თუ არა აპლიკანტს ალერგია?', 'Does applicant have alergies?')}
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
                'აქვს თუ არა აპლიკანტსს დიეტური შეზღუდვები?',
                'Does applicant have dietary restrictions?'
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
                'იღებს თუ არა აპლიკანტი რაიმე სახის მედიკამენტებს?',
                'Does applicant take any medication?'
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
                'აქვს თუ არა აპლიკანტს რაიმე სამედიცინო მდგომარეობა ან ფიზიკური შეზღუდვები?',
                'Does applicant have any medical or physical restrictions?'
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
                'არის თუ არა რაიმე დამატებითი ინფორმაცია, რომელიც უნდა ვიცოდეთ აპლიკანტზე?',
                'Is there any additional information we should know about the applicant?'
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
      <Stack>
        <Typography
          variant="subtitle2"
          sx={{ fontFeatureSettings: "'case' on", textTransform: 'uppercase' }}
        >
          {renderLanguage(
            'ნებისმიერი ინფორმაცია, რაც კურსის ფარგლებში აპლიკანტის კომფორტისა და ჯანმრთელობისთვის მნიშვნელოვანი შეიძლება იყოს',
            `Any information that may be important for the applicant's comfort and well-being during the course`
          )}
        </Typography>
        <Field.Text
          name="additional_comfort_info"
          label={renderLanguage('გთხოვთ ჩამოწეროთ', 'Please write')}
          fullWidth
          multiline
          rows={3}
        />
      </Stack>
      <Typography
        variant="subtitle2"
        sx={{ fontFeatureSettings: "'case' on", textTransform: 'uppercase' }}
      >
        {renderLanguage('სანდო კონტაქტი', 'Emergency Contact')}
      </Typography>
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <Field.Text
          name="emergency_contact_name"
          label={renderLanguage('სახელი/გვარი', 'Name/Surname')}
          fullWidth
        />
      </Stack>
      <Stack spacing={3} direction={{ xs: 'row', md: 'row' }}>
        <Field.Text
          name="emergency_relation"
          label={renderLanguage('კავშირი აპლიკანტთან', 'Relation with applicant')}
          fullWidth
          multiline
        />
        <Field.Text
          name="emergency_contact_phone"
          label={renderLanguage('ტელეფონის ნომერი', 'Phone number')}
          placeholder="+995 5XX XXX XXX"
          value={values.emergency_contact_phone}
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters

            // Handle complete deletion
            if (value === '') {
              setValue('emergency_contact_phone', '');
              return;
            }

            // If the user deletes back to just "+99", reset to "+995" or clear
            if (value === '99') {
              setValue('emergency_contact_phone', '+995');
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

            setValue('emergency_contact_phone', formattedValue.trim());
          }}
        />
      </Stack>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto' }}>
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
            onClick={() => setOpenModal(true)}
          >
            {renderLanguage('წესები და პირობები', 'Terms and Conditions')}
          </Button>
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack spacing={4}>
                <Typography variant="h4" align="left" sx={{ fontFeatureSettings: "'case' on" }}>
                  {renderLanguage('წესები და პირობები', 'Terms and Conditions')}
                </Typography>
                <Alert severity="warning" sx={{ width: 'fit-content' }}>
                  {renderLanguage(
                    'გთხოვთ, მონიშნოთ ყველა ველი! აუცილებელი ველის შევსების გარეშე, გაგრძელებას ვერ მოახერხებთ.',
                    'Please select all fields! You cannot proceed without selecting all the required fields.'
                  )}
                </Alert>
                {termsAndConditions.map((item, _index) => {
                  if (item.is_required) {
                    return (
                      <Stack spacing={1} key={item.id}>
                        <FormControl sx={{ width: '100%' }}>
                          <FormControlLabel
                            value="end"
                            control={<Checkbox name={item.key} />}
                            onChange={(e) => {
                              if (item.key) {
                                setValue(
                                  item.key as keyof MedicalInfoType,
                                  values[item.key as keyof MedicalInfoType] ? false : true
                                );
                              }
                            }}
                            label={
                              <Typography
                                variant="subtitle2"
                                key={item.id}
                                sx={{ fontFeatureSettings: "'case' on" }}
                              >
                                {_index + 1}. {renderLanguage(item.title_ka, item.title_en)}
                              </Typography>
                            }
                            labelPlacement="end"
                          />
                          <FormHelperText sx={{ color: 'error.main' }}>
                            {item.key && errors[item.key as keyof MedicalInfoType]?.message
                              ? (errors[item.key as keyof MedicalInfoType] as FieldError).message
                              : ''}
                          </FormHelperText>
                        </FormControl>
                        <ul style={{ margin: 0, paddingLeft: '20px', listStyleType: 'disc' }}>
                          {(language === Language.KA ? item.points_ka : item.points_en).map(
                            (point, index) => (
                              <li key={index} style={{ marginBottom: '4px' }}>
                                <Typography variant="body2" component="span">
                                  {point}
                                </Typography>
                              </li>
                            )
                          )}
                        </ul>
                      </Stack>
                    );
                  } else {
                    return (
                      <Stack spacing={1} key={item.id}>
                        <Typography
                          variant="subtitle2"
                          key={item.id}
                          sx={{ fontFeatureSettings: "'case' on" }}
                        >
                          {_index + 1}. {renderLanguage(item.title_ka, item.title_en)}
                        </Typography>
                        <ul style={{ margin: 0, paddingLeft: '20px', listStyleType: 'disc' }}>
                          {(language === Language.KA ? item.points_ka : item.points_en).map(
                            (point, index) => (
                              <li key={index} style={{ marginBottom: '4px' }}>
                                <Typography variant="body2" component="span">
                                  {point}
                                </Typography>
                              </li>
                            )
                          )}
                        </ul>
                        {item.key === 'media_release' ? (
                          <Alert severity="warning" sx={{ width: 'fit-content' }}>
                            {renderLanguage(
                              'გთხოვთ, აირჩიოთ ქვემოთ მოცემული ორი ვარიანტიდან ერთ-ერთი:',
                              'Click one of the options:'
                            )}
                          </Alert>
                        ) : null}

                        {item.key === 'media_release' ? (
                          <>
                            <FormControl sx={{ width: '100%' }}>
                              <FormControlLabel
                                value="end"
                                control={
                                  <Checkbox
                                    value={values.media_release}
                                    checked={values.media_release === 'confirm' ? true : false}
                                  />
                                }
                                onChange={(e) => {
                                  setValue('media_release' as keyof MedicalInfoType, 'confirm');
                                }}
                                label={
                                  <ul>
                                    <li>
                                      {' '}
                                      {renderLanguage(
                                        'ვადასტურებ, რომ ვაცხადებ თანხმობას, ჩემი შვილის ფოტოების გამოყენებაზე',
                                        `I confirm that I have given prior consent for my child's photos to be taken.`
                                      )}
                                    </li>
                                  </ul>
                                }
                                labelPlacement="end"
                              />
                            </FormControl>
                            <FormControl sx={{ width: '100%' }}>
                              <FormControlLabel
                                value="end"
                                control={
                                  <Checkbox
                                    value={values.media_release}
                                    checked={values.media_release === 'reject' ? true : false}
                                  />
                                }
                                onChange={(e) => {
                                  setValue('media_release' as keyof MedicalInfoType, 'reject');
                                }}
                                label={
                                  <ul>
                                    <li>
                                      {' '}
                                      {renderLanguage(
                                        'უარს ვამბობ ჩემი შვილის ფოტოების გამოყენებაზე',
                                        `I refuse to give prior permission to use my child’s photos.`
                                      )}
                                    </li>
                                  </ul>
                                }
                                labelPlacement="end"
                              />
                            </FormControl>
                            <FormHelperText sx={{ color: 'error.main' }}>
                              {errors.media_release?.message ? errors.media_release.message : ''}
                            </FormHelperText>
                          </>
                        ) : null}
                      </Stack>
                    );
                  }
                })}
                <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
                  <FormControl sx={{ width: '100%' }}>
                    <FormControlLabel
                      value="end"
                      control={<Checkbox value={values.medical_terms} />}
                      onChange={(e) =>
                        setValue('medical_terms', values.medical_terms ? false : true)
                      }
                      label={renderLanguage(
                        'ფორმის შევსებით ვადასტურებ, რომ გავეცი ყველა მნიშვნელოვანი და შესაბამისი ინფორმაცია ჩემი შვილის ჯანმრთელობისა და სამედიცინო ისტორიის შესახებ',
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
                      control={
                        <Checkbox value={values.terms_and_conditions} name="medical_terms" />
                      }
                      onChange={(e) =>
                        setValue('terms_and_conditions', values.terms_and_conditions ? false : true)
                      }
                      label={
                        <Typography variant="body2">
                          {renderLanguage(
                            'პლიკაციის გაგზავნით ვადასტურებ, რომ გავეცანი წესებსა და პირობებს',
                            'By sending application I agree on Terms and conditions'
                          )}
                        </Typography>
                      }
                      labelPlacement="end"
                    />
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {errors.terms_and_conditions?.message
                        ? errors.terms_and_conditions.message
                        : ''}
                    </FormHelperText>
                  </FormControl>
                </Stack>
                <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
                  {' '}
                  <Button variant="outlined" onClick={() => setOpenModal(false)}>
                    {renderLanguage('გაუქმება', 'Close')}
                  </Button>{' '}
                  <LoadingButton
                    variant="contained"
                    color="primary"
                    endIcon={<Iconify icon="eva:arrow-circle-right-fill" width={20} height={20} />}
                    onClick={onSubmit}
                    loading={loading}
                  >
                    {renderLanguage('გადახდა', 'Payment')}
                  </LoadingButton>{' '}
                </Stack>
              </Stack>
            </Box>
          </Modal>
        </Stack>
      </Stack>
    </Form>
  );
}
