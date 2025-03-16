export const termsAndConditions = [
  {
    id: 1,
    title_en: 'Eligibility and Registration',
    title_ka: 'მონაწილეობის უფლებამოსილება და რეგისტრაცია',
    points_ka: [
      'პროექტში მონაწილეობა შეუძლიათ მოსწავლეებს მე-9 კლასიდან ზემოთ',
      'რეგისტრაციის საბოლოო დასტურისთვის საჭიროა შევსებული განაცხადის ფორმა და საფასურის გადახდა',
      'თითოეულ კურსზე მიიღება მაქსიმუმ 50 სტუდენტი',
      'რეგისტრაცია ხორციელდება თავისუფალი ადგილების შესაბამისად',
    ],
    points_en: [
      'Participation is open to students currently enrolled from the 9th grade',
      'A completed application form and payment are required to confirm enrollment',
      'Max. 50 students are accepted during one course',
      'Enrollment is subject to availability, according to the number of students',
    ],
    is_required: false,
    key: 'eligibility_and_registration',
  },
  {
    id: 2,
    title_ka: 'ჯანმრთელობა და უსაფრთხოება',
    title_en: 'Health and Safety',
    points_ka: [
      'ყველა მონაწილემ უნდა წარმოადგინოს სრულად შევსებული სამედიცინო ფორმა',
      'მშობლები/მეურვეები ვალდებულნი არიან, მიუთითონ სრულყოფილად მონაწილის სამედიცინო მდგომარეობა, ან ნებისმიერი სახის ალერგიის შესახებ ინფორმაცია',
      'ყველა აქტივობის დროს უზრუნველყოფილი იქნება სათანადო ზედამხედველობა და უსაფრთხოების ზომები',
      'აკადემიის პერსონალს უფლება აქვს, გაუწიოს პირველადი დახმარება და, საჭიროების შემთხვევაში, მიმართოს სამედიცინო მომსახურებას.',
    ],
    points_en: [
      'All participants must have a completed health form',
      'Parents/guardians are responsible for disclosing any medical conditions or allergies',
      'Adequate supervision and safety measures will be in place during all activities',
      'Academy staff are authorised to administer first aid and seek medical attention in emergencies',
    ],
    is_required: false,
    key: 'health_and_safety',
  },
  {
    id: 3,
    title_ka: ' ქცევა და დისციპლინა',
    title_en: 'Behaviour and Discipline',
    points_ka: [
      'სტუდენტებმა უნდა დაიცვან აკადემიის ქცევის კოდექსი',
      'ალკოჰოლის, სიგარეტის ან ნებისმიერი უკანონო ნივთიერების გამოყენება მკაცრად აკრძალულია',
      'არასწორი ქცევა შეიძლება გახდეს დისციპლინური ზომების მიზეზი, რაც შეიძლება მოიცავდეს აკადემიიდან გარიცხვას თანხის დაბრუნების გარეშე',
      'სტუდენტი, რომელიც შემჩნეული იქნება ზემოხსენებული აკრძალული ნივთირებების გამოყენებაში, გარიცხული იქნება აკადემიიდან.',
    ],
    points_en: [
      'Students are expected to adhere to the Academy’s code of conduct at all times',
      'The use of alcohol, cigarettes, or any illegal substances is strictly prohibited',
      'Any behaviour deemed inappropriate may result in disciplinary action, including dismissal from the Academy without a refund',
      'Any student found in possession of or using these items will be dismissed from the Academy',
    ],
    is_required: false,
    key: 'behaviour_and_discipline',
  },
  {
    id: 4,
    title_ka: 'მედია გამოყენება',
    title_en: 'Media Release',
    points_ka: [
      'აკადემიის განმავლობაში გადაღებული ფოტო/ვიდეო მასალები, შესაძლოა, გამოყენებული იქნას სარეკლამო და საჯარო მოხმარებისთვის. ',
    ],
    points_en: [
      'During all periods, photographs and videos will be taken for promotional purposes and public use',
    ],
    options_ka: [
      'I confirm that I have given prior consent for my child’s photos to be taken',
      'I refuse to give prior permission to use my child’s photos',
    ],
    options_en: [
      'I confirm that I have given prior consent for my child’s photos to be taken',
      'I refuse to give prior permission to use my child’s photos',
    ],
    is_required: false,
    key: 'media_release',
  },
  {
    id: 5,
    title_ka: 'მშობლების ჩართულობა',
    title_en: 'Parent Involvement',
    points_ka: [
      'აკადემიის ტერიტორიაზე მშობლების/მეურვეების ყოფნა აკრძალულია აქტივობების მიმდინარეობისას',
      'ნებისმიერი კითხვისა და პრობლემის შემთხვევაში, კომუნიკაცია უნდა მოხდეს აკადემიის მიერ განსაზრვრული საკომუნიკაციო არხების მეშვეობით.',
    ],
    points_en: [
      'Parents/guardians are not permitted in the Academy area during activities, to ensure a focused environment for students',
      'Enquiries or concerns should be directed to Academy staff through the designated communication channels',
    ],
    is_required: false,
    key: 'parent_involvement',
  },
  {
    id: 6,
    title_ka: 'საფასური და გადახდა',
    title_en: 'Fees and Payment',
    points_ka: [
      'გარდა წინასწარ შეთანხმებული შემთხვევებისა, კურსის საფასურის გადახდა უნდა მოხდეს წინასწარ, რეგისტრაციის დასრულებისას',
      'თანხის დაბრუნება შესაძლებელია მხოლოდ სამედიცინო ცნობის წარდგენის ან კურსის გაუქმების შემთხვევაში',
      'გადახდის მეთოდები მოიცავს საბანკო ბარათებს და საბანკო გადარიცხვებს.',
    ],
    points_en: [
      'Fees must be paid in full at the time of registration unless prior arrangements have been made',
      'Fees are non-refundable except in cases of medical documentation or course cancellation',
      'Payment methods include credit/debit cards or bank transfers',
    ],
    is_required: true,
    key: 'fees_and_payment',
  },
  {
    id: 7,
    title_ka: 'გაუქმებისა და თანხის დაბრუნების პოლიტიკა',
    title_en: 'Cancellation & Refund Policy',
    points_ka: [
      'რეგისტრაციიდან 72 საათის განმავლობაში, რეგისტრაციის გაუქმების შემთხვევაში, თანხა სრულად ანაზღაურდება',
      'კურსის თარიღის ცვლილება შესაძლებელია მხოლოდ სამედიცინო ცნობის წარდგენის საფუძველზე',
      '72-საათიანი პერიოდის შემდეგ რეგისტრაციის გაუქმების შემთხვევაში თანხა არ ანაზღაურდება',
      'კურსზე გამოუცხადებლობის შემთხვევაში, ანაზღაურება არ მოხდება',
      'კურსის გაუქმების შემთხვევაში, მონაწილეებს შესაძლებლობა ექნებათ თარიღის ცვლილების ან თანხის სრულად დაბრუნების',
      'თანხის დაბრუნება მოხდება 7-10 სამუშაო დღის განმავლობაში თავდაპირველი გადახდის მეთოდით.',
    ],
    points_en: [
      'Applicants may cancel their registration within 72 hours of signing up to receive a full refund',
      'Participants may request a date change if they provide valid medical documentation',
      'Cancellations made after the 72-hour window are non-refundable',
      'Participants who fail to attend without prior notice are not eligible for refunds or rescheduling',
      'If the camp must cancel a lecture due to unforeseen circumstances, participants will receive either a rescheduled session or a full refund',
      'Approved refunds will be processed within 7–10 business days via the original payment method',
    ],
    is_required: true,
    key: 'cancellation_refund_policy',
  },
  {
    id: 8,
    title_ka: 'განაცხადის განხილვის პროცესი',
    title_en: 'Application Review Process',
    points_ka: [
      'განაცხადის შევების შემდეგ, საბოლოო დასტურისთვის, გთხოვთ, დაელოდოთ მეილს და მოახდინოთ ანგარიშსწორება',
      'საბოლოო დასტურს მიიღებთ ელექტრონული ფოსტის საშუალებით, სტუდენტის აკადემიური მაჩვენებლებისა და სხვა კრიტერიუმების შეფასების შემდეგ',
      'უსაფრთხოებასთან დაკავშირებული საკითხების მქონე აპლიკანტები არ მიიღებიან. საბოლოო სია ფორმირდება უსაფრთხოების გუნდის რეკომენდაციების გათვალისწინებით.',
    ],
    points_en: [
      "Submitting an application does not guarantee admission. All applications are reviewed by the academy's organisational team.",
      'Final confirmation of acceptance will be sent via email after evaluating the applicant’s academic performance and other relevant criteria.',
      'Applicants with security-related concerns will not be accepted. The final admission list is confirmed in coordination with the security team.',
    ],
    is_required: false,
    key: 'application_review_process',
  },
  {
    id: 9,
    title_ka: 'გთხოვთ, წინამდებარე ინფორმირების ფორმა ყურადღებით წაიკითხოთ',
    title_en: 'Please carefully review this information form',
    points_ka: [
      'ააიპ ‘’ლიდერობის გაძლიერებისა და განვითარების აკადემია’’ (ს/ნ: 405757220) (შემდგომში - „ორგანზიაცია“ ან/და „ჩვენ“) თქვენს მიერ განცხადის შევსებისას წარმოდგენილ მონაცემებს ამუშავებს „პერსონალურ მონაცემთა დაცვის შესახებ“ საქართველოს კანონის შესაბამისად, კონკრეტული, მკაფიოდ განსაზღვრული მიზნებით, ამავე კანონით განსაზღვრული საფუძვლებითა და მოთხოვნების სრული დაცვით. ',
    ],
    points_en: [
      `The Academy of Leadership Development and Empowerment (Registration No.:
405757220) (hereinafter referred to as the “Organization” or “We”) processes the data
you provide when completing the application in accordance with the Law of Georgia “On
Personal Data Protection.” This processing is conducted for specific, clearly defined
purposes, based on the grounds established and in full compliance with the
requirements outlined in the aforementioned law.
`,
    ],
    is_required: false,
    key: 'read_carefully',
  },
  {
    id: 10,
    title_ka: 'მონაცემები, რომელსაც ვამუშავებთ',
    title_en: 'Data Processing Statement',
    points_ka: [
      'ჩვენ ვამუშავებთ, მათ შორის, ვაგროვებთ და ვინახავთ  პერსონალურ მონაცემებს, რომელთაც თქვენ მოგვაწვდით განაცხადის შევსების პროცესში. ',
    ],
    points_en: [
      `We process personal data, which includes collecting and storing information that you provide during the application process.`,
    ],
    is_required: false,
    key: 'information_processing',
  },
  {
    id: 11,
    title_ka: 'დამუშავების მიზანი',
    title_en: 'Purpose of Processing',
    points_ka: [
      'განცხადების განხილვის მიზნით',
      'პროექტში მონაწილეობის კანდიდატის შესაბამისობის დადგენის და შესაბამისი გადაწყვეტილების მიღების მიზნით',
      'არასრულწლოვნის საუკეთესო ინტერესების დაცვის მიზნით',
      'არასრულწლოვანის ჯანმრთელობისთვის უსაფრთხო გარემოს უზრუნველყოფის მიზნით',
      'იმ შემთხვევაში, თუ თქვენ არ მოგვაწოდებთ ინფორმაციას არასრულწლოვანის განსაკუთრებული საჭიროებების ან/და მისი ჯანმრთელობის მდგომარეობის შესახებ, ორგანიზაცია იტოვებს უფლებას არ განიხილოს მისი კანდიდატურა პროექტში მონაწილეობისთვის, რადგან მოკლებული ვართ შესაძლებლობას არასრულწლოვანს შევთავაზოთ მისი ჯანმრთელობისთვის უსაფრთხო გარემო, მისივე საუკეთესო ინტერესების გათვალისწინებით.',
    ],
    points_en: [
      `To review the application`,
      'To assess the suitability of the candidate for participation in the project and to make an informed decision',
      'To protect the best interests of the minor',
      'To ensure a safe environment conducive to the health and well-being of the minor',
      ` If you do not provide us with information about the minor's special needs and/or
health condition, the organization reserves the right not to consider his or her
candidacy for participation in the project, as we may be unable to ensure a safe
environment for the minor’s health, in consideration of his or her best interests.
`,
    ],
    is_required: false,
    key: 'purpose_of_processing',
  },
  {
    id: 12,
    title_ka: 'მონაცემთა დამუშავების საფუძველი',
    title_en: 'Grounds for Data Processing',
    points_ka: [
      `განაცხადში წარმოდგენილი მშობლის/კანონიერი წარმომადგენლის და 16 წელს მიღწეული არასრულწლოვანის პერსონალური მონაცემების დამუშავების საფუძვლებია: ა) განაცხადის განხილვა („პერსონალურ მონაცემთა დაცვის შესახებ“ საქართველოს კანონის მე-5 მუხლის პირველი პუნქტის „კ“ ქვეპუნქტი); ბ) ორგანზიაციის მიერ მისი მნიშვნელოვანი ლეგიტიმური ინტერესის დაცვა („პერსონალურ მონაცემთა დაცვის შესახებ“ საქართველოს კანონის მე-5 მუხლის პირველი პუნქტის „ი“ ქვეპუნქტი).`,
      `ორგანიზაცია  უფლებამოსილია „პერსონალურ მონაცემთა დაცვის შესახებ“ საქართველოს კანონის მე-6 მუხლის პირველი პუნქტის „დ“ ქვეპუნქტის საფუძველზე, დაამუშაოს არასრულწლოვანის განსაკუთრებული კატეგორიის მონაცემები, ჯანმრთელობის სფეროსთვის მიკუთვნებული პრევენციული ღონისძიებების შემუშავებისთვის.`,
    ],
    points_en: [
      `The grounds for processing the personal data of a parent/legal representative and of a
minor aged 16 or older, as presented in the application, are as follows:
a) consideration of the application (subparagraph “k” of paragraph 1, Article 5 of the
Law of Georgia On Personal Data Protection);
b) protection of the organization’s important legitimate interest (subparagraph “i” of
paragraph 1, Article 5 of the Law of Georgia On Personal Data Protection).
`,
      `The organization is authorized, pursuant to subparagraph " of paragraph 1,
Article 6 of the Law of Georgia On Personal Data Protection, to process special

category data of minors for the purpose of developing preventive measures in the
health sector.
`,
    ],
    is_required: false,
    key: 'purpose_of_processing_v2',
  },
  {
    id: 13,
    title_ka: 'მონაცემების შენახვის ვადა',
    title_en: 'Data Retention Period',
    points_ka: [
      `ორგანიზაცია განაცხადში წარმოდგენილ მონაცემებს ინახავს პროცესიდან გამომდინარე ვადით. კერძოდ, იმ შემთხვევაში თუ არასრულწლოვანი არ შეირჩვეა პროექტში მონაწილედ, მასთან დაკავშირებული მონაცემების შენახვის ვადა განსაზღვრულია შერჩევის დასრულებამდე. ხოლო თუ არასრულოვანი შერჩეული იქნება პროექტის მონაწილედ ორგანიზაცია მონაცემების ინახავს პროექტის დასრულებამდე, თუ კანონმდებლობით სხვა ვადა არ არის დადგენილი. `,
    ],
    points_en: [
      `The organization retains the data submitted in the application for a period determined by
the specific stage of the process. Specifically:
If the minor is not selected as a participant in the project, the data related to him
or her is retained until the end of the selection process.
If the minor is selected as a participant, the data is retained until the end of the
project, unless a different retention period is established by law.
`,
    ],
    is_required: false,
    key: 'purpose_of_processing_v2',
  },
  {
    id: 14,
    title_ka: 'თქვენი უფლებები',
    title_en: 'Your Rights',
    points_ka: [
      `ორგანიზაცია თავის საქმიანობას ახორციელებს „პერსონალურ მონაცემთა დაცვის შესახებ“ საქართველოს კანონის სრული დაცვით. თქვენ უფლება გაქვთ ნებისმიერ დროს მოითხოვოთ ის ინფორმაცია, რომელსაც ჩვენ თქვენს შესახებ ვინახავთ და მოითხოვოთ ნებისმიერი უზუსტობის გასწორება,  განახლება, დამატება, დაბლოკვა, წაშლა და განადგურება და „პერსონალურ მონაცემთა დაცვის შესახებ“ საქართველოს კანონის მე-3 თავით გარანტირებული უფლებები, თუ არ არსებობს ამავე კანონით გათვალისწინებული უფლების შეზღუდვის საფუძველი. `,
    ],
    points_en: [
      `The organization operates in full compliance with the Law of Georgia On Personal Data
Protection. You have the right to request, at any time, access to the personal data we
hold about you, as well as to request the correction, updating, supplementation,
blocking, deletion, or destruction of any inaccurate data. You are also entitled to
exercise the rights guaranteed under Chapter 3 of the Law, unless there are legal
grounds for restricting those rights as provided by the same law.

`,
    ],
    is_required: false,
    key: 'your_rights',
  },
  {
    id: 15,
    title_ka:
      'თუ გაქვთ ნებისმიერი სახის შეკითხვა იმაზე, თუ როგორ ვამუშავებთ თქვენს მიერ მოწოდებულ პერსონალურ მონაცემებს, მოგვმართოთ ელექტრონულ ფოსტაზე: contact@sabado.edu.ge',
    title_en:
      'If you have any questions regarding the processing of your personal data, please contact us at contact@sabado.edu.ge',
    points_ka: [],
    points_en: [],
    is_required: false,
    key: 'questions',
  },
];
