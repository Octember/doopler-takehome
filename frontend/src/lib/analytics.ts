import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8081';

class Analytics {
  async track(name: string) {
    await axios.post('/events', {name});
  }
};

export default new Analytics();
