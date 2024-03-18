import { Content } from '@tiptap/core';
import { useRichTextEditorContext } from 'mui-tiptap'
import React from 'react'
import { WordCountKey, WordCountState } from 'epic-character-count';



const InsertContentButton = () => {

    const editor = useRichTextEditorContext();

    const content: Content = {
        "type": "text",
        "marks": [
            {
                'type': 'bold',
            },
        ],
        text: '‹Heading/›',
    };

    const wordCount: WordCountState = editor ? WordCountKey.getState(editor.state) : {};


    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
                onClick={() => {

                    if (editor) {
                        // console.log(editor.state.selection.from);
                        const pos = Math.abs(editor.state.selection.$anchor.parentOffset - editor.state.selection.$anchor.pos);
                        editor.chain().focus().insertContentAt(pos, content, {
                            updateSelection: true,
                            parseOptions: {
                                preserveWhitespace: 'full',
                            }
                        }).run();
                        // .insertContentAt(editor.state.selection.from, `<h6>${new Date()}</h6><p>This is a para</p>`);
                    }
                }}
            >Insert</button>
            <button
                onClick={() => {
                    if (editor) {
                        console.log(editor.getJSON());
                    }
                }}
            >JSON</button>
            <button
                onClick={() => {
                    if (editor) {
                        const data: { characters: number, words: number, sentences: number, } = WordCountKey.getState(editor.state);
                        console.log(data);
                    }
                }}
            >Get word count</button>
            <p>{wordCount?.word}</p>
            <p>{wordCount?.character}</p>
        </div >
    )
}

export default InsertContentButton