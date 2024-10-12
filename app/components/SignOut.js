import React from 'react'
import { auth } from '../firebase'

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.SignOut()}>Sign Out</button>
  )
}

export default SignOut