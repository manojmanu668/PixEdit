import React, { useState,useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

const Update = ({auth}) => {
    const [upload,setUpload] = useState(false)
    const [link,setLink] = useState('');
    const [payment,setPayment] = useState('')
    const db = firebase.firestore()

    const [loading,setLoading] = useState(false)
    
    useEffect(() => {
        db.collection('users').doc(auth.uid).collection('payment').doc(auth.uid)
        .get()
        .then(snapshot => setPayment(snapshot.data()))
        return 
    }, [upload])
       
        

    
    console.log("update auth",payment.url)

        const handleSubmit = (e) => {
            e.preventDefault();

            setLoading(true)
       

           db.collection('users').doc(auth.uid)
           .collection('payment').doc(auth.uid).update({
               url: link,
           })
           .then(() => {
               alert('link Updated Successfully')
               setLoading(false)
               setUpload(true)
            
           })
           .catch(error => {
               alert(error.message)
               setLoading(false)
           })


        //    setLink('')
           // setName('')
           // setEmail('')
           // setMessage('')
       }

    
    return (
        <div className="Paycontainer">
            <form className="PayForm" onSubmit={handleSubmit}>
                <h2>Update Payment</h2>

                <div className="PayRow">
                    <div className="PayCol-25">
                        <label>Link</label>
                    </div>
                    <div className="PayCol-75">
                        <input type="text" placeholder="Link" 
                            defaultValue={payment.url}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </div>
                </div>

                <button type="submit" 
                    // style={{background: loading? "ccc": "#5d91f3" }}
                >Upload</button>
                <td onClick={()=> window.open("https://razorpay.com/docs/payment-pages/", "_blank")}>How to Setup a link</td>
            </form>
         </div>
    )
}

export default Update
