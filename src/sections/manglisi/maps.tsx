export default function MapsTsinandali() {
  const iframeCode = `
 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13328.078176777728!2d44.36281441035093!3d41.698181509919294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x404385e6c435642b%3A0x69be5084ed0884a6!2z4YOb4YOQ4YOc4YOS4YOa4YOY4YOh4YOY!5e1!3m2!1ska!2sge!4v1745396963208!5m2!1ska!2sge" width="100%" height="487" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  `;
  return <div dangerouslySetInnerHTML={{ __html: iframeCode }} />;
}
