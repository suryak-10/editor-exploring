import { MenuButton, useRichTextEditorContext } from 'mui-tiptap'
import React from 'react'
import FolderIcon from '@mui/icons-material/Folder';


export const CommandButton1 = () => {

    const editor = useRichTextEditorContext();

    return (
        <MenuButton
            tooltipLabel='1'
            IconComponent={FolderIcon}
            onClick={() => {
                const content = `<i> Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae mollitia magni ut. Explicabo officia ipsam iste veniam quasi perferendis praesentium. Fugit nostrum deserunt impedit culpa sed consequatur rerum, minima a. </i>`;
                let result = editor?.commands.unsetMark('bold');
                console.log(result);
            }}
        />
    )
}

export const CommandButton2 = () => {

    const editor = useRichTextEditorContext();

    return (
        <MenuButton
            tooltipLabel='2'
            IconComponent={FolderIcon}
            onClick={() => {
                editor?.commands.blur();
            }}
        />
    )
}
