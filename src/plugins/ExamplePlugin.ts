import { Extension } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";
import { AddMarkStep } from "@tiptap/pm/transform";

export const ExamplePlugin = Extension.create({
    name: 'plugin',
    onTransaction(props) {
        const doc = props.transaction.doc;
        const tr = props.transaction;
        props.transaction.steps.forEach(step => {
            const boldMark = this.editor.state.schema.marks.bold.create();
            const invertedStep = step.invert(doc);
            tr.step(new AddMarkStep(10, 100, boldMark));
            tr.addMark
            this.editor.view.dispatch(tr);
        })
    },
    addProseMirrorPlugins() {
        const editor = this.editor;
        return [
            new Plugin({
                state: {
                    init(config, instance) {
                        return [];
                    },
                    apply(tr, value, oldState, newState) {
                        if (tr.docChanged) {
                            // console.log(tr, value);
                        }
                        return [];
                    },
                },
            })
        ]
    },
});