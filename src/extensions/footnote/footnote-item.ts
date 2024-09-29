import { Node } from "@tiptap/core";
import ListItem from "@tiptap/extension-list-item";
import { EditorState } from "@tiptap/pm/state";

export const FOOTNOTE_ITEM_NAME = 'footnoteItem';

export const FootnoteItem = ListItem.extend({
    name: FOOTNOTE_ITEM_NAME,
    group: 'block',
    content: 'paragraph+',
    isolating: true,
    defining: true,
    draggable: false,

    parseHTML() {
        return [
            {
                tag: 'li',
                priority: 1000,
            }
        ];
    },

    addAttributes() {
        EditorState
        return {
            id: {
                isRequired: true,
            },
            'data-id': {
                isRequired: true,
            }
        }
    },

});