import { Extension } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";
import { AddMarkStep, ReplaceStep } from "@tiptap/pm/transform";

export const ExamplePlugin = Extension.create({
    name: 'plugin',
    onTransaction(props) {
        const doc = props.transaction.doc;
        const transaction = props.transaction;
        console.log(transaction.steps);
        const tr = this.editor.state.tr;
        // console.log(props.transaction);
        if (tr.getMeta('track') != true) {
            transaction.steps.forEach(step => {
                // const tr = this.editor.state.tr;
                console.log(step);
                if (step?.slice.size == 0) {
                    const invertedStep = step.invert(doc);
                    const delMark = this.editor.schema.marks.track.create({ type: 'del' });
                    tr.step(invertedStep);
                    tr.step(new AddMarkStep(step.from, step.to, delMark));
                    console.log('deletion', invertedStep);
                } else {
                    const insMark = this.editor.schema.marks.track.create({ type: 'ins' });
                    tr.step(new AddMarkStep(step.from, step.to + 1, insMark));
                }
                console.log(step);
                // const boldMark = this.editor.state.schema.marks.bold.create();
                // const invertedStep = step.invert(doc);
                // tr.step(new AddMarkStep(10, 100, boldMark));
                // tr.addMark
                // this.editor.view.dispatch(tr);
            })
            tr.setMeta('track', true);
            this.editor.view.dispatch(tr);
        }
    },
    // addProseMirrorPlugins() {
    //     const editor = this.editor;
    //     return [
    //         new Plugin({
    //             state: {
    //                 init(config, instance) {
    //                     return [];
    //                 },
    //                 apply(tr, value, oldState, newState) {
    //                     if (tr.docChanged) {
    //                         // console.log(tr, value);
    //                     }
    //                     return [];
    //                 },
    //             },
    //         })
    //     ]
    // },
});