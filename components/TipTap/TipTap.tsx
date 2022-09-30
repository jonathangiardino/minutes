import { FC } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Heading } from "@tiptap/extension-heading";
import { BulletList } from "@tiptap/extension-bullet-list";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { Highlight } from "@tiptap/extension-highlight";
import { Mention } from "@tiptap/extension-mention";
import {
  BiStrikethrough,
  BiBold,
  BiItalic,
  BiHeading,
  BiListUl,
  BiListOl,
  BiTask,
  BiHighlight,
} from "react-icons/bi";
import clsx from "clsx";

const Tiptap: FC = () => {
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
          class: "px-[3px] py-[1px] rounded-sm !bg-[#ffc078]",
        },
      }),
    ],
    content:
      '<h1>Hello World!</h1><p><strong>Hello world</strong></p><p><em>Hello world</em></p><p><s>Hello world</s></p><ul ><li><p>Hello world</p></li></ul><ol ><li><p>Hello world</p></li></ol><ul data-type="taskList"><li data-checked="false"><label contenteditable="false"><input type="checkbox"><span></span></label><div><p>Hello world</p></div></li></ul><p><mark>Hello world</mark></p>',
    autofocus: true,
    editorProps: {
      attributes: {
        class: "p-4 m-4 focus:outline-none active:outline-none",
      },
    },
  });

  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ delay: 300, duration: 300 }}
          className="py-[2px] px-1 pb-0 shadow-lg bg-gray-50 rounded-md"
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
      <EditorContent editor={editor} className="w-full h-auto" />
    </>
  );
};

export default Tiptap;
