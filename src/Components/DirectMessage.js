import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'
import { selectUserId, selectUserImage, selectUserName } from '../features/appSlice'
import DirectMessageInput from './DirectComponents/DirectMessageInput'
import { db } from '../firebase'
import { CurUserId } from './UserFunctions/userFunctions'
import Message from './DirectComponents/Message'


function DirectMessage({}) {

    const chatRef = useRef(null)
    //const msgReceverId = useSelector(selectUserId)
    //const msgReceverName = useSelector(selectUserName)
    //const msgReceverImage = useSelector(selectUserImage)
    const userId = CurUserId();

    const [chatMessages, loading] = useCollection(
        db.collection("chats")
        .where("senderId", "==", userId)
    )

    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: "smooth"
        })
    }, [])
    return (

        <DirectMessageContainer>
            { loading && (
                <>
                    <h2>loading . . . .</h2>
                </>
            )}
            { !loading &&(
            <>
            <Header>
            <HeaderLeft>
                <h4>
                    <strong># </strong>
                </h4>
            </HeaderLeft>
        </Header>

        <ChatMessages>
                    {chatMessages?.docs.map(doc => {
                        const { senderId, senderName, senderImage, message, timestamp} = doc.data()
                        return(
                            <Message
                            key={doc.id}
                            senderId={senderId}
                            senderImage={senderImage}
                            message={message}
                            timestamp={timestamp}
                            />
                        )
                    })}
                    <ChatBottom ref={chatRef} />
         </ChatMessages>

            <DirectMessageInput 
            chatRef={chatRef}
            />
            </>
            )}
        </DirectMessageContainer>
    )
}

export default DirectMessage

const ChatMessages = styled.div``

const ChatBottom = styled.div`
    padding-bottom: 200px;
`

const DirectMessageContainer = styled.div `
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
`

const ChatInputContainer = styled.div`
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
        display: none !important;
    }

`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    
    > h4 {
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }

    > h4 > .MuiSvgIcon-root {
        margin-left: 10px;
        font-size: 18px;
    }
`
