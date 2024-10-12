import { Extension, Mark, } from "@tiptap/core"
import { AddMarkStep, RemoveMarkStep, ReplaceStep, Step } from "@tiptap/pm/transform";
import { Fragment, Slice } from "prosemirror-model";
import { MARK_ADDED_CONTENT_MARK_TYPE_NAME, MARK_REMOVED_CONTENT_MARK_TYPE_NAME, TRACK_MARK_CHANGES_MARK_NAME, TrackMarkChangesMark } from "./track-mark-changes-mark";
import { DELETE_CONTENT_MARK_TYPE_NAME, INSERT_CONTENT_MARK_TYPE_NAME, TRACK_CONTENT_CHANGES_MARK_NAME, TrackContentChangesMark } from "./track-content-change-mark";
import { Plugin } from "@tiptap/pm/state";

export const TRACK_CHANGES_EXTENSION_NAME = `trak-changes`;

export const TrackChangesExtension = Extension.create({
    name: TRACK_CHANGES_EXTENSION_NAME,

    addExtensions() {
        return [TrackContentChangesMark, TrackMarkChangesMark];
    },

    addStorage() {
        return {
            move: '',
        }
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    handleDOMEvents: {
                        keydown: (view, event) => {
                            if (event.key === 'Delete' || event.keyCode === 46 || event.which === 46) {
                                this.storage.move = 'forward';
                            }
                            if (event.key === 'Backspace' || event.keyCode === 8 || event.which === 8) {
                                this.storage.move = 'backward';
                            }
                        }
                    }
                }
            })
        ];
    },

    onTransaction({ transaction }) {
        // console.log(transaction);
        // console.log(transaction.docChanged);

        // const isInserted = (step: Step) => step
        // Slice
        const editor = this.editor;
        console.log(this.storage.move);

        if (!transaction.docChanged) return;
        if (transaction.getMeta(TRACK_CONTENT_CHANGES_MARK_NAME)) return;
        console.log(transaction.getMeta(TRACK_CONTENT_CHANGES_MARK_NAME));

        const tr = editor.state.tr;
        tr.setMeta(TRACK_CONTENT_CHANGES_MARK_NAME, true);



        transaction.steps.forEach((step, index) => {
            console.log(step);
            if (step instanceof ReplaceStep) {
                const { from, to } = step;
                // Insert step
                if (from == to) {
                    const addMark = editor.schema.marks[TRACK_CONTENT_CHANGES_MARK_NAME].create({ type: INSERT_CONTENT_MARK_TYPE_NAME });
                    tr.addMark(from, from + step.slice.size, addMark);
                    console.log(addMark);
                } else {
                    const invertedStep = step.invert(transaction.docs[index]);
                    invertedStep.slice.content.content.forEach(node => {
                        node.marks.push(editor.schema.marks["track-content"].create({ type: "delete" }))
                    })
                    tr.step(invertedStep);
                    console.log(invertedStep);
                    // const nodes = invertedStep.slice.content.content as Fragment[];
                    // const delMark = editor.schema.marks[TRACK_CONTENT_CHANGES_MARK_NAME];
                    // nodes.forEach(node => {
                    //     node.marks.push(delMark.create({ type: DELETE_CONTENT_MARK_TYPE_NAME }))
                    //     console.log(node);
                    // });
                }
            } else if (step instanceof AddMarkStep) {
                const { from, to, mark } = step;
                const slice = tr.doc.slice(from, to);
                // const oldMakr = slice.content.content[0].marks.find(mark => mark.type.name = TRACK_MARK_CHANGES_MARK_NAME);
                const addMark = editor.schema.marks[TRACK_MARK_CHANGES_MARK_NAME].create({ added: mark.type.name });
                tr.addMark(from, to, addMark);
                console.log('mark added');
            } else if (step instanceof RemoveMarkStep) {
                // const { from, to, mark } = step;
                // const addMark = editor.schema.marks[TRACK_MARK_CHANGES_MARK_NAME].create({ removed: mark.type.name });
                // tr.addMark(from, to, addMark);
                console.log('removed added');
            } else {
                alert("Not captured");
                console.log(step);
            }
        })

        editor.view.dispatch(tr);
    },

});