import firebase from "./firebase";
const firestoreInstance = firebase.firestore()

export const LeaguesCollection = firestoreInstance.collection('leagues')
export const VenueCollection = firestoreInstance.collection('venues')
export const SponsorsCollection = firestoreInstance.collection('sponsors')