import React, { useState, useEffect } from "react"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"
import { useParams } from "react-router-dom"
import { LeaguesCollection, RulesCollection } from "../../../firestoreCollections"
import "../regulation/Regulation.css"

function Regulation() {
  const {leagueId} = useParams()
  const [value, loading, error] = useDocumentDataOnce(LeaguesCollection.doc("DMpXPRsBI9DuOm8gOA7y")) //leagueId)
  let [rules, setRules] = useState([])

  async function getRules() {
    let rulesList = []
    await RulesCollection.where("leagueId", "==", "DMpXPRsBI9DuOm8gOA7y") //leagueId)
    .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
             for (let i = 0; i < doc.data().rules.length; i++) {
                 rulesList.push(doc.data().rules[i].rule)
             }
        })
    })
    setRules(rulesList)
    console.log(rulesList)
}

useEffect(() => {
  getRules()
}, []);

  return(
    <>
    <div className="Title">
    <h1>Reglamento oficial de la liga {value?.leagueName}</h1>
    </div>
    <div className="Regulation">
        {rules.map((rule, index) => (
          <h3>{index + 1}.- {rule} </h3>
        ))}
      </div>
    </>
  )
}

export default Regulation;
