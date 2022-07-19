export interface AppRouteProps {
  name: string;
  routeProps: {
    path: string;
    element: JSX.Element
  }
}