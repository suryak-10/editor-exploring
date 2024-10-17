import { useRichTextEditorContext } from "mui-tiptap"
import { CharacterCountPluginKey, CharacterCountPluginState } from "../extensions/character-count/CharacterCountExtension";

const ShowTextCount = () => {
    const editor = useRichTextEditorContext();
    let characterCount = 0;
    if (editor) {
        let state: CharacterCountPluginState = CharacterCountPluginKey.getState(editor.state);
        characterCount = state.characterCount;
    }
    return (
        <div>count - {characterCount}</div>
    )
}

export default ShowTextCount