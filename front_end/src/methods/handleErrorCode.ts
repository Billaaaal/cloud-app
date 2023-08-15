function handleErrorCode(errorCode: String) {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Email already in use';

    case 'auth/invalid-email':
      return 'Invalid email';

    case 'auth/weak-password':
      return 'Weak password';

    case 'auth/operation-not-allowed':
      return 'Operation not allowed';

    case 'auth/too-many-requests':
      return 'Too many requests';

    case 'auth/network-request-failed':
      return 'Network request failed';
    case 'auth/user-not-found':
      return 'User not found'; //not secure so maybe use rather 'Email or password incorrect'
    case 'auth/wrong-password':
      return 'Wrong password';
    //case no email was provided
    //case no password was provided

    default:
      return 'Error';
  }
}

export default handleErrorCode;
