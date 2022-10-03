import { FC, ReactNode, useEffect, useState } from "react";
import clsx from "clsx";
import useLocalStorageState from "use-local-storage-state";
import {
  useEditor,
  EditorContent,
  BubbleMenu
} from "@tiptap/react";
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
// import { Mention } from "@tiptap/extension-mention";
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
import { initialContent } from "./initialContent";

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

const Tiptap: FC<{ selectedDate: string }> = ({ selectedDate }) => {
  const [data, setData] = useLocalStorageState<any[]>("minutes-data", {
    defaultValue: [],
  });

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
        levels: [1, 2],
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
    content: "",
    autofocus: true,
    editorProps: {
      scrollMargin: {
        bottom: 100,
        top: 0,
        left: 0,
        right: 0,
      },
      attributes: {
        class: "p-4 focus:outline-none active:outline-none",
      },
    },
  });

  editor?.on("update", ({ editor: updatedEditor }) => {
    const dataInView = data?.find((note) => note.date === selectedDate);
    let dataClone = [...data];
    let dataInViewIndex = data?.findIndex((note) => note.date === selectedDate);

    if (data.length && !dataInView) {
      setData([
        {
          date: selectedDate,
          json: JSON.parse(JSON.stringify(updatedEditor.getJSON())),
        },
        ...data,
      ]);
    }

    if (dataInView) {
      dataClone[dataInViewIndex] = {
        ...dataInView,
        json: JSON.parse(JSON.stringify(updatedEditor.getJSON())),
      };
      setData([...dataClone]);
    }
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
    switch (block.name) {
      case "Paragraph":
        editor?.commands.insertContent({
          type: "paragraph",
          content: [],
        });
        editor?.commands.focus();
        editor?.commands.scrollIntoView();
        break;

      case "Heading 1":
        editor?.commands.toggleHeading({ level: 1 });
        editor?.commands.focus();
        editor?.commands.scrollIntoView();
        break;

      case "Heading 2":
        editor?.commands.toggleHeading({ level: 2 });
        editor?.commands.focus();
        editor?.commands.scrollIntoView();
        break;

      case "Bullet List":
        editor?.commands.toggleBulletList();
        editor?.commands.focus();
        editor?.commands.scrollIntoView();
        break;

      case "Numbered List":
        editor?.commands.toggleOrderedList();
        editor?.commands.focus();
        editor?.commands.scrollIntoView();
        break;

      case "Blockquote":
        editor?.commands.toggleBlockquote();
        editor?.commands.focus();
        editor?.commands.scrollIntoView();
        break;

      case "Task":
        editor?.commands.toggleTaskList();
        editor?.commands.focus();
        editor?.commands.scrollIntoView();
        break;

      case "Code Block":
        editor?.commands.setCodeBlock();
        editor?.commands.focus();
        editor?.commands.scrollIntoView();
        break;

      case "Horizontal Rule":
        editor?.commands.setHorizontalRule();
        editor?.commands.focus();
        editor?.commands.scrollIntoView();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const dataInView = data?.find(({ date }) => date === selectedDate);

    const setInitialContent = () => {
      editor?.commands?.setContent(initialContent);
      editor?.commands.scrollIntoView();
      setData([
        {
          date: selectedDate,
          json: initialContent,
        },
      ]);
      return;
    };

    const createTodaysView = () => {
      setData([
        {
          date: selectedDate,
          json: "",
        },
        ...data,
      ]);
    };

    const updateContent = () => {
      editor?.commands?.setContent(dataInView?.json);
      editor?.commands.scrollIntoView();
    };

    if ((!data || !data.length) && editor && !dataInView) {
      setInitialContent();
    }

    if (
      data.length &&
      editor &&
      selectedDate === new Date().toDateString() &&
      !dataInView
    ) {
      createTodaysView();
    }

    if (editor && dataInView) {
      updateContent();
    }
  }, [editor, selectedDate]);

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
            <BiHeading size={18} />
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
            <BiBold size={18} />
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
            <BiItalic size={18} />
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
            <BiUnderline size={18} />
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
            <BiStrikethrough size={18} />
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
            <BiListUl size={18} />
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
            <BiListOl size={18} />
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
            <GrBlockQuote size={18} />
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
            <BiTask size={18} />
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
            <BiHighlight size={18} />
          </button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} className="w-full h-auto mt-2 lg:mt-16" />
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
