import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const Navbar = () => {
	return (
		<div>
			Navbar
			<Suspense fallback={<h1>Loading...</h1>}>
				<Outlet />
			</Suspense>
		</div>
	)
}

export default Navbar
