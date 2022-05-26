import firebase from 'firebase/app'
import 'firebase/firestore'
import { NavLink } from 'react-router-dom'
import React, { Component } from 'react'

export const TabsValue = (paramId) => {
    return async (dispatch, getState , { getFirebase, getFirestore }) => {
  
      // adding data to firestore
      //const firestore = getFirebase().firestore()
      const auth = getState().firebase.auth.uid // accessing user's user ID
      // console.log("Tabs value for praram",paramId)
      // console.log("Tabs value for auth",auth)
      const db = firebase.firestore();

        db.collection('users').doc(auth).collection('payment').doc(auth)
        .get()
        .then((docs) => {
            
              //console.log("isSetup final: ", this.state.isSetup)
              console.log("tabs action")
              if( auth === paramId){
                if(docs.exists){
                    dispatch({
                        type: 'IF_DOC_EXISTS',
                       payload: ['Artwork', 'Update', 'Collection', 'Bio']
                    })
                    console.log("tabs action if doc exists")
                } else {
                    dispatch({
                        type: 'IF_DOC_EXISTS',
                        payload: ['Artwork', 'Setup', 'Collection', 'Bio']
                    })
                    console.log("tabs action if doc doesnt exist")
                }
              } else {
                dispatch({
                    type: 'IF_DOC_EXISTS',
                    payload: ['Artwork',<NavLink to={
                      {
                        pathname: '/message/'+ auth,
                        //userProps: {paramId:paramId}
                      }
                    } style={{color :'black'}} > Messages </NavLink>,'Make Paymant','Bio']
                })
                console.log("tabs action for other user")
              }
            }
            
          
        ).catch(function(error) {
            console.log("Error getting document:", error);
            });

    }
}