import { Button } from '@mui/material'
import { AddMarkStep } from '@tiptap/pm/transform';
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
                    const addBoldStep = new AddMarkStep(from, to, boldMark);
                    tr.step(addBoldStep);
                    // tr.addMark(from, to, boldMark);
                    editor.view.dispatch(tr);
                    const invertedStep = addBoldStep.invert();
                    setTimeout(() => {
                        const tr = editor.state.tr;
                        const insMark = editor.schema.marks.ins.create();
                        const addInsStep = new AddMarkStep(from, to, insMark);
                        tr.step(addInsStep);
                        editor.view.dispatch(tr);
                    }, 100);
                    console.log(editor);
                }
            }}
        >Replace step</Button>
    )
}

export default ReplaceStepButton