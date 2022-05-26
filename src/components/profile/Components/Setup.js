import React, { Component } from 'react'
import { render } from 'react-dom'
import { useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import Tabs from '../Tabs'


function Setup (props)  {
    //   const [name,setName] = useState('');
    const [link,setLink] = useState('');
    const [title,setTitle] = useState('Setup')
    // const [message,setMessage] = useState('');
    const db = firebase.firestore()
    const authId = props.auth.uid

    // var Cryptr = require('cryptr')
    // var cryptr = new Cryptr('pixedit')

    // var encstring = cryptr.encrypt(link)


     const [loading,setLoading] = useState(false);

    const handleSubmit = (e) => {
         e.preventDefault();

         setLoading(true)
        

        db.collection('users').doc(authId)
        .collection('payment').doc(authId).set({
            authId: authId,
            url: link,
            setup: true
        })
        .then(() => {
            alert('link uploaded Successfully')
            setLoading(false)
            props.onClick()
            setTitle('Update')
        })
        .catch(error => {
            alert(error.message)
            setLoading(false)
        })


        setLink('')
        // setName('')
        // setEmail('')
        // setMessage('')
    }

    
    return (
        <div className="Paycontainer">
            <form className="PayForm" onSubmit={handleSubmit}>
                <h2>{title} Payment</h2>
                

                <div className="PayRow">
                 <div className="PayCol-25">
                    <label>Link</label>
                 </div>
                
                 <div className="PayCol-75">
                    <input type="text" placeholder="Link" 
                        defaultValue={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                 </div>
                
                </div>
                

                <button type="submit" 
                    style={{background: loading? "ccc": "#5d91f3" }}
                >Upload</button>
                <td onClick={()=> window.open("https://razorpay.com/docs/payment-pages/", "_blank")}>How to Setup a link</td>
            </form>
        </div>
        
    )
        

//     <div>
       

        
        
//                     <form class="" action="/paynow" method="post">
//                     <div class="form-group">
//                         <label for="">Name: </label>
//                         <input class="form-control" type="text" name="name" value=""/>
//                     </div>
//                     <div class="form-group">
//                         <label for="">Email: </label>
//                         <input class="form-control" type="text" name="email" value=""/>
//                     </div>
//                     <div class="form-group">
//                         <label for="">Phone: </label>
//                         <input class="form-control" type="text" name="phone" value=""/>
//                     </div>
//                         <div class="form-group">
//                         <label for="">Amount: </label>
//                         <input class="form-control" type="text" name="amount" value=""/>
//                     </div>
//                     <div class="form-group">
//                         <button class="btn form-control btn-primary">Pay Now</button>
//                     </div>
//                     </form>
//     </div>
             
    
//     )
// }
}

export default Setup


