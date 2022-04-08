import { Auth } from 'aws-amplify';

const SignInPage = () => {
  return (
    <div>
      <button onClick={() => Auth.federatedSignIn()}>Sign In</button>
    </div>
  )
}

export default SignInPage;