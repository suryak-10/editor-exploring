import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state'
import React from 'react'

export const CharacterCountPluginKey = new PluginKey('character-cout');

export type CharacterCountPluginState = { characterCount: number };

const CharacterCountPlugin = new Plugin<CharacterCountPluginState>({
    key: CharacterCountPluginKey,
    state: {
        init(config, instance) {
            return { characterCount: 0 }
        },
        apply(tr, value, oldState, newState) {
            return { characterCount: newState.doc.textContent.length }
        },
    },
});

const CharacterCountExtension = Extension.create({
    name: 'character-cout',
    addProseMirrorPlugins() {
        return [CharacterCountPlugin]
    },
});



export default CharacterCountExtension