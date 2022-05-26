import React, { useState,useEffect,Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Link } from 'react-router-dom'

function Pay({paramId}) {
    const [upload,setUpload] = useState(false)
    const [payment,setPayment] = useState('')
    const db = firebase.firestore()

    useEffect(() => {
        db.collection('users').doc(paramId).collection('payment').doc(paramId)
        .get()
        .then(snapshot => setPayment(snapshot.data()))
        
        return  
    }, [])
         
    

    console.log("Pay before link details",payment.url)
    
    // componentDidMount() 
    if(payment){
        window.open(payment.url)
    } 
 
      
      //Then add to your onClick
      
   
    
    console.log("Pay after link details",payment.url)
    
    
    return (
        <div >
            {/* <Link to={pay} target="_blank"/> */}
            {/* <a onClick={() => openInNewTab({pay})}></a> */}
            
        </div>
    )
}

export default Pay
