import { Extension, Mark, } from "@tiptap/core"
import { AddMarkStep, RemoveMarkStep, ReplaceStep, Step } from "@tiptap/pm/transform";
import { Fragment, Slice } from "prosemirror-model";
import { MARK_ADDED_CONTENT_MARK_TYPE_NAME, MARK_REMOVED_CONTENT_MARK_TYPE_NAME, TRACK_MARK_CHANGES_MARK_NAME, TrackMarkChangesMark } from "./track-mark-changes-mark";
import { INSERT_CONTENT_MARK_TYPE_NAME, TRACK_CONTENT_CHANGES_MARK_NAME, TrackContentChangesMark } from "./track-content-change-mark";

export const TRACK_CHANGES_EXTENSION_NAME = `trak-changes`;

export const TrackChangesExtension = Extension.create({
    name: TRACK_CHANGES_EXTENSION_NAME,

    addExtensions() {
        return [TrackContentChangesMark, TrackMarkChangesMark];
    },

    onTransaction({ transaction }) {
        // console.log(transaction);
        // console.log(transaction.docChanged);

        // const isInserted = (step: Step) => step
        // Slice
        const editor = this.editor;

        if (transaction.getMeta(TRACK_CONTENT_CHANGES_MARK_NAME)) return;
        console.log(transaction.getMeta(TRACK_CONTENT_CHANGES_MARK_NAME));

        const tr = editor.state.tr;
        tr.setMeta(TRACK_CONTENT_CHANGES_MARK_NAME, true);



        transaction.steps.forEach(step => {
            console.log(step);
            if (step instanceof ReplaceStep) {
                const { from, to } = step;
                // Insert step
                if (from == to) {
                    const addMark = editor.schema.marks[TRACK_CONTENT_CHANGES_MARK_NAME].create({ type: INSERT_CONTENT_MARK_TYPE_NAME });
                    tr.addMark(from, from + step.slice.size, addMark);
                    console.log(addMark);
                } else {
                    const invertedStep = step.invert(editor.state.doc);
                    const nodes = invertedStep.slice.content.content as Fragment[];
                    nodes.forEach(node => {
                        console.log(node);
                    });
                }
            } else if (step instanceof AddMarkStep) {
                const { from, to, mark } = step;
                const addMark = editor.schema.marks[TRACK_MARK_CHANGES_MARK_NAME].create({ type: MARK_ADDED_CONTENT_MARK_TYPE_NAME, marks: mark.type.name });
                tr.addMark(from, to, addMark);
                console.log('mark added');
            } else if (step instanceof RemoveMarkStep) {
                const { from, to, mark } = step;
                const addMark = editor.schema.marks[TRACK_MARK_CHANGES_MARK_NAME].create({ type: MARK_REMOVED_CONTENT_MARK_TYPE_NAME, marks: mark.type.name });
                tr.addMark(from, to, addMark);
                console.log('removed added');
            }
        })

        editor.view.dispatch(tr);
    },

});