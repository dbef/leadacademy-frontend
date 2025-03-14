'use client';

import type { components } from 'interfaces/interface';
import type { CourseDto } from 'src/types/course-type';
import type { IDatePickerControl } from 'src/types/common';

import dayjs from 'dayjs';
import { z as zod } from 'zod';
import { m } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Step, Stepper, StepLabel, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import apiClient from 'src/api/apiClient';
import { useLanguage } from 'src/contexts/language-context';

import { toast } from 'src/components/snackbar';

import { MedicalInfo } from './medical-info';
import { RegisterParentView } from './parent-info';
import { SelectCourse } from './select-course-view';
import { RegisterStudentInfo } from './student-info';
import { CourseThankYou } from './thank-you/thank-you';
import {
  ColorlibStepIcon,
  ColorlibConnector,
} from '../_examples/mui/stepper-view/customized-steppers';

// ----------------------------------------------------------------------

export type NewCourseSchema = zod.infer<typeof CreateCourseSchema>;

export const CreateCourseSchema = zod.object({
  course_id: zod.string().uuid(),
  parent_name: zod.string().min(1),
  parent_lastname: zod.string().min(1),
  parent_pn: zod.string().min(1),
  parent_email: zod.string().email(),
  parent_phone: zod.string().min(1),
  relation: zod.string().default('parent'),
  child_name: zod.string().min(1),
  child_lastname: zod.string().min(1),
  child_email: zod.string().email().optional().nullable(),
  child_dob: zod.string().min(1),
});

type CourseEditViewProps = {
  course?: components['schemas']['CourseDto'];
};

export type ParentInfoType = {
  parent_name: string;
  parent_lastname: string;
  parent_pn: string;
  parent_email: string;
  parent_phone: string;
  relation: string;
  parent_dob: string;
  gender: string;
  nationality: string;
  country: string;
  address: string;
  city: string;
};

export type StudentInfoType = {
  student_name: string;
  student_lastname: string;
  student_pn: string;
  student_email: string;
  student_phone: string;
  student_class: string;
  student_dob: string;
  gender: string;
};

export type MedicalInfoType = {
  alergens: string | null;
  medicaments: string | null;
  diet_restrictions: string | null;
  physical_disabilities: string | null;
  additional_info: string | null;
  medical_terms: boolean;
  terms_and_conditions: boolean;
};

export function RegisterOnCourseView(props: CourseEditViewProps) {
  const { course } = props;

  const stepVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  const router = useRouter();

  const [completed, setCompleted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [parentInfo, setParentInfo] = useState<ParentInfoType>({
    parent_name: '',
    parent_lastname: '',
    parent_pn: '',
    parent_email: '',
    parent_phone: '',
    relation: '',
    parent_dob: '',
    address: '',
    city: '',
    country: 'Georgia',
    gender: 'male',
    nationality: 'Georgia',
  });
  const [studentInfo, setStudentInfo] = useState<StudentInfoType>({
    student_name: '',
    student_lastname: '',
    student_pn: '',
    student_email: '',
    student_phone: '',
    student_dob: '',
    gender: 'male',
    student_class: '',
  });
  const [medicalInfo, setMedicalInfo] = useState<MedicalInfoType>({
    additional_info: null,
    alergens: null,
    diet_restrictions: null,
    medicaments: null,
    physical_disabilities: null,
    medical_terms: false,
    terms_and_conditions: false,
  });
  const [selectedCourse, setSelectedCourse] = useState<CourseDto | null>(null);
  const steps = [
    {
      id: 1,
      label_ka: 'კურსის არჩევა',
      label_en: 'Select Course',
    },
    {
      id: 2,
      label_ka: 'მშობელი/მეურვე',
      label_en: 'Parent/Guardian',
    },
    {
      id: 3,
      label_ka: 'მოსწავლე',
      label_en: 'Student',
    },
    {
      id: 4,
      label_ka: 'სამედიცინო ინფორმაცია',
      label_en: 'Medical Information',
    },
  ];

  useEffect(() => {
    if (course) {
      setActiveStep(1);
      setSelectedCourse(course);
    }
  }, [course]);

  const { renderLanguage } = useLanguage();

  const defaultValues: components['schemas']['CreateApplicationDto'] = {
    child_dob: '',
    child_lastname: '',
    child_name: '',
    course_id: selectedCourse ? selectedCourse.course_id : '',
    parent_email: '',
    parent_lastname: '',
    parent_name: '',
    parent_phone: '',
    parent_pn: '',
    relation: '',
    child_email: '',
  };

  const methods = useForm<NewCourseSchema>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await apiClient('/api/v1/application', 'post', {
        body: {
          ...data,
          child_email: data.child_email || undefined,
        },
      });

      toast.success(
        renderLanguage('აპლიკაცია წარმატებით გაიგზავნა', 'Application sent succesfully')
      );

      setCompleted(true);
    } catch (error) {
      console.log('SMTHIN', error);
    }
  });

  return (
    <Stack spacing={{ xs: 3, md: 5 }}>
      <Box sx={{ mb: 5 }} />
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        sx={{
          position: 'sticky',
          top: 70,
          zIndex: 10,
          bgcolor: 'background.paper',
          marginTop: '100px',
        }}
      >
        {steps.map((label) => (
          <Step key={label.label_ka}>
            <StepLabel slots={{ stepIcon: ColorlibStepIcon }}>{label.label_ka}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <m.div
        key={activeStep}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={stepVariants}
      >
        {activeStep === steps.length && selectedCourse ? (
          <CourseThankYou open course={selectedCourse} />
        ) : (
          <>
            {activeStep === 0 && (
              <SelectCourse
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
                setActiveStep={setActiveStep}
              />
            )}
            {activeStep === 1 && selectedCourse && (
              <RegisterParentView
                course={selectedCourse}
                parentInfo={parentInfo}
                setParentInfo={setParentInfo}
                setActiveStep={setActiveStep}
              />
            )}
            {activeStep === 2 && selectedCourse && (
              <RegisterStudentInfo
                course={selectedCourse}
                studentInfo={studentInfo}
                setStudentInfo={setStudentInfo}
                setActiveStep={setActiveStep}
              />
            )}
            {activeStep === 3 && selectedCourse && (
              <MedicalInfo
                course={selectedCourse}
                medicalInfo={medicalInfo}
                setMedicalInfo={setMedicalInfo}
                setActiveStep={setActiveStep}
              />
            )}
          </>
        )}
      </m.div>
    </Stack>
  );
}
