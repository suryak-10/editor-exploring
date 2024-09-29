import { Extension, Mark } from "@tiptap/core"


const TrackMark = ({ name, tag }: { name: string, tag: string }) => {
    return Mark.create({
        name,
        parseHTML() {
            return [{
                tag,
            }]
        },
        renderHTML(props) {
            return [tag, props.HTMLAttributes, 0];
        },
    });
}



export const TRACK_CHANGES_EXTENSION_NAME = `trak-changes`;
export const INSERT_MARK_NAME = `insert`;
export const DELETE_MARK_NAME = `delete`;

export const TrackChangesExtension = Extension.create({
    name: TRACK_CHANGES_EXTENSION_NAME,
    addExtensions() {
        const InserMark = TrackMark({ name: INSERT_MARK_NAME, tag: 'ins' });
        const DeleteMark = TrackMark({ name: DELETE_MARK_NAME, tag: 'del' });
        return [InserMark, DeleteMark];
    },
});