const axios = require('axios');
const FormData = require('form-data');

(async () => {
  try {
    const fd = new FormData();
    fd.append('title', 'Switch to test DB (script)');
    fd.append('content', 'Saved to test DB via script');
    fd.append('tags', JSON.stringify(['switch','test']));

    const res = await axios.post('http://127.0.0.1:3000/api/blogs', fd, {
      headers: {
        ...fd.getHeaders()
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    console.log('Response:', res.status, res.data);
  } catch (err) {
    console.error('Request failed:', err.response ? err.response.data : err.message);
  }
})();