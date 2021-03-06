import { useDocumentData } from "react-firebase-hooks/firestore"
import { useLocation } from "react-router-dom"
import { LeaguesCollection } from "./firestoreCollections"

export function useLeagueData() {
    const leagueId =  useLocation().pathname?.split('/')?.[1] || 'empty' //esta gacho esto
    const [{ leagueName, color } = {}] = useDocumentData(LeaguesCollection.doc(leagueId))

    return { leagueId, leagueName, color}
}
