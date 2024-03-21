// const { schema } = require("prosemirror-schema-basic")
// const { Node, DOMSerializer, DOMParser } = require("prosemirror-model")
// const jsdom = require("jsdom").JSDOM

import { getHTMLFromFragment } from "@tiptap/core";
import { DOMParser as ProseMirrorDOMParser } from "prosemirror-model";
import { schema } from 'prosemirror-schema-basic'


export const xmlParser = () => {
    const parser = new DOMParser();
    const content = parser.parseFromString(`<p>Hello this is sample <i>text</i></p>`, 'application/xml');
    
    const out = ProseMirrorDOMParser.fromSchema(schema).parse(content)
    const res = getHTMLFromFragment(out.content, schema);
    console.log(res);
}


