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
                `ჩვენი მიზანია შევქმნათ აკადემია, უნიკალური სივრცე, რომელიც საერთო
ღირებულებების და პრინციპების გარშემო გააერთიანებს ახალ თაობას და ხელს
შეუწყობს მას ლიდერობის უნარების გამომუშავებასა და თანამედროვე,
გლობალურ სამყაროში პასუხისმგებლობიან მოქალაქედ ინტეგრაციაში.
<br />
<br />
აკადემიის კურსები და აქტივობები სწორედ ამ მიზანს ემსახურება. „საბადო-ს“
ამოცანაა იქცეს ინტელექტუალური მიზიდულობის ცენტრად, რომელიც ფეხს
უწყობს თანამედროვე სამყაროს გამოწვევებს, დასაქმების ბაზრის მოთხოვნებს და
ემსახურება ფართო საზოგადოებრივ და მსოფლმხედველობით ინტერესებს.
<br />
<br />
თითოეული კურსის და აქტივობის საფუძველს ის ფასეულობები წარმოადგენს,
რომელიც გვაერთიანებს და რომელზეც „საბადოს“ მსოფლმხედველობაა
დაფუძნებული. მიგვაჩნია, რომ მომავლის მოქალაქეებს, ლიდერებს აუცილებლად
სჭირდებათ ისეთი უნარები, როგორიცაა სამყაროს კრიტიკულ-ანალიტიკური აღქმა,
გამოწვევებისადმი კრეატიული მიდგომების ჩამოყალიბება, სამყაროს
მრავალფეროვნების შეცნობა, ტექნოლოგიური უნარები და თანამშრომლობისა და
კომუნიკაციის ინკლუზიური, თანამშრომლობითი კულტურა.
<br />
<br />
ჰუმანისტური აღზრდის საუკეთესო ტრადიციების მიხედვით ჩვენ გვჯერა
თითოეული ადამიანის, ინდივიდის განსაკუთრებულობის და ჩვენი ამოცანაა
დავეხმაროთ ყველა ჩვენს სტუმარს და მონაწილეს იპოვონ საკუთარი თავის
საუკეთესო ვერსია.
<br />
<br />
გვჯერა, რომ „საბადო“ მის მონაწილეებთან ერთად დიდ ნაბიჯს გადადგამს
თავისუფალი, განათლებული და ღირსეული საზოგადოების მშენებლობაში.`,
                `To create a space around democratic and humanistic values in an informal, interactive environment that will promote the development of leadership skills and the formation of full-fledged citizens of the future, a global world.`
              )
            )}
          </Typography>
        </Stack>
      </m.div>
    </Stack>
  );
}
