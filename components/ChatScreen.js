import { Avatar, IconButton } from "@material-ui/core";
import styled from "styled-components";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useState } from "react";
import firebase from "firebase"
function ChatScreen({chat,messages}) {
  const [user]=useAuthState(auth)
  const[input,setInput]=useState("")
  const router=useRouter()
  const[messageSnapshot] =useCollection(db.collection("chats").doc(router.query.id)
  .collection("messages").orderBy("timestamp","asc")
  )
  const showMessages=()=>{
    if(messageSnapshot){
      return messageSnapshot.docs.map((message)=>(
        <Message
        key={message.id}
        user={message.data().user}
        message={{
          ...message.data(),
          timestamp:message.data().timestamp?.toDate().getTime(),
        }}
        />
      ))
    }else{
      return JSON.parse(messages).map(message=>(
        <Message
        key={message.id}
        user={message.user}
        message={message}/>
      ))
    }
  }
  const sendMessage=(e)=>{
e.preventDefault()
db.collection("users").doc(user.uid).set({
  lastseen:firebase.firestore.FieldValue.serverTimestamp()
},
{merge:true})
db.collection("chats").doc(router.query.id).collection("messages").add({
  timestamp:firebase.firestore.FieldValue.serverTimestamp(),
  message:input,
  user:user.email,
  photoURL:user.photoURL
})
setInput("")
  }
    return (
      <Container>
<Header>
  <Avatar/>
  <HeaderInformation>
    <h3>rec email</h3>
    <p>last seen...</p>
  </HeaderInformation>
  <HeaderIcons>
    <IconButton>
      <AttachFileIcon/>
    </IconButton>
    <IconButton>
      <MoreVertIcon/>
    </IconButton>
  </HeaderIcons>
</Header>
<MessageContainer>
  {showMessages()}
  <EndOfMessage/>
</MessageContainer>
<InputContainer>
<InsertEmoticonIcon/>
<Input value={input} onChange={e=>setInput(e.target.value)}/>
<button hidden type="submit" onClick={sendMessage} disabled={!input}>send</button>
<MicIcon />
</InputContainer>
      </Container>
    )
}

export default ChatScreen

const Container=styled.div``;
const InputContainer=styled.form`
display:flex;
align-items:center;
padding:10px;
position:sticky;
bottom:0;
background-color:white;
z-index:100;
`;
const Input=styled.input`
flex:1;
outline:0;
border:none;
border-radius:10px;
background-color:white-smoke;
padding:20px;
margin-left: 15px;
margin-right: 15px;
`;
const Header=styled.div`
position:sticky;
z-index:100;
top:0;
background-color:white;
display:flex;
padding:11px;
height: 80px;
align-items:center;
border-bottom: 1px solid whitesmoke;
`;
const HeaderInformation=styled.div`
margin-left: 15px;
flex:1;
>h3{
  margin-bottom:3px;
}
>p{
  font-size:14px;
  color:gray;
}
`;
const HeaderIcons=styled.div``;
const EndOfMessage=styled.div``;
const MessageContainer=styled.div`
padding:30px;
background-color:#e5ded8;
min-height:90vh;
`;