import { Mark, mergeAttributes } from "@tiptap/core";

export const TrackMark = Mark.create({
    name: 'track',
    parseHTML() {
        return [{
            tag: 'track'
        }]
    },
    addAttributes() {
        return {
            'type': {
                default: 'ins',
                parseHTML(element) {
                    return element.getAttribute('type') || "ins";
                },
            }
        }
    },
    renderHTML(props) {
        return ['track', mergeAttributes(this.options.HTMLAttributes, props.HTMLAttributes), 0]
    },
});