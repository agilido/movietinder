import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Main from '../components/Main';
import Card from '../components/Card';

describe('Heading', () => {
  test('Rating scope equals 10', async () => {
    const { getAllByRole } = render(<Main />)

    await waitFor(() => {
      expect(getAllByRole('heading').every((h) => {
        if (/10/.test(h.outerHTML)) {
          return true
        }
      })).toBeTruthy()
    }, { timeout: 2500 })
  })

})

describe('Buttons', () => {
  test('Rendering', () => {
    const { getByText } = render(<Main />)
    expect(getByText('Accept')).toBeInTheDocument()
    expect(getByText('Reject')).toBeInTheDocument()
  })
})

describe('Loading functioning', () => {
  test('Check if loader is present when loading data', () => {
    const { queryByRole } = render(<Card />)
    expect(queryByRole('progressbar')).toBeTruthy()
  })
  test('Check if content is loaded', async () => {
    const { getByAltText } = render(<Main />)

    await waitFor(() => {
      expect(getByAltText("poster")).toHaveAttribute('src')
    }, { timeout: 2500 })
  })
})