import { Button } from '@mui/material'
import { useRichTextEditorContext } from 'mui-tiptap'
import React from 'react'

const ReplaceStepButton = () => {
    const editor = useRichTextEditorContext();
    return (
        <Button
            onClick={() => {
                if (editor) {
                    const { from, to } = editor.state.selection;
                    const boldMark = editor.schema.marks.bold.create();
                    const tr = editor.state.tr;
                    tr.addMark(from, to, boldMark);
                    editor.view.dispatch(tr);
                    console.log(editor);
                }
            }}
        >Replace step</Button>
    )
}

export default ReplaceStepButton