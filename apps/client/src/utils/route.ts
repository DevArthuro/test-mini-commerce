import { JSX, lazy, LazyExoticComponent } from "react";

type JSXElement = () => JSX.Element

interface Route {
  id: string;
  href: string;
  path: string;
  appearance: string;
  Component: LazyExoticComponent<JSXElement> | JSXElement;
}

const productsLazy = lazy(() => import("../pages/Home"));

export const ROUTES: Route[] = [
	{
		id: 'root.products',
		href: '/',
		path: 'products',
		appearance: 'products',
		Component: productsLazy,
	},
]