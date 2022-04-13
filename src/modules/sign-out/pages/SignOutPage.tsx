import { Auth } from 'aws-amplify';

const SignOutPage = () => {
  return (
    <div>
      <button onClick={async () => await Auth.signOut()}>Sign Out</button>
    </div>
  )
};

export default SignOutPage;