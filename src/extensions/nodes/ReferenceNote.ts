import { Node } from "@tiptap/core";

export const ReferenceNode = Node.create({
    name: 'reference',
    group: 'block',
    content: '(paragraph | blockquote)+',


    parseHTML() {
        return [
            {
                tag: 'reference',
            }
        ]
    },

    renderHTML(props) {
        console.log(this.name);
        return [this.name, props.HTMLAttributes, 0];
    },

});