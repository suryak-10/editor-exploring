import { Mark } from "@tiptap/core";

export const InsertMark = Mark.create({
    name: 'ins',
    parseHTML() {
        return [{
            tag: 'ins'
        }]
    },
    renderHTML(props) {
        return ['ins', props.HTMLAttributes, 0]
    },
});