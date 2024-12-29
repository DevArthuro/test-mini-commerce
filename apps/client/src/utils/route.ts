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
const summaryLazy = lazy(() => import("../pages/Summary"));
const checkoutLazy = lazy(() => import("../pages/Checkout"))

export const ROUTES: Route[] = [
  {
    id: "root.products",
    href: "/",
    path: "products",
    appearance: "products",
    Component: productsLazy,
  },
  {
    id: "root.summary",
    href: "/summary",
    path: "sumary",
    appearance: "summary",
    Component: summaryLazy,
  },
  {
    id: "root.checkout",
    href: "/checkout",
    path: "checkout",
    appearance: "checkout",
    Component: checkoutLazy,
  },
];