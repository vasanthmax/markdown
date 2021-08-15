import React,{useState} from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState,convertFromRaw,convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {Config,firebaseConfig} from '../config'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import firebase from "firebase";

const EditorPage = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
     }else {
        firebase.app(); // if already initialized, use that one
     }
     
    
    const [editorState,seteditorState] = useState(EditorState.createEmpty());
    const [content,setContent] = useState()
    const [converted,setConverted] = useState()
    const [author,setAuthor] = useState('')
    const [blogTitle,setBlogTitle] = useState('')
    const [blogPhoto,setBlogPhoto] = useState('')
    const onEditorStateChange = (e) => {
        console.log(e)
        seteditorState(e);
    }
    const onContentStateChange = (e) => {
        console.log(e)
        setContent(e)
    }
    const onSubmit = async () => {
        const con = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setConverted(con);
        const firestoreDetails = {
            authorName: author,
            blogTitle:blogTitle,
            blogPhoto:blogPhoto,
            html:con
            
        };
        const  db = firebase.firestore()
        const docRef = db.collection('blogs').doc()
        await docRef.set(firestoreDetails)
        console.log(firestoreDetails)
        console.log(Config.lol)
    }
    return (
        <div className="editior-section">
            <div className="blog-author">
                <label htmlFor="author">Author Name</label>
                <input type="text" value = {author} onChange = {(e) => setAuthor(e.target.value)}/>
            </div>
            <div className="blog-title">
                <label htmlFor="title">Blog Title</label>
                <input type="text" value = {blogTitle} onChange = {(e) => setBlogTitle(e.target.value)}/>
            </div>
            <div className="blog-photo">
                <label htmlFor="photo">Blog Photo Link</label>
                <input type="text" value = {blogPhoto} onChange = {(e) => setBlogPhoto(e.target.value)}/>
            </div>
            <Editor
  editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  onEditorStateChange={(e) => onEditorStateChange(e)}
  onContentStateChange = {(e) => onContentStateChange(e)}
/>
<button onClick = {() => onSubmit()}>Convert</button>
{`${converted}`}
        </div>
    );

}

export default EditorPage;