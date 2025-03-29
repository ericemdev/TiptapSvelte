<script>
    import { onMount } from 'svelte';
    import { Editor } from '@tiptap/core';

    import StarterKit from '@tiptap/starter-kit';
    import Paragraph from '@tiptap/extension-paragraph';
    import Document from '@tiptap/extension-document';
    import Bold from '@tiptap/extension-bold';
    import Italic from '@tiptap/extension-italic';
    import Underline from '@tiptap/extension-underline';
    import Link from '@tiptap/extension-link';
    import Heading from '@tiptap/extension-heading';
    import HorizontalRule from '@tiptap/extension-horizontal-rule';
    import {Blockquote} from "@tiptap/extension-blockquote";
    import {TextAlign} from "@tiptap/extension-text-align";
    import TextStyle from '@tiptap/extension-text-style';
    import Color from '@tiptap/extension-color';
    import HardBreak from '@tiptap/extension-hard-break';
    import ListItem from '@tiptap/extension-list-item';
    import { OrderedList } from '@tiptap/extension-ordered-list';
    import {BulletList} from "@tiptap/extension-bullet-list";
    import {Youtube} from "@tiptap/extension-youtube";
    import CodeBlock from '@tiptap/extension-code-block';
    import Code from '@tiptap/extension-code';
    import Image from '@tiptap/extension-image';
    import Placeholder from '@tiptap/extension-placeholder'

    export let content = '';
    let codeBgColor = '#d1ceec';
    let codeTextColor = '#e79112';
    
    let tiptapEditor;

    onMount(() => {
        tiptapEditor = new Editor({
            element: document.querySelector('#tiptap-editor'),
            extensions: [
                StarterKit.configure({
                    paragraph: false,
                    horizontalRule: false,
                    bulletList: false,
                }),
                Placeholder.configure({placeholder: 'Write something …'}),
                OrderedList.configure({
                    HTMLAttributes: {
                        class: 'ordered-list',
                    },
                }),
                CodeBlock.configure({
                    HTMLAttributes: {
                        class: 'modern-code-block',
                        style: `
                            background-color: ${codeBgColor};
                            color: ${codeTextColor};
                            font-family: 'Fira Code', monospace;
                            border-radius: 0.5rem;
                            padding: 1.25rem;
                            margin: 1rem 0;
                        `
                    }
                }),
                ListItem.configure({
                    HTMLAttributes: {
                        class: 'list-item',
                    },
                }),

                BulletList.configure({
                    HTMLAttributes: {
                        class: 'bullet-list',
                    },
                    itemTypeName: 'listItem',
                }),
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                    alignments: ['left', 'center', 'right'],
                    defaultAlignment: 'left',
                }),
                TextStyle,
                Color.configure({
                    types: ['textStyle'],
                }),
                Blockquote.configure({
                    HTMLAttributes: {
                        class: 'my-blockquote',
                    },
                }),

                Paragraph.configure({
                    HTMLAttributes: {
                        class: 'custom-paragraph',
                    },
                }),
                Bold,
                Document,
                Italic,
                HardBreak,
                Underline,
                Link.configure({
                    openOnClick: false,
                    HTMLAttributes: {
                        class: 'text-blue-600 hover:underline',
                    },
                }),
                Image.configure({
                    HTMLAttributes: {
                        class: 'embedded-image',
                    },
                    allowBase64: true,
                    inline: true,
                }),
                Youtube.configure({
                    HTMLAttributes: {
                        class: 'youtube-embed',
                    },
                    inline: false,
                    width: 40,
                    height: 30,
                }),
                Code.configure({
                    HTMLAttributes: {
                        class: 'code-format',
                    },
                    inline: true,
                    exitable: true,
                    parseHTML: () => [{ tag: 'code' }],
                }),
                Heading.configure({
                    levels: [1, 2, 3],
                }),
                HorizontalRule
            ],
            content,
            onUpdate: ({ editor }) => {content = editor.getHTML();}
        });
    });
    
    const copyCode = () => { // TODO function not implemented
        const codeBlocks = document.querySelectorAll('.modern-code-block');
        if (codeBlocks.length > 0) {
            const latestCodeBlock = codeBlocks[codeBlocks.length - 1];
            navigator.clipboard.writeText(latestCodeBlock.textContent)
                .then(() => {
                    // You could add a toast notification here
                    console.log('Code copied to clipboard');
                });
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            tiptapEditor.chain().focus()
                .setImage({ src: e.target.result })
                .run();
        };
        reader.readAsDataURL(file);
    };
    const addYoutubeVideo = () => {
        const url = window.prompt('Enter YouTube video URL');
        if (url) tiptapEditor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
    const setLink = () => {
        const previousUrl = tiptapEditor.getAttributes('link').href;
        const url = window.prompt('Enter URL', previousUrl || 'https://');
        if (url === null) return;
        if (url === '') {
            tiptapEditor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        tiptapEditor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };
    const setHeading = (level) => tiptapEditor.chain().focus().toggleHeading({ level }).run();
    const addHorizontalRule = () => tiptapEditor.chain().focus().setHorizontalRule().run();
    const toggleBold = () => tiptapEditor.chain().focus().toggleBold().run();
    const toggleItalic = () => tiptapEditor.chain().focus().toggleItalic().run();
    const toggleUnderline = () => tiptapEditor.chain().focus().toggleUnderline().run();
    const alignLeft = () => tiptapEditor.chain().focus().setTextAlign('left').run();
    const alignCenter = () => tiptapEditor.chain().focus().setTextAlign('center').run();
    const alignRight = () => tiptapEditor.chain().focus().setTextAlign('right').run();
    const toggleBlockquote = () => tiptapEditor.chain().focus().toggleBlockquote().run();
    const toggleOrderedList = () => tiptapEditor?.chain().focus().toggleOrderedList().run();
    const toggleBulletList = () => tiptapEditor?.chain().focus().toggleBulletList().run();
    const undo = () => {tiptapEditor?.chain().focus().undo().run();};
    const redo = () => {tiptapEditor?.chain().focus().redo().run();};
    const colors = [
        { name: "Navy", value: "#1e3a8a" },
        { name: "Berry", value: "#9f1239" },
        { name: "Forest", value: "#166534" },
        { name: "Cocoa", value: "#451a03" },
        { name: "Royal", value: "#3730a3" }
    ];
    
    const isBoldActive = () => tiptapEditor?.isActive('bold');
    const isOrderedListActive = () => tiptapEditor?.isActive('orderedList') ?? false;
    const isItalicActive = () => tiptapEditor?.isActive('italic');
    const isUnderlineActive = () => tiptapEditor?.isActive('underline');
    const isLinkActive = () => tiptapEditor?.isActive('link');
    const isHeadingActive = (level) => tiptapEditor?.isActive('heading', { level });
    const isAlignLeft = () => tiptapEditor?.isActive({ textAlign: 'left' });
    const isAlignCenter = () => tiptapEditor?.isActive({ textAlign: 'center' });
    const isAlignRight = () => tiptapEditor?.isActive({ textAlign: 'right' });
    const isCodeActive = () => tiptapEditor?.isActive('code') ?? false;
    
    const buttons = [
        {name: "Bold", action: toggleBold, isActive: isBoldActive, title: "Bold (Ctrl+B)"},
        {name: "Italic", action: toggleItalic, isActive: isItalicActive, title: "Italic (Ctrl+I)"},
        {name: "Underline", action: toggleUnderline, isActive: isUnderlineActive, title: "Underline (Ctrl+U)"},
        {name: "Link", action: setLink, isActive: isLinkActive, title: "Link (Ctrl+K)"},
        {name: "</>", action: () => tiptapEditor?.chain().focus().toggleCode().run(), isActive: isCodeActive, title: "Code (Ctrl+Shift+C)"},
        {name: "H1", action: () => setHeading(1), isActive: () => isHeadingActive(1), title: "Heading 1"},
        {name: "H2", action: () => setHeading(2), isActive: () => isHeadingActive(2), title: "Heading 2"},
        {name: "H3", action: () => setHeading(3), isActive: () => isHeadingActive(3), title: "Heading 3"},
        {name: "HR", action: addHorizontalRule, isActive: () => {}, title: "Horizontal Rule"},
        {name: "Undo", action: undo, isActive: () => {}, title: "Undo (Ctrl+Z)"},
        {name: "Redo", action: redo, isActive: () => {}, title: "Redo (Ctrl+Shift+Z)"},
    ]
    
</script>


<div class=" border-gray-200 border rounded-lg p-4 bg-white shadow-md m-1">
    
    <div class="flex gap-2 p-2 border-b flex-wrap">
        
        {#each buttons as {name, action, isActive, title}}
            <button on:click={action} class="btn" class:is-active={isActive()} title={title}>
                {name}
            </button>
        {/each}

        <button on:click={alignLeft} class="btn" class:is-active={isAlignLeft()} title="Align Left">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 6H3"/><path d="M15 12H3"/><path d="M17 18H3"/>
            </svg>
        </button>

        <button on:click={alignCenter} class="btn" class:is-active={isAlignCenter()} title="Align Center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 6H3"/><path d="M17 12H7"/><path d="M19 18H5"/>
            </svg>
        </button>

        <button on:click={alignRight} class="btn" class:is-active={isAlignRight()} title="Align Right">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 6H3"/><path d="M21 12H9"/><path d="M21 18H7"/>
            </svg>
        </button>

        <button on:click={toggleBlockquote} class="btn" title="Blockquote">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span class="sr-only">Quote</span>
        </button>
        
        <label class="btn cursor-pointer">
            <input type="file" accept="image/*" on:change={handleImageUpload} class="hidden"/>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-3.5-3.5L12 18l-3.5-3.5L3 21"/>
            </svg>
        </label>

        <button on:click={toggleOrderedList} class="btn" class:is-active={isOrderedListActive()} title="Ordered List (Ctrl+Shift+7)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/>
                <line x1="10" y1="18" x2="21" y2="18"/>
                <path d="M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>
            </svg>
        </button>
        <button on:click={toggleBulletList} class="btn" title="Bullet List (Ctrl+Shift+8)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
                <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
        </button>
        
        <button on:click={addYoutubeVideo} class="btn" title="Insert YouTube Video">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="red" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
            </svg>
        </button>

        {#each colors as color}
            <button on:click={() => tiptapEditor?.chain().focus().setColor(color.value).run()} class="btn px-2 py-1 text-xs" style="background-color: {color.value}; color: white;" title={`Set ${color.name} text`}>
                {color.name}
            </button>
        {/each}

    </div>
    
    <div id="tiptap-editor" data-placeholder="Start typing your paragraph..."></div>

</div>