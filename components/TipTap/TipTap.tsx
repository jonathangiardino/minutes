import { FC, ReactNode, useState } from "react";
import clsx from "clsx";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import { useHotkeys } from "react-hotkeys-hook";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Heading } from "@tiptap/extension-heading";
import { BulletList } from "@tiptap/extension-bullet-list";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { Highlight } from "@tiptap/extension-highlight";
import { Underline } from "@tiptap/extension-underline";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { Mention } from "@tiptap/extension-mention";
import { lowlight } from "lowlight/lib/core";
import {
  BiStrikethrough,
  BiBold,
  BiItalic,
  BiHeading,
  BiListUl,
  BiListOl,
  BiTask,
  BiHighlight,
  BiUnderline,
} from "react-icons/bi";
import { GrBlockQuote } from "react-icons/gr";
import FloatingMenu from "../FloatingMenu";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

export interface FormattingBlock {
  id: number;
  name: string;
  description: string;
  url: string;
  color: string;
  icon: ReactNode | string;
}

const Tiptap: FC = () => {
  const [openFloatingMenu, setOpenFloatingMenu] = useState<boolean>(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskList.configure({
        HTMLAttributes: {
          class: "rounded border border-gray-100",
        },
      }),
      TaskItem,
      Placeholder.configure({
        placeholder: "What's on your mind?",
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "text-4xl font-bold",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "text-inherit list-disc list-outside",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "text-inherit list-decimal list-outside",
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "px-[6px] py-[2px] rounded-md !bg-[#ffc078]",
        },
      }),
      Underline,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    autofocus: "end",
    content:
      '<p class=""><strong>Todos</strong></p><ul data-type="taskList"><li><label><input type="checkbox"><span></span></label><div><p>Bigger floating formatter</p></div></li><li><label><input type="checkbox"><span></span></label><div><p>Save to database</p></div></li><li><label><input type="checkbox"><span></span></label><div><p>Go-to-date functionality</p></div></li><li><label><input type="checkbox"><span></span></label><div><p>Auth</p></div></li><li><label><input type="checkbox"><span></span></label><div><p>Dark mode</p></div></li><li><label><input type="checkbox"><span></span></label><div><p>Export as HTML/Markdown on select</p></div></li></ul><p><strong>Roadmap</strong></p><ul data-type="taskList"><li><label><input type="checkbox"><span></span></label><div><p>Tabs/pages for the day</p></div></li><li><label><input type="checkbox"><span></span></label><div><p>Adjust and change fonts</p></div></li><li><label><input type="checkbox"><span></span></label><div><p>CMD K full-text search</p></div></li><li ><label ><input type="checkbox"><span></span></label><div><p>Tomorrow section with tag</p></div></li><li><label><input type="checkbox"><span></span></label><div><p>Add tags for easily search things from the past</p></div></li><li><label><input type="checkbox"><span></span></label><div><p>Mobile app</p></div></li></ul>',
    editorProps: {
      attributes: {
        class: "p-4 focus:outline-none active:outline-none",
      },
    },
  });

  // DETECT KEYBOARD ON MOBILE
  const isKeyboardOpen = useDetectKeyboardOpen();

  // HOTKEYS
  useHotkeys(
    "command+/, ctrl+/",
    () => {
      setOpenFloatingMenu(!openFloatingMenu);
    },
    {
      enableOnContentEditable: true,
      enableOnTags: ["INPUT", "TEXTAREA", "SELECT"],
    },
    [openFloatingMenu]
  );

  const InsertNode = (block: FormattingBlock) => {
    editor?.commands.enter();
    switch (block.name) {
      case "Paragraph":
        editor?.commands.enter();
        editor?.commands.insertContent({
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "",
            },
          ],
        });
        editor?.commands.focus();
        editor?.commands.scrollIntoView();
        break;

      case "Heading":
        editor?.commands.enter();
        editor?.commands.toggleHeading({ level: 1 });
        editor?.commands.focus();
        editor?.commands.scrollIntoView();
        break;

      case "Bullet List":
        editor?.commands.enter();
        editor?.commands.toggleBulletList();
        editor?.commands.focus();
        editor?.commands.scrollIntoView();
        break;

      case "Numbered List":
        editor?.commands.enter();
        editor?.commands.toggleOrderedList();
        editor?.commands.focus();
        editor?.commands.scrollIntoView();
        break;

      case "Blockquote":
        editor?.commands.enter();
        editor?.commands.toggleBlockquote();
        editor?.commands.focus();
        editor?.commands.scrollIntoView();
        break;

      case "Task":
        editor?.commands.enter();
        editor?.commands.toggleTaskList();
        editor?.commands.focus();
        editor?.commands.scrollIntoView();
        break;

      case "Code Block":
        editor?.commands.enter();
        editor?.commands.setCodeBlock();
        editor?.commands.focus();
        editor?.commands.scrollIntoView();
        break;

      default:
        break;
    }
  };

  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ delay: 300, duration: 300 }}
          className="pt-[5px] px-1 pb-0 shadow-xl bg-[#28282c] text-white rounded-md"
        >
          <button
            title="Heading"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: 1 })
                .setTextSelection(editor.state.tr.selection.$anchor.pos + 1)
                .insertContent("")
                .run()
            }
            className={clsx(
              editor.isActive("heading", { level: 1 })
                ? "text-brand font-bold"
                : "",
              "mx-1"
            )}
          >
            <BiHeading />
          </button>
          <button
            title="Bold"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBold()
                .setTextSelection(editor.state.tr.selection.$anchor.pos + 1)
                .toggleBold()
                .insertContent("")
                .run()
            }
            className={clsx(
              editor.isActive("bold") ? "text-brand font-bold" : "",
              "mx-1"
            )}
          >
            <BiBold />
          </button>
          <button
            title="Italic"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleItalic()
                .setTextSelection(editor.state.tr.selection.$anchor.pos + 1)
                .toggleItalic()
                .insertContent("")
                .run()
            }
            className={clsx(
              editor.isActive("italic") ? "text-brand font-bold" : "",
              "mx-1"
            )}
          >
            <BiItalic />
          </button>
          <button
            title="Underline"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleUnderline()
                .setTextSelection(editor.state.tr.selection.$anchor.pos + 1)
                .toggleUnderline()
                .insertContent("")
                .run()
            }
            className={clsx(
              editor.isActive("underline") ? "text-brand font-bold" : "",
              "mx-1"
            )}
          >
            <BiUnderline />
          </button>
          <button
            title="Strike-through"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleStrike()
                .setTextSelection(editor.state.tr.selection.$anchor.pos + 1)
                .toggleStrike()
                .insertContent("")
                .run()
            }
            className={clsx(
              editor.isActive("strike") ? "text-brand font-bold" : "",
              "mx-1"
            )}
          >
            <BiStrikethrough />
          </button>
          <button
            title="Bullet list"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBulletList()
                .setTextSelection(editor.state.tr.selection.$anchor.pos + 1)
                .insertContent("")
                .run()
            }
            className={clsx(
              editor.isActive("bulletList") ? "text-brand font-bold" : "",
              "mx-1"
            )}
          >
            <BiListUl />
          </button>
          <button
            title="Ordered List"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleOrderedList()
                .setTextSelection(editor.state.tr.selection.$anchor.pos + 1)
                .insertContent("")
                .run()
            }
            className={clsx(
              editor.isActive("orderedList") ? "text-brand font-bold" : "",
              "mx-1"
            )}
          >
            <BiListOl />
          </button>
          <button
            title="Blockquote"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBlockquote()
                .setTextSelection(editor.state.tr.selection.$anchor.pos + 1)
                .insertContent("")
                .run()
            }
            className={clsx(
              editor.isActive("orderedList") ? "text-brand font-bold" : "",
              "mx-1"
            )}
          >
            <GrBlockQuote />
          </button>
          <button
            title="To do"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleTaskList()
                .setTextSelection(editor.state.tr.selection.$anchor.pos + 1)
                .insertContent("")
                .run()
            }
            className={clsx(
              editor.isActive("taskList") ? "text-brand font-bold" : "",
              "mx-1"
            )}
          >
            <BiTask />
          </button>
          <button
            title="Highlight"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHighlight()
                .setTextSelection(editor.state.tr.selection.$anchor.pos + 1)
                .toggleHighlight()
                .insertContent("")
                .run()
            }
            className={clsx(
              editor.isActive("highlight") ? "text-brand font-bold" : "",
              "mx-1"
            )}
          >
            <BiHighlight />
          </button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} className="w-full h-auto mt-6 md:mt-16" />
      {!isKeyboardOpen && (
        <FloatingMenu
          open={openFloatingMenu}
          setOpen={setOpenFloatingMenu}
          InsertNode={InsertNode}
        />
      )}
    </>
  );
};

export default Tiptap;
