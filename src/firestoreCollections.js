const { firestore } = require("firebase");

const firestoreInstance = firestore()

export const LeaguesCollection = firestoreInstance.collection('leagues')
export const VenueCollection = firestoreInstance.collection('venues')
export const SponsorsCollection = firestoreInstance.collection('sponsors')