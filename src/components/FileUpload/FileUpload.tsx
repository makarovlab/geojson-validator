import React, { useRef } from "react"
import { FileDrop } from 'react-file-drop';
import Button from 'react-bootstrap/Button';

import { StyledDescription } from './style';

import './style.css';

interface IFileUpload {
    onUploadFile: (file: File | null) => void
}

const FileUpload = (props: IFileUpload) => {
    const { onUploadFile } = props;
    
    const inputEl = useRef<HTMLInputElement>(null);
    
    const onBrowseClick = () => {
        if(inputEl.current) {
            inputEl.current.click()
        }
    }

    const onDropFile = async (files: FileList | null, event: React.DragEvent<HTMLDivElement>) => {
        const file = files ? files[0] : null;
        onUploadFile(file);  
    }

    const onBrowseFile = async (evt: React.ChangeEvent<HTMLInputElement>) => {
        const file = evt.target.files ? evt.target.files[0] : null;
        onUploadFile(file);
    }

    return (
        <FileDrop
            className="editor-modal-file-drop"
            onDrop={onDropFile}
        >
            <input 
                type="file"  
                hidden 
                ref={inputEl}
                onChange={onBrowseFile}
            />
            
            <Button variant="primary" onClick={onBrowseClick}>Browse File</Button><br/>

            <StyledDescription>
                <ol>
                    <li>Drag and Drop or Browse file from computer.</li>
                    <li>Right now only GeoJSON format supported. And only Spider Platform attributes list.</li>
                </ol>
            </StyledDescription>
        </FileDrop>
    )
}

export default FileUpload;