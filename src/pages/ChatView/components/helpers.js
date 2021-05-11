export const parseDate = (dateString) => {
  const date = new Date(dateString);
  let [hour, minutes] = [date.getHours(), date.getMinutes()];
  let ampm = hour >= 12 ? 'pm' : 'am';
  if (hour > 12) hour = hour - 12;
  if (hour === 0) hour = 12;
  if (minutes < 10) minutes = '0' + minutes;
  return `${hour}:${minutes} ${ampm} `;
};

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const imgurUpload = (formData, callback) => {
  return fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: {
      Authorization: 'Client-ID 6d84228a1a2def2',
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res)
      if (res.status === 200) callback(res.data.link);
      else alert('Please select a valid image', 'Error');
    })
    .catch(() => {});
};

export const getGif = (searchText, callback) => {
  return fetch(
    'https://api.giphy.com/v1/gifs/search?' +
      new URLSearchParams({
        api_key: 'giqPI3ShZDEzc4Y6Icbe8QHIJvwr6P3I',
        q: searchText,
      }),
    {
      method: 'GET',
    }
  )
    .then((response) => response.json())
    .then((res) => callback(res.data))
    .catch((error) => {
      console.error(error);
    });
};

export const getAvatar = (name, callback) => {
  return fetch(
    'https://ui-avatars.com/api/?' +
      new URLSearchParams({
        name,
      })
  )
    .then((response) => response.blob())
    .then(async (image) => callback(await toBase64(image)))
    .catch((err) => console.error(err));
};
