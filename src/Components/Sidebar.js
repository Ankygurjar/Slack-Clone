import React from 'react'
import styled from "styled-components"
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create'
import SidebarOption from './SidebarOption'
import InsertCommentIcon from "@material-ui/icons/InsertComment"
import InboxIcon from "@material-ui/icons/Inbox"
import DraftsIcon from "@material-ui/icons/Drafts"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import SettingsInputAntennaOutlinedIcon from '@material-ui/icons/SettingsInputAntennaOutlined';
import AddIcon from "@material-ui/icons/Add"
import { useCollection } from 'react-firebase-hooks/firestore'
import { db, auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function Sidebar() {

    const [channels] = useCollection(db.collection("rooms"))
    const [user] = useAuthState(auth)

    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarInfo>
                    <h2>{user.displayName}</h2>
                    <h3>
                        <FiberManualRecordIcon/>
                    </h3>
                </SidebarInfo>
                <CreateIcon />
            </SidebarHeader>

            <SidebarOption Icon={InsertCommentIcon} title="Threads      !Comming Soon"/>
            <SidebarOption Icon={InboxIcon} title="Mention & reactions    !Comming Soon"/>
            <SidebarOption Icon={DraftsIcon} title="Saved Items  !Comming Soon"/>
            <SidebarOption Icon={FileCopyIcon} title="File Browser  !Comming Soon"/>

            <hr/>
            <SidebarOption Icon={SettingsInputAntennaOutlinedIcon} title="Channels"/>
            <hr/>
            <SidebarOption Icon={AddIcon} title="Add Channel" addChannelOption/>

            {channels?.docs.map((doc) => {
                return(
                <SidebarOption 
                key={doc.id} 
                id={doc.id}  
                title={doc.data().name}
                />
                )
            })}

        </SidebarContainer>
    )
}

export default Sidebar;

const SidebarContainer = styled.div`

    color: white;
    flex:0.3;
    border-top: 1px solid #49274b;
    max-width: 260px;
    margin-top: 60px;
    background-color: var(--slack-color);

    > hr{
        margin: 10px 0px 10px 0px;
        border: 1px solid #49274b;
    }

`;

const SidebarHeader = styled.div`

    display: flex;
    border-bottom: 1px solid #49274b;
    padding: 13px;

    > .MuiSvgIcon-root{
        padding: 8px;
        color: #49274b;
        font-size: 18px;
        background-color: white;
        border-radius: 999px;
    }

`

const SidebarInfo = styled.div`

    flex: 1;

    > h2{

        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;

    }

    > h3{

        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;

    }

    > h3 > .MuiSvgIcon-root{

        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;

    }

`