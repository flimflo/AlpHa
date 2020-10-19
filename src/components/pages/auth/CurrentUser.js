import {useEffect, useState} from "react";
import { auth } from "../../../firebase";
import {UserClaimsCollection} from "../../../firestoreCollections";


export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState(undefined)
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        UserClaimsCollection.doc(user?.uid)
          .get()
          .then((ref) => {
            const data = (ref).data()
            setCurrentUser({ uid: user.uid, ...data })
          })
      } else {
        setCurrentUser(null)
      }
    })
  })
  return currentUser
}