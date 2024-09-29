import { Extension, Mark } from "@tiptap/core"
import { ReplaceStep, Step } from "@tiptap/pm/transform";
import { Slice } from "prosemirror-model";

export const TRACK_CHANGES_EXTENSION_NAME = `trak-changes`;
export const INSERT_MARK_NAME = `insert`;
export const DELETE_MARK_NAME = `delete`;
export const TRACK_MARK_NAME = `track`;



const TrackMark = Mark.create({
    name: TRACK_MARK_NAME,
    parseHTML() {
        return [
            {
                tag: `[type=${INSERT_MARK_NAME}]`
            },
            {
                tag: `[type=${DELETE_MARK_NAME}]`
            },
        ]
    },
    addAttributes() {
        return {
            type: {
                default: INSERT_MARK_NAME,
            }
        };
    },
    renderHTML(props) {
        return ['track', props.HTMLAttributes, 0];
    },
})


export const TrackChangesExtension = Extension.create({
    name: TRACK_CHANGES_EXTENSION_NAME,

    addExtensions() {
        return [TrackMark];
    },

    onTransaction({ transaction }) {
        // console.log(transaction);
        // console.log(transaction.docChanged);

        // const isInserted = (step: Step) => step
        // Slice

        transaction.steps.forEach(step => {
            if (step instanceof ReplaceStep) {
                console.log(step);
            }
        })
    },

});