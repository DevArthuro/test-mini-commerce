import { render } from '@testing-library/react'
import App from '../App'

describe('Check Jest', () => {
	it('simple check', () => {
		expect(true).toBe(true)
	})
})

describe('App', () => {
	it('should render', () => {
		const { getByText } = render(<App />)
		const hello = getByText(/hello/i)
		expect(hello).toBeInTheDocument()
	})
})

