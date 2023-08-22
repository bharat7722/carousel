import React from 'react';
import { auth, facebookProvider, provider, twitterProvider } from './config';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from '../../stateManagement/actions/userAction';
function SignIn() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.userInfo)
  const handleSignin = (auth, provider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(setUserAction({ userName: user.displayName, isLogin: true,}))
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUserAction({ userName: "", isLogin: false}))
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-6 offset-sm-3'>
        <div className="card">
          <div className="card-header">SIGN In With Social</div>
          <div className="card-body d-flex flex-wrap">  {user.isLogin ? (
            <div>
              <p>{user.userName}</p>
              <br />
              <button onClick={handleSignOut} className='btn btn-primary mx-4'>
                Sign Out
              </button>
            </div>
          ) : (
            <div className='d-flex flex-wrap gap-2'>
              <button onClick={() => handleSignin(auth, provider)} className='btn btn-primary my-2 mx-2'>
                Sign In With Google
              </button>
              <button onClick={() => handleSignin(auth, facebookProvider)} className='btn btn-primary my-2'>
                Sign In With Facebook
              </button>
              <button onClick={() => handleSignin(auth, twitterProvider)} className='btn btn-primary my-2'>
                SignIn With Twitter
              </button>
            </div>
          )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
