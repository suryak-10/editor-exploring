import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import {
  LinkBubbleMenu,
  MenuButton,
  RichTextEditor,
  RichTextReadOnly,
  TableBubbleMenu,
  type RichTextEditorRef,
} from "mui-tiptap";
import EditorMenuControls from "./EditorMenuControls";
import useExtensions from "./useExtensions";

const exampleContent = `
<h2 style="text-align: center">Hey there 👋</h2>

<reference><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id inventore obcaecati, necessitatibus fugit incidunt itaque iste quas quasi odio rem, consequatur recusandae libero a nulla ipsam ut earum accusantium eos!</p></reference>

<p>
  <sup id="fnref:1" contenteditable="false" draggable="true"><a class="footnote-ref"
              data-id="0dd65b46-c6d1-492b-a532-396628f035c9" href="#fn:1" data-reference-number="1">1</a></sup><sup
          id="fnref:2" contenteditable="false" draggable="true"><a class="footnote-ref"
              data-id="96fea0b4-7a74-47f9-9ee7-aad9979b44f0" href="#fn:2" data-reference-number="2">2</a></sup>
</p>



<p>This is a
    <em>basic</em> example of
    <code>mui-tiptap</code>, which combines
    <a target="_blank"
        rel="noopener noreferrer nofollow" href="https://tiptap.dev/">Tiptap</a> with customizable
    <a target="_blank"
        rel="noopener noreferrer nofollow" href="https://mui.com/">MUI (Material-UI)</a> styles, plus a suite of
    additional components and extensions! Sure, there are
    <strong>all
        <em>kinds</em> of
        <s>text</s>
        <u>formatting</u>
        options
    </strong> you’d probably expect from a rich text editor. But wait until you see the lists:
</p>
<ul>
    <li>
        <p>That’s a bullet list with one …</p>
    </li>
    <li>
        <p>… or two list items.</p>
    </li>
</ul>
<p>Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:</p>
<pre>
    <code class="language-css">body {\n  display: none;\n}</code>
</pre>
<p></p>
<p>That’s only the tip of the iceberg. Feel free to add and resize images:</p>
<img height="auto"
    src="http://placekitten.com/g/500" alt="wat" width="257" style="aspect-ratio: 1 / 1">
    <p></p>
    <p>Organize information in tables:</p>
    <table>
        <tbody>
            <tr>
                <th colspan="1" rowspan="1">
                    <p>Name</p>
                </th>
                <th colspan="1" rowspan="1">
                    <p>Role</p>
                </th>
                <th colspan="1" rowspan="1">
                    <p>Team</p>
                </th>
            </tr>
            <tr>
                <td colspan="1" rowspan="1">
                    <p>Alice</p>
                </td>
                <td colspan="1" rowspan="1">
                    <p>PM</p>
                </td>
                <td colspan="1" rowspan="1">
                    <p>Internal tools</p>
                </td>
            </tr>
            <tr>
                <td colspan="1" rowspan="1">
                    <p>Bob</p>
                </td>
                <td colspan="1" rowspan="1">
                    <p>Software</p>
                </td>
                <td colspan="1" rowspan="1">
                    <p>Infrastructure</p>
                </td>
            </tr>
        </tbody>
    </table>
    <p></p>
    <p>Or write down your groceries:</p>
    <ul data-type="taskList">
        <li data-checked="true" data-type="taskItem">
            <label>
                <input type="checkbox" checked="checked">
                    <span></span>
                </label>
                <div>
                    <p>Milk</p>
                </div>
            </li>
            <li data-checked="false" data-type="taskItem">
                <label>
                    <input type="checkbox">
                        <span></span>
                    </label>
                    <div>
                        <p>Eggs</p>
                    </div>
                </li>
                <li data-checked="false" data-type="taskItem">
                    <label>
                        <input type="checkbox">
                            <span></span>
                        </label>
                        <div>
                            <p>Sriracha</p>
                        </div>
                    </li>
                </ul>
                <blockquote>
                    <p>Wow, that’s amazing. Good work! 👏
                        <br>— Mom
                        </p>
                    </blockquote>
                    <p>Give it a try and click around!</p>

                    <ol class="footnote-list">
                    <p>P tag is here</p>
                    </ol>
`;

export default function Editor() {
  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });
  const rteRef = useRef<RichTextEditorRef>(null);
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);

  const [submittedContent, setSubmittedContent] = useState("");

  return (
    <>
      <Box
        sx={{
          // An example of how editor styles can be overridden. In this case,
          // setting where the scroll anchors to when jumping to headings. The
          // scroll margin isn't built in since it will likely vary depending on
          // where the editor itself is rendered (e.g. if there's a sticky nav
          // bar on your site).
          "& .ProseMirror": {
            "& h1, & h2, & h3, & h4, & h5, & h6": {
              scrollMarginTop: showMenuBar ? 50 : 0,
            },
          },
        }}
      >
        <RichTextEditor
          ref={rteRef}
          extensions={extensions}
          content={exampleContent}
          editable={isEditable}
          renderControls={() => <EditorMenuControls />}
          onCreate={({ editor }) => {
            // window.editor = editor;
          }}
          RichTextFieldProps={{
            MenuBarProps: {
              hide: !showMenuBar,
            },
            // Below is an example of adding a toggle within the outlined field
            // for showing/hiding the editor menu bar, and a "submit" button for
            // saving/viewing the HTML content
            footer: (
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  borderTopStyle: "solid",
                  borderTopWidth: 1,
                  borderTopColor: (theme) => theme.palette.divider,
                  py: 1,
                  px: 1.5,
                }}
              >
                <MenuButton
                  value="formatting"
                  tooltipLabel={
                    showMenuBar ? "Hide formatting" : "Show formatting"
                  }
                  size="small"
                  onClick={() =>
                    setShowMenuBar((currentState) => !currentState)
                  }
                  selected={showMenuBar}
                  IconComponent={TextFields}
                />

                <MenuButton
                  value="formatting"
                  tooltipLabel={
                    isEditable
                      ? "Prevent edits (use read-only mode)"
                      : "Allow edits"
                  }
                  size="small"
                  onClick={() => setIsEditable((currentState) => !currentState)}
                  selected={!isEditable}
                  IconComponent={isEditable ? Lock : LockOpen}
                />

                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    setSubmittedContent(
                      rteRef.current?.editor?.getHTML() ?? ""
                    );
                  }}
                >
                  Save
                </Button>
              </Stack>
            ),
          }}
        >
          {() => (
            <>
              <LinkBubbleMenu />
              <TableBubbleMenu />
            </>
          )}
        </RichTextEditor>
      </Box>

      <Typography variant="h5" sx={{ mt: 5 }}>
        Saved result:
      </Typography>

      {submittedContent ? (
        <>
          <pre style={{ marginTop: 10, overflow: "auto", maxWidth: "100%" }}>
            <code>{submittedContent}</code>
          </pre>

          <Box mt={3}>
            <Typography variant="overline" sx={{ mb: 2 }}>
              Read-only saved snapshot:
            </Typography>

            <RichTextReadOnly
              content={submittedContent}
              extensions={extensions}
            />
          </Box>
        </>
      ) : (
        <>
          Press “Save” above to show the HTML markup for the editor content.
          Typically you’d use a similar <code>editor.getHTML()</code> approach
          to save your data in a form.
        </>
      )}
    </>
  );
}
