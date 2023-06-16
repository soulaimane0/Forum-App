export const findById = (resources, id) => resources.find((item) => item.id === id);

export const handleImgError = (e) => (e.target.src = '/user-placeholder.png');
