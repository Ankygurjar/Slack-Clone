import React, { useState } from 'react'
import styled from 'styled-components'
//import {Button} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import {CurUserId} from './UserFunctions/userFunctions'
import {Redirect, Link} from 'react-router-dom'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { selectUser } from '../features/appSlice'
import { db } from '../firebase'

function Message({ userId, message, timestamp, user, userImage }) {

    const [showOptions, setShowOptions] = useState(false)
    const curUserId = CurUserId()
    const dispatch = useDispatch()

    const sameUser = () => {
        if(userId && curUserId){
            if(userId === curUserId){
                return true
            }else{
                return false
            }
        }
    }

    const msgUserId = () => {
        if(userId){
            return userId
        }else{
            return false
        }
    }

    const dispatchReceverId = (receverUserId) => {
        let privateRoom = db.collection("privateRooms").where("members", "in", [curUserId, receverUserId]).get()
        console.log(privateRoom)
    }

    return (
        <MessageContainer>
            <img alt="User Profile" src={userImage} />
            
            <MessageInfo onMouseLeave={() => setShowOptions(false)}>
              <h4>
                <strong 
                onMouseOver={() => setShowOptions(true)}
                >{user}</strong> 
                { showOptions && !sameUser() && msgUserId() &&(
                    <Link to="/directMessage" receverid={userId}>
                        <span onClick={(e) => {dispatchReceverId(userId)}}>Send Message</span>
                    </Link>
                )}
                <span>{ new Date(timestamp?.toDate()).toUTCString()} </span>  
              </h4>
              <p>
                  {message}
              </p>
            </MessageInfo>
        </MessageContainer>
    )
}

export default Message

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;

    > img {
        height: 50px;
        border-radius: 8px;
    }

`
const MessageInfo = styled.div `
    padding-left: 10px;

    > h4 > span{
        color: gray;
        font-weight: 300;
        margin-left: 4px;
        font-size: 10px;
    }

    > h4 > strong {
        cursor: pointer;
    }

    > h4 > a{
        padding: 7px;
        margin-left: 10px;
        border-radius: 10px;
        background-color: var(--slack-color);
        color:white;
        text-decoration: none;
    }

`

