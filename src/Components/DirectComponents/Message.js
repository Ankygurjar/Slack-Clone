import React from 'react'
import styled from 'styled-components'
import { CurUserId } from '../UserFunctions/userFunctions'

function Message({ senderId, senderName, senderImage, message, timestamp}) {

    const userId = CurUserId();

    const sameName = () => {
        if(userId === senderId){
            return <><span>Me</span></>
        }
        return senderName
    }

    return (
        <MessageContainer>
        <img alt="User Profile" src={senderImage} />
        
        <MessageInfo>
          <h4>
            <strong>{
                sameName()
                }
                
            </strong> 
            <span>{ new Date(timestamp?.toDate()).toUTCString()} </span>  
          </h4>
          <p>
              {message}
          </p>
        </MessageInfo>
    </MessageContainer>
    )
}

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


export default Message
