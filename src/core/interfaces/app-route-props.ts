export interface AppRouteProps {
  name: string;
  routeProps: {
    exact?: boolean,
    path: string;
    element: JSX.Element
  },
  nestedChildren?: AppRouteProps[],
  pathChildren?: AppRouteProps[]
}