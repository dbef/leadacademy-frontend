export default function MapsTsinandali() {
  const iframeCode = `
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3332.1409912580816!2d44.3801943!3d41.69583739999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x404385d461d65d9d%3A0xe50f4a7602761288!2zU2FiYWRvIOKAoiDhg6Hhg5Dhg5Hhg5Dhg5Phg50!5e1!3m2!1sen!2sge!4v1751458534115!5m2!1sen!2sge" width="100%" height="487" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  `;
  return <div dangerouslySetInnerHTML={{ __html: iframeCode }} />;
}
