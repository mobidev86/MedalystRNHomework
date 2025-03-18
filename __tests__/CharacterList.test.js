import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react-native';
import CharacterListView from '../src/CharacterListView';
import {getApiResponse} from '../src/Api';

// Mock the getApiResponse function from the Api module
jest.mock('../src/Api', () => ({
  __esModule: true,
  getApiResponse: jest.fn(),
}));

describe('CharacterListView', () => {

  /**
   * Test case to check if the character search works correctly.
   */
  test('should search characters correctly', async () => {
    getApiResponse.mockResolvedValue({
      results: [
        {
          name: 'Luke Skywalker',
          eye_color: 'blue',
          gender: 'male',
          created: '2023-01-01T12:00:00Z',
        },
      ],
      count: 1,
    });

    render(<CharacterListView />);
    fireEvent.changeText(screen.getByPlaceholderText('Search ...'), 'Luke');
    const listItems = await screen.findAllByText(/Luke/);
    expect(listItems.length).toBeGreaterThan(0);
  });
});
