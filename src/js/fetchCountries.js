const fields = ['name', 'capital', 'population', 'flags', 'languages'];

export const fetchCountries = name => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=${fields.join(',')}`
    )
      .then(response => {
        if (!response.ok) {
          resolve([]);
          return;
        }

        return response.json();
      })
      .then(data => {
        resolve(data);
      });
  });
};
