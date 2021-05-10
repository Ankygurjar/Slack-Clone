import React, {useState} from 'react'
import styled from 'styled-components'
import {Button} from '@material-ui/core'
import firebase from  'firebase'
import { db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { CurUserId, GetUserName, GetUserImage } from '../UserFunctions/userFunctions'
//import {auth} from '../../firebase'

function DirectMessageInput({msgReceverId, msgReceverName, chatRef}) {
    const [input, setInput] = useState('')
    const userId = CurUserId();
    const senderName = GetUserName();
    const senderImage = GetUserImage();

    const sendMessage = e =>{
        e.preventDefault()
        
        if( !msgReceverId){
            alert("Message cannot be empty!!")
            return false
        }

        db.collection("chats").add({
            senderId: userId,
            senderName: senderName,
            senderImage: senderImage,
            receverId: msgReceverId,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        chatRef.current.scrollIntoView({
            behavior: "smooth"
        })


        setInput('')

    }
    return (
        <ChatInputContainer>
            <form>
                <input 
                onChange={(e) => {setInput(e.target.value)}}
                value={input}  
                placeholder={`Message # ${msgReceverName}`}/>
                <Button  type='submit' onClick={sendMessage}>
                    Send 
                </Button>
            </form>
        </ChatInputContainer>
    )
}

export default DirectMessageInput

const ChatInputContainer = styled.div`
    border-radius: 20px;
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;

    > form {
        position: relative;
        display: flex;
        justify-content: center
    }

    >form > input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }

    > form > button {
        position:absolute;
    }
`