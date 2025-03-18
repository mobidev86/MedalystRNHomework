import {BaseURL, getApiResponse} from '../src/Api';

// Mock the global fetch function for testing purposes
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({results: [{name: 'Luke Skywalker'}]}),
  }),
);

describe('getApiResponse', () => {
  /**
   * Test case to check if the API call returns data correctly when successful.
   */
  it('should return data when the API call is successful', async () => {
    const data = await getApiResponse(
      `${BaseURL}?search=Luke&page=1`,
    );
    expect(data.results).toHaveLength(1);
    expect(data.results[0].name).toBe('Luke Skywalker');
  });

  /**
   * Test case to check how the function handles errors when the fetch request fails.
   */
  it('handles errors when fetch fails', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Network error')),
    );
    const data = await getApiResponse(`${BaseURL}?search=Luck&page=1`);
    expect(data).toEqual({});
  });
});
