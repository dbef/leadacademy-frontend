'use client';

import type { CourseDto } from 'src/types/course-type';

import { z as zod } from 'zod';
import { m } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import { Step, Stepper, StepLabel } from '@mui/material';

import { useParams, useRouter } from 'src/routes/hooks';

import apiClient from 'src/api/apiClient';
import { useLanguage } from 'src/contexts/language-context';

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

export type ParentInfoType = {
  parent_name: string;
  parent_lastname: string;
  parent_pn: string;
  parent_email: string;
  parent_phone: string;
  relation: string;
  parent_dob: string;
  parent_gender: string;
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
  student_gender: string;
  program: string;
  potential_roommate: string | null;
  special_needs: string | null;
  relationship_with_peers: string | null;
  social_skills: string | null;
};

export type MedicalInfoType = {
  alergens: string | null;
  medicaments: string | null;
  diet_restrictions: string | null;
  physical_disabilities: string | null;
  additional_info: string | null;
  emergency_relation: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  additional_comfort_info: string | null;
  medical_terms: boolean;
  terms_and_conditions: boolean;
  cancellation_refund_policy: boolean;
  fees_and_payment: boolean;
  media_release: string | null;
};

export function RegisterOnCourseView() {
  const [course, setCourse] = useState<CourseDto | null>(null);

  const params: { id?: string } = useParams();

  const handleFetchCourse = useCallback(async () => {
    if (!params.id) return;
    const response = await apiClient('/api/v1/courses/{id}', 'get', {
      pathParams: {
        id: params.id,
      },
    });

    setCourse(response);
  }, [params]);

  useEffect(() => {
    handleFetchCourse();
  }, [params]);

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
    relation: 'parent',
    parent_dob: '',
    address: '',
    city: '',
    country: 'Georgia',
    parent_gender: 'male',
    nationality: 'Georgia',
  });
  const [studentInfo, setStudentInfo] = useState<StudentInfoType>({
    student_name: '',
    student_lastname: '',
    student_pn: '',
    student_email: '',
    student_phone: '',
    student_dob: '',
    student_gender: 'male',
    student_class: '',
    program: '',
    potential_roommate: null,
    special_needs: null,
    relationship_with_peers: null,
    social_skills: null,
  });
  const [medicalInfo, setMedicalInfo] = useState<MedicalInfoType>({
    additional_info: null,
    alergens: null,
    diet_restrictions: null,
    medicaments: null,
    physical_disabilities: null,
    medical_terms: false,
    terms_and_conditions: false,
    emergency_relation: null,
    emergency_contact_name: null,
    emergency_contact_phone: null,
    additional_comfort_info: null,
    cancellation_refund_policy: false,
    fees_and_payment: false,
    media_release: null,
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
      label_ka: 'სტუდენტი',
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeStep]);

  const { renderLanguage } = useLanguage();

  return (
    <Stack
      spacing={{ xs: 3, md: 5 }}
      sx={{
        padding: '0px 256px',
        '@media (max-width: 1400px)': {
          padding: '0px 128px',
        },
        '@media (max-width: 1200px)': {
          padding: '0px 64px',
        },
        '@media (max-width: 1000px)': {
          padding: '0px 24px',
        },
        '@media (max-width: 760px)': {
          padding: '0px !important',
        },
        paddingBottom: '128px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack
        sx={{
          padding: '24px',
          marginTop: '48px',
          border: '0.25px solid rgba(0, 0, 0, 0.1);',
          borderRadius: '8px',
          maxWidth: '1172px',
          width: '100%',
          bgcolor: 'background.paper',
        }}
      >
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
          sx={{
            position: 'sticky',
            top: 64,
            zIndex: 10,
            bgcolor: 'background.paper',
            padding: '15px 0px',
          }}
        >
          {steps.map((label) => (
            <Step key={label.label_ka}>
              <StepLabel slots={{ stepIcon: ColorlibStepIcon }}>
                {renderLanguage(label.label_ka, label.label_en)}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <m.div
          key={activeStep}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={stepVariants}
          style={{ marginTop: '24px' }}
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
                  parentInfo={parentInfo}
                />
              )}
              {activeStep === 3 && selectedCourse && (
                <MedicalInfo
                  course={selectedCourse}
                  medicalInfo={medicalInfo}
                  setMedicalInfo={setMedicalInfo}
                  setActiveStep={setActiveStep}
                  parentInfo={parentInfo}
                  studentInfo={studentInfo}
                />
              )}
            </>
          )}
        </m.div>
      </Stack>
    </Stack>
  );
}
