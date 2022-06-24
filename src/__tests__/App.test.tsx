import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Main from '../components/Main';

describe('Heading', () => {
    test('Rating scope equals 10', () => {
      const { getAllByRole } = render(<Main />)

      expect(getAllByRole('heading').every((h) => {
        console.log(h)
        if(/10/.test(h.outerHTML)) {
            return true
        }
      })).toBeTruthy()
    })
})

describe('Buttons', () => {
    test('Rendering', () => {
        const { getByText } = render(<Main />)
        expect(getByText('Accept')).toBeInTheDocument()
        expect(getByText('Reject')).toBeInTheDocument()
    })
})

