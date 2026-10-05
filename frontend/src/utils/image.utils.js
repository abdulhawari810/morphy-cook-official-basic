export const getAssetImage = (imageName) => {
  if (!imageName) return '';

  // Membaca semua file gambar di dalam src/assets/ secara dinamis
  const images = import.meta.glob('@/assets/**/*', { eager: true, import: 'default' });

  // Mencari path yang sesuai dengan nama file yang diminta
  const path = `/src/assets/${imageName}`;
  return images[path] || '';
};
