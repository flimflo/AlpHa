import { firestore as firestoreInstance } from "./firebase";

export const LeaguesCollection = firestoreInstance.collection('leagues')
export const VenueCollection = firestoreInstance.collection('venues')
export const SponsorsCollection = firestoreInstance.collection('sponsors')
export const TeamsCollection = firestoreInstance.collection('teams')
export const UserClaimsCollection = firestoreInstance.collection('user-claims')
export const NewsCollection = firestoreInstance.collection('news')
export const MediaCollection = firestoreInstance.collection('media')
export const RulesCollection = firestoreInstance.collection('rules')
export const RolesCollections = firestoreInstance.collection('role-table')
export const CommentsCollection = firestoreInstance.collection('comment-box')
export const LeagueInfoCollection = firestoreInstance.collection('league-info')
