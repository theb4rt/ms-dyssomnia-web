import axios, { AxiosError } from 'axios';

export class HttpService {
  public async post(url: string, data: any): Promise<void> {
    try {
      await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Data sent to the endpoint successfully.');
    } catch (error) {
      this.handleRequestError(error);
    }
  }

  private handleRequestError(error: any): void {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Request failed with status:', axiosError.response?.status);
      console.error('Response data:', axiosError.response?.data);
    } else {
      console.error('Error occurred while sending the request:', error);
    }
    throw error;
  }
}
