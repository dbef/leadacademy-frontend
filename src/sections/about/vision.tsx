import { m } from 'framer-motion';
import parser from 'html-react-parser';

import { Stack, Typography } from '@mui/material';

import { useLanguage } from 'src/contexts/language-context';

export function Vision() {
  const { renderLanguage } = useLanguage();

  return (
    <Stack
      direction={{ md: 'row', xs: 'column' }}
      spacing={4}
      sx={{ mb: 10 }}
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <m.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.5 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFeatureSettings: "'case' on",
            background: 'linear-gradient(50deg, #0A66C2 0%, #05305C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {renderLanguage('ხედვა', 'Vison')}
        </Typography>
      </m.div>
      <m.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        <Stack width={{ xs: '100%', md: '867px' }} direction="row" spacing={2}>
          <Typography>
            {parser(
              renderLanguage(
                `თანამედროვე განათლების სისტემა უპრეცედენტო სიჩქარით იცვლება, რაც განაპირობებს ეკონომიკური, კულტურული და სამუშაო გარემოს ფუნდამენტურ გარდაქმნას. ის, რაც თანამედროვედ გამოიყურება დღეს, მოძველებული იქნება ხვალ.
მიმდინარე ცვლილებებს ფეხი რომ ავუწყოთ და დავრჩეთ კონკურენტული სწრაფად ცვალებად სამყაროში, უნდა გამოვიყენოთ განათლების ყოვლისმომცველი ძალა და აღმოვაჩინოთ დამალული პოტენციალი ჩვენი პროგრამების თითოეულ მონაწილეში. 
მომავლის ლიდერებს უნდა ჰქონდეთ უნარი, შეიმეცნონ, გადაიაზრონ და შექმნან ახალი ძველის ნაცვლად. ამისთვის მათ სჭირდებათ, ტრადიციულ აკადემიურ მეთოდებთან ერთად, დაუთმონ დრო და ენერგია არაფორმალურ განათლებას.
„საბადოში“ ჩვენ ვაერთიანებთ განსხვავებულ ადამიანებს, ხელს ვუწყობთ თანამშრომლობისა და კომუნიკაციის კულტურის ჩამოყალიბებას, ვეხმარებით მათ დაფარული ტალანტისა და უნარების აღმოჩენაში. ვუზიარებთ ცოდნას, ვზრუნავთ ჩვენს ფასეულობებზე და ამ გზით მიზნად ვისახავთ აქტიური, პასუხისმგებლიანი და ეთიკური ლიდერების ჩამოყალიბებას, რომლებიც შექმნიან უკეთეს მომავალს.
„საბადოელებს“ უნდა შეეძლოთ კრიტიკულად აზროვნება, ჰქონდეთ მოქმედების ძალა და მისცენ მაგალითი სხვებს. ლიდერობისკენ ამ მოგზაურობაში მათ ხელს შეუწყობენ ჩვენი ექსპერტები, აღმზრდელები და მონაწილეთა დიდი ოჯახი.`,
                `We recognize that the global educational landscape is evolving at an unprecedented pace, aiming to address paradigm shifts in economies, cultures, and work environments. What is relevant today may become obsolete tomorrow. To remain relevant—and competitive—we must harness the cumulative power of education and discover the untapped potential within each learner. Leaders of tomorrow must be equipped to learn, unlearn, and relearn, investing in informal education alongside traditional academic pathways.
At Sabado, we bring diverse individuals together to foster collaboration and communication, empowering them to unlock their unique talents. By sharing our potential and promoting our shared values, we aim to cultivate active, responsible, and ethical leaders capable of shaping a better future. Our cohorts are encouraged to think critically, act with purpose, and inspire others, supported by a strong network of experts and alumni on their leadership journeys.`
              )
            )}
          </Typography>
        </Stack>
      </m.div>
    </Stack>
  );
}
