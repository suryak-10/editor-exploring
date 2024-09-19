import { Node } from "@tiptap/core";

export const Page = Node.create({
    name: 'page',
    group: 'page+',
    content: 'block+',
    parseHTML() {
        return [
            {
                tag: 'page',
            }
        ]
    },
    renderHTML(props) {
        return [this.name, props.HTMLAttributes, 0];
    },
});