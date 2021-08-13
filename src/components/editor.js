import React,{useState} from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState,convertFromRaw,convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const EditorPage = () => {
    const [editorState,seteditorState] = useState(EditorState.createEmpty());
    const [content,setContent] = useState()
    const [converted,setConverted] = useState()
    const onEditorStateChange = (e) => {
        console.log(e)
        seteditorState(e);
    }
    const onContentStateChange = (e) => {
        console.log(e)
        setContent(e)
    }
    const onSubmit = () => {
        const con = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setConverted(con)
    }
    return (
        <div className="editior-section">
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