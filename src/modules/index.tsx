import Overview from './overview';
import MyPortafolio from './my-portafolio';
import ContactUs  from './contact-us';
import SignIn from './sign-in';
import SignOut from './sign-out';
import { AppRouteProps } from '../core/interfaces/app-route-props';

export const loggedOutNavModules: AppRouteProps[] = [];

export const loggedInNavModules: AppRouteProps[]  = [
  MyPortafolio,
  Overview,
  ContactUs
];

export const loggedInUserModules: AppRouteProps[] = [
  SignOut
];

export const loggedOutUserModules: AppRouteProps[] = [
  SignIn
];

export const logginModule: AppRouteProps = SignIn;

export const homeModule: AppRouteProps = MyPortafolio;