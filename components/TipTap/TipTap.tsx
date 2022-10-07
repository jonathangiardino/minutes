import React, { FC, ReactNode, useEffect, useState } from 'react'
import clsx from 'clsx'
import useLocalStorageState from 'use-local-storage-state'
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu as MobileFloatingMenu,
} from '@tiptap/react'
import { useHotkeys } from 'react-hotkeys-hook'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Typography from '@tiptap/extension-typography'
import CharacterCount from '@tiptap/extension-character-count'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TaskList } from '@tiptap/extension-task-list'
import { TaskItem } from '@tiptap/extension-task-item'
import { Highlight } from '@tiptap/extension-highlight'
import { Underline } from '@tiptap/extension-underline'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
// import { Mention } from "@tiptap/extension-mention";
import { lowlight } from 'lowlight/lib/core'
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
  BiCode,
  BiError,
} from 'react-icons/bi'
import { RiNumber2 } from 'react-icons/ri'
import { GrBlockQuote } from 'react-icons/gr'
import { GoSync } from 'react-icons/go'
import FloatingMenu from '../FloatingMenu'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { initialContent } from './initialContent'
import { saveLog } from '@/lib/supabase/handlers'
import { useUser } from '@/lib/contexts/authContext'
import toast, { Toaster } from 'react-hot-toast'
import { useSyncState } from '@/lib/contexts/syncContext'

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

export interface FormattingBlock {
  id: number
  name: string
  description: string
  url: string
  color: string
  icon: ReactNode | string
}

const Tiptap: FC = () => {
  const { user } = useUser()
  const [status, setStatus] = useState<string>('IDLE')
  const [openFloatingMenu, setOpenFloatingMenu] = useState<boolean>(false)
  const { selectedDate, syncedData, setSyncedData } = useSyncState()
  const [data, setData] = useLocalStorageState<any[]>('minutes-data', {
    defaultValue: [],
  })

  const editor = useEditor({
    extensions: [
      CodeBlockLowlight.configure({
        lowlight,
      }),
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
        bulletList: {
          HTMLAttributes: {
            class: 'text-inherit list-disc ',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'text-inherit list-decimal ',
          },
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: 'rounded border border-gray-100 dark:border-none',
        },
      }),
      TaskItem,
      Placeholder.configure({
        placeholder: "What's on your mind?",
      }),
      Highlight.configure({
        HTMLAttributes: {
          class:
            'px-[6px] py-[2px] rounded-md bg-[#ffc078] dark:bg-[#db8c32] dark:text-[#f8fafc]',
        },
      }),
      Underline,
      Link.configure({
        HTMLAttributes: {
          class: 'text-brand',
        },
      }),
      Typography,
      CharacterCount.configure({
        mode: 'nodeSize',
      }),
    ],
    content: '',
    autofocus: false,
    editorProps: {
      attributes: {
        class: 'p-4 focus:outline-none active:outline-none',
      },
    },
    // onFocus: async ({ editor: updatedEditor }) => {
    //   // TODO: add auto sync on paid plan
    //   console.log('saved to supabase on focus')
    //   await sync(updatedEditor.getJSON())
    // },
    onBlur: async ({ editor: updatedEditor }) => {
      // TODO: add auto sync on paid plan
      console.log('saved to supabase on blur')
      await sync(updatedEditor.getJSON())
    },
    onUpdate: ({ editor: updatedEditor }) => {
      if (!user) {
        const dataInView = data?.find((note) => note.date === selectedDate)
        let dataClone = [...data]
        let dataInViewIndex = data?.findIndex(
          (note) => note.date === selectedDate,
        )

        if (data.length && !dataInView) {
          setData([
            {
              date: selectedDate,
              json: JSON.parse(JSON.stringify(updatedEditor.getJSON())),
            },
            ...data,
          ])
        }

        if (dataInView) {
          dataClone[dataInViewIndex] = {
            ...dataInView,
            json: JSON.parse(JSON.stringify(updatedEditor.getJSON())),
          }
          setData([...dataClone])
        }
      }

      if (user && syncedData) {
        const dataInView = syncedData?.find(
          (note: any) => note.date === selectedDate,
        )
        let dataClone = [...syncedData]
        let dataInViewIndex = syncedData?.findIndex(
          (note: any) => note.date === selectedDate,
        )

        if (syncedData.length && !dataInView) {
          setSyncedData([
            {
              date: selectedDate,
              json: updatedEditor.getJSON(),
            },
            ...syncedData,
          ])
        }

        if (dataInView) {
          dataClone[dataInViewIndex] = {
            ...dataInView,
            json: updatedEditor.getJSON(),
          }
          setSyncedData([...dataClone])
        }
      }
    },
  })

  // HOTKEYS
  useHotkeys(
    'command+/, ctrl+/',
    () => {
      setOpenFloatingMenu(!openFloatingMenu)
    },
    {
      enableOnContentEditable: true,
      enableOnTags: ['INPUT', 'TEXTAREA', 'SELECT'],
    },
    [openFloatingMenu],
  )

  // const notifySynced = () =>
  //   toast('All synced', {
  //     duration: 1500,
  //     // Styling
  //     style: {
  //       fontFamily: 'Helvetica Neue',
  //       fontSize: '14px',
  //       backgroundColor: '#3f67e0',
  //       color: '#f8fafc',
  //     },

  //     // Custom Icon
  //     icon: <GoSync color="#f8fafc" />,
  //   })

  const notifyError = () =>
    toast.error('Oops, something went wrong', {
      style: {
        fontFamily: 'Helvetica Neue',
        fontSize: '14px',
        backgroundColor: '#d15b6f',
        color: '#f8fafc',
      },

      icon: <BiError />,
    })

  async function sync(content: any) {
    if (!user) return
    setStatus('SYNC')
    const { error } = await saveLog({
      unique_id: `${new Date(selectedDate).valueOf()}-${user?.id}`,
      date: selectedDate,
      json: content,
      user_id: user.id,
    })

    if (error) {
      notifyError()
      setStatus('IDLE')
      return
    }

    const localParsedData = syncedData?.map((log: any) => ({
      date: log.date,
      json: log.json,
    }))
    setData([...localParsedData])
    // notifySynced()
    setStatus('IDLE')
  }

  const InsertNode = (block: FormattingBlock) => {
    switch (block.name) {
      case 'Paragraph':
        editor?.commands.insertContent({
          type: 'paragraph',
          content: [],
        })
        editor?.commands.focus()
        editor?.commands.scrollIntoView()
        break

      case 'Heading 1':
        editor?.commands.insertContent({
          type: 'heading',
          content: [],
          attrs: {
            level: 1,
          },
        })
        editor?.commands.focus()
        editor?.commands.scrollIntoView()
        break

      case 'Heading 2':
        editor?.commands.insertContent({
          type: 'heading',
          content: [],
          attrs: {
            level: 2,
          },
        })
        editor?.commands.focus()
        editor?.commands.scrollIntoView()
        break

      case 'Bullet List':
        editor?.commands.enter()
        editor?.commands.toggleBulletList()
        editor?.commands.focus()
        editor?.commands.scrollIntoView()
        break

      case 'Numbered List':
        editor?.commands.enter()
        editor?.commands.toggleOrderedList()
        editor?.commands.focus()
        editor?.commands.scrollIntoView()
        break

      case 'Blockquote':
        editor?.commands.toggleBlockquote()
        editor?.commands.focus()
        editor?.commands.scrollIntoView()
        break

      case 'Task':
        editor?.commands.enter()
        editor?.commands.toggleTaskList()
        editor?.commands.focus()
        editor?.commands.scrollIntoView()
        break

      case 'Code Block':
        editor?.commands.setCodeBlock()
        editor?.commands.focus()
        editor?.commands.scrollIntoView()
        break

      case 'Horizontal Rule':
        editor?.commands.setHorizontalRule()
        editor?.commands.focus()
        editor?.commands.scrollIntoView()
        break

      default:
        break
    }
  }

  useEffect(() => {
    if (!user) {
      // console.log('UNAUTHENTICATED USER')
      const dataInView = data?.find(({ date }) => date === selectedDate)

      const setInitialContent = () => {
        editor?.commands?.setContent(initialContent)
        setData([
          {
            date: selectedDate,
            json: initialContent,
          },
        ])
        return
      }

      const createTodaysView = () => {
        setData([
          {
            date: selectedDate,
            json: '',
          },
          ...data,
        ])
        !editor?.isDestroyed && editor?.commands.setContent('')
      }

      const updateContent = () => {
        !editor?.isDestroyed &&
          editor?.commands.setContent(dataInView?.json || '')
      }

      if ((!data || !data.length) && editor && !dataInView) {
        setInitialContent()
      }

      if (
        data.length &&
        editor &&
        selectedDate === new Date().toDateString() &&
        !dataInView
      ) {
        createTodaysView()
      }

      if (editor && dataInView) {
        updateContent()
      }
    }

    if (user && syncedData.length) {
      // console.log('LOGGED USER', syncedData)



      const dataInView = syncedData?.find(
        ({ date }: { date: string }) => date === selectedDate,
      )

      const setInitialContent = () => {
        editor?.commands?.setContent(initialContent)
        setSyncedData(
          JSON.stringify([
            {
              date: selectedDate,
              json: initialContent,
            },
          ]),
        )
        return
      }

      const createTodaysView = () => {
        setSyncedData(
          JSON.stringify([
            {
              date: selectedDate,
              json: '',
            },
            ...syncedData,
          ]),
        )
        !editor?.isDestroyed && editor?.commands.setContent('')
      }

      const updateContent = () => {
        !editor?.isDestroyed &&
          editor?.commands.setContent(dataInView?.json || '')
      }

      if ((!syncedData || !syncedData.length) && editor && !dataInView) {
        setInitialContent()
      }

      if (
        syncedData.length &&
        editor &&
        selectedDate === new Date().toDateString() &&
        !dataInView
      ) {
        createTodaysView()
      }

      if (editor && dataInView) {
        updateContent()
      }
    }
  }, [editor, selectedDate, syncedData])

  useEffect(() => {
    const focusEditor = (e: any) => {
      e.stopPropagation()

      if (editor && e.target.id === 'outer-editor' && !editor?.isFocused) {
        !editor?.isDestroyed && editor?.commands.selectTextblockEnd()
        !editor?.isDestroyed && editor?.commands.focus()
      }
    }

    document.addEventListener('click', (e) => focusEditor(e))
    return () => {
      document.removeEventListener('click', (e) => focusEditor(e))
    }
  }, [editor])

  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ delay: 300, duration: 300 }}
          className="pt-[5px] px-1 pb-0 shadow-xl bg-[#28282c] dark:bg-[#45454d] text-white rounded-lg"
        >
          <div className="mx-1 pointer-events-none text-[11px] bg-[#28282c] dark:bg-[#45454d] text-white fixed -bottom-4 right-0 rounded-sm px-[3px]">
            {editor?.state?.selection?.to &&
              editor?.state?.selection?.from &&
              editor?.state?.selection?.to -
                editor?.state?.selection?.from +
                ' chars'}
          </div>
          <button
            title="Heading"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: 1 })
                .setTextSelection(editor.state.tr.selection.$anchor.pos + 1)
                .insertContent('')
                .run()
            }
            className={clsx(
              editor.isActive('heading', { level: 1 })
                ? 'text-brand font-bold'
                : '',
              'mx-1',
            )}
          >
            <BiHeading className="text-[18px]" />
          </button>
          <button
            title="Heading 2"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: 2 })
                .setTextSelection(editor.state.tr.selection.$anchor.pos + 1)
                .insertContent('')
                .run()
            }
            className={clsx(
              editor.isActive('heading', { level: 2 })
                ? 'text-brand font-bold'
                : '',
              'mx-1 inline-flex items-center',
            )}
          >
            <BiHeading className="text-[18px]" />
            <RiNumber2 className="text-sm font-semibold -ml-[6px]" />
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
                .insertContent('')
                .run()
            }
            className={clsx(
              editor.isActive('bold') ? 'text-brand font-bold' : '',
              'mx-1',
            )}
          >
            <BiBold className="text-[18px]" />
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
                .insertContent('')
                .run()
            }
            className={clsx(
              editor.isActive('italic') ? 'text-brand font-bold' : '',
              'mx-1',
            )}
          >
            <BiItalic className="text-[18px]" />
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
                .insertContent('')
                .run()
            }
            className={clsx(
              editor.isActive('underline') ? 'text-brand font-bold' : '',
              'mx-1',
            )}
          >
            <BiUnderline className="text-[18px]" />
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
                .insertContent('')
                .run()
            }
            className={clsx(
              editor.isActive('strike') ? 'text-brand font-bold' : '',
              'mx-1',
            )}
          >
            <BiStrikethrough className="text-[18px]" />
          </button>
          <button
            title="Bullet list"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBulletList()
                .setTextSelection(editor.state.tr.selection.$anchor.pos + 1)
                .insertContent('')
                .run()
            }
            className={clsx(
              editor.isActive('bulletList') ? 'text-brand font-bold' : '',
              'mx-1',
            )}
          >
            <BiListUl className="text-[18px]" />
          </button>
          <button
            title="Ordered List"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleOrderedList()
                .setTextSelection(editor.state.tr.selection.$anchor.pos + 1)
                .insertContent('')
                .run()
            }
            className={clsx(
              editor.isActive('orderedList') ? 'text-brand font-bold' : '',
              'mx-1',
            )}
          >
            <BiListOl className="text-[18px]" />
          </button>
          <button
            title="Blockquote"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBlockquote()
                .setTextSelection(editor.state.tr.selection.$anchor.pos + 1)
                .insertContent('')
                .run()
            }
            className={clsx(
              editor.isActive('orderedList') ? 'text-brand font-bold' : '',
              'mx-1',
            )}
          >
            <GrBlockQuote className="text-[18px]" />
          </button>
          <button
            title="To do"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleTaskList()
                .setTextSelection(editor.state.tr.selection.$anchor.pos + 1)
                .insertContent('')
                .run()
            }
            className={clsx(
              editor.isActive('taskList') ? 'text-brand font-bold' : '',
              'mx-1',
            )}
          >
            <BiTask className="text-[18px]" />
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
                .insertContent('')
                .run()
            }
            className={clsx(
              editor.isActive('highlight') ? 'text-brand font-bold' : '',
              'mx-1',
            )}
          >
            <BiHighlight className="text-[18px]" />
          </button>
        </BubbleMenu>
      )}
      <EditorContent
        editor={editor}
        className="w-full h-auto mt-2 lg:mt-16"
        id="outer-editor"
      />

      <FloatingMenu
        open={openFloatingMenu}
        setOpen={setOpenFloatingMenu}
        InsertNode={InsertNode}
      />
      {editor && (
        <MobileFloatingMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className={clsx(
            'md:hidden w-full justify-start gap-2 overflow-x-auto px-2 py-2 shadow-xl bg-[#28282c] dark:bg-[#45454d] text-white transition-opacity rounded-md',
            editor?.isFocused ? 'flex opacity-100' : 'hidden opacity-0',
          )}
        >
          <button
            title="Heading"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={clsx(
              editor.isActive('heading', { level: 1 })
                ? 'text-brand font-bold'
                : '',
              'mx-1',
            )}
          >
            <BiHeading className="text-xl" />
          </button>
          <span className="opacity-20">|</span>
          <button
            title="Heading 2"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={clsx(
              editor.isActive('heading', { level: 2 })
                ? 'text-brand font-bold'
                : '',
              'mx-1 inline-flex items-center',
            )}
          >
            <BiHeading className="text-xl" />
            <RiNumber2 className="text-md font-semibold -ml-[6px]" />
          </button>
          <span className="opacity-20">|</span>
          <button
            title="Bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={clsx(
              editor.isActive('bold') ? 'text-brand font-bold' : '',
              'mx-1',
            )}
          >
            <BiBold className="text-xl" />
          </button>
          <span className="opacity-20">|</span>
          <button
            title="Italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={clsx(
              editor.isActive('italic') ? 'text-brand font-bold' : '',
              'mx-1',
            )}
          >
            <BiItalic className="text-xl" />
          </button>
          <span className="opacity-20">|</span>
          <button
            title="Underline"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={clsx(
              editor.isActive('underline') ? 'text-brand font-bold' : '',
              'mx-1',
            )}
          >
            <BiUnderline className="text-xl" />
          </button>
          <span className="opacity-20">|</span>
          <button
            title="Strike-through"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={clsx(
              editor.isActive('strike') ? 'text-brand font-bold' : '',
              'mx-1',
            )}
          >
            <BiStrikethrough className="text-xl" />
          </button>
          <span className="opacity-20">|</span>
          <button
            title="Bullet list"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={clsx(
              editor.isActive('bulletList') ? 'text-brand font-bold' : '',
              'mx-1',
            )}
          >
            <BiListUl className="text-xl" />
          </button>
          <span className="opacity-20">|</span>
          <button
            title="Ordered List"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={clsx(
              editor.isActive('orderedList') ? 'text-brand font-bold' : '',
              'mx-1',
            )}
          >
            <BiListOl className="text-xl" />
          </button>
          <span className="opacity-20">|</span>
          <button
            title="Blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={clsx(
              editor.isActive('orderedList') ? 'text-brand font-bold' : '',
              'mx-1',
            )}
          >
            <GrBlockQuote className="text-xl" />
          </button>
          <span className="opacity-20">|</span>
          <button
            title="To do"
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={clsx(
              editor.isActive('taskList') ? 'text-brand font-bold' : '',
              'mx-1',
            )}
          >
            <BiTask className="text-xl" />
          </button>
          <span className="opacity-20">|</span>
          <button
            title="Code Block"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={clsx(
              editor.isActive('taskList') ? 'text-brand font-bold' : '',
              'mx-1',
            )}
          >
            <BiCode className="text-xl" />
          </button>
          <span className="opacity-20">|</span>
          <button
            title="Highlight"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={clsx(
              editor.isActive('highlight') ? 'text-brand font-bold' : '',
              'mx-1 pr-[6px]',
            )}
          >
            <BiHighlight className="text-xl" />
          </button>
        </MobileFloatingMenu>
      )}
      {user ? (
        <button
          onClick={async () => await sync(editor?.getJSON())}
          title="Sync"
          className={clsx(
            'absolute md:fixed z-50 top-5 md:top-4 right-16 cursor-pointer rounded-full',
            status === 'SYNC'
              ? 'animate-spin text-brand'
              : 'text-gray-400 hover:text-gray-500',
          )}
        >
          <GoSync size={24} />
        </button>
      ) : null}
      <Toaster position="bottom-right" />
    </>
  )
}

export default Tiptap
