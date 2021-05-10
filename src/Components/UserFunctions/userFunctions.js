import {auth} from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useState } from 'react'

function GetUser(){

    const [user] = useAuthState(auth)
    return user

}

function GetUserName(){

    const userName = GetUser().displayName
    return userName

}

function GetUserImage(){

    const userImage = GetUser().photoURL
    return userImage

}

function CurUserId(){

    const userId = GetUser().uid
    return userId

}

export {CurUserId, GetUserName, GetUserImage}
