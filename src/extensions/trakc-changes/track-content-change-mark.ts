import { Mark } from "@tiptap/core";

export const TRACK_CONTENT_CHANGES_MARK_NAME = `track-content`;
export const INSERT_CONTENT_MARK_TYPE_NAME = `insert`;
export const DELETE_CONTENT_MARK_TYPE_NAME = `delete`;

export const TrackContentChangesMark = Mark.create({
    name: TRACK_CONTENT_CHANGES_MARK_NAME,
    parseHTML() {
        return [
            {
                tag: this.name
            },
        ]
    },
    addAttributes() {
        return {
            type: {
                default: INSERT_CONTENT_MARK_TYPE_NAME,
            }
        };
    },
    renderHTML(props) {
        return [this.name, props.HTMLAttributes, 0];
    },
});
