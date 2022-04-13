import Overview from './overview';
import MyPortafolio from './my-portafolio';
import ContactUs  from './contact-us';
import SignIn from './sign-in';
import SignOut from './sign-out';

export const loggedOutModules = [
  SignIn
]

export const loggedInModules = [
  Overview,
  MyPortafolio,
  ContactUs,
  SignOut
]