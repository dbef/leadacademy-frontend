export default function MapsTsinandali() {
  const iframeCode = `
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.8433336188036!2d45.52963101185106!3d41.91344076308054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4045cd5810deb5a7%3A0xdc0c2ce291fba3d!2z4YOb4YOd4YOh4YOb4YOY4YOU4YOg4YOY!5e1!3m2!1ska!2sge!4v1743599227645!5m2!1ska!2sge" width="100%" height="487" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  `;
  return <div dangerouslySetInnerHTML={{ __html: iframeCode }} />;
}
