import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import { ROUTES } from "./utils/route"

function App() {
	return (
		<>
			<Routes>
				<Route element={<Navbar />}>
					{ROUTES.map(({ href, Component, id }) => (
						<Route path={href} element={<Component />} key={id} />
					))}
				</Route>
			</Routes>
		</>
	)
}

export default App
