import { firestore as firestoreInstance } from "./firebase";

export const LeaguesCollection = firestoreInstance.collection('leagues')
export const VenueCollection = firestoreInstance.collection('venues')
export const SponsorsCollection = firestoreInstance.collection('sponsors')
export const TeamsCollection = firestoreInstance.collection('teams')
export const UserClaimsCollection = firestoreInstance.collection('user-claims')