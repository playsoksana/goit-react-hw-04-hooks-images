const URL = 'https://pixabay.com/api/';
const KEY = '21828776-3a3234db6b008ce4834511463';
const OPTIONS = 'image_type=photo&orientation=horizontal&per_page=12';

const api = async (search, page) => {
  const response = await fetch(
    `${URL}?q=${search}&page=${page}&key=${KEY}&${OPTIONS}`,
  );
  const responseParse = await response.json();

  return responseParse;
};

export default api;
