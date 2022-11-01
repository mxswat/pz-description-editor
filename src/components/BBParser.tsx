import React from 'react'

const BBCode = require('@bbob/react/es/Component').default
const reactPreset = require('@bbob/preset-react/es').default

const options = { 
    onlyAllowTags: [
        'h1',
        'b',
        'i',
        'strike',
        'spoiler',
        'code',
        'img',
        // 'noparse',
        'url',
        'list',
        'olist',
        // '*',
        'hr',
        'quote',
        'table',
        'tr',
        'th',
        'td',
    ]
}

const extended = reactPreset.extend((tags: any, options: any) => ({
    ...tags,
    spoiler: (node: any) => ({
        tag: "span",
        attrs: {
            className: 'spoiler'
        },
        content: node.content
    }),
    'olist': (node: any) => ({
        tag: "ol",
        content: node.content
    }),
    list: (node: any) => ({
        tag: "ul",
        content: node.content
    }),
    quote: (node: any) => ({
        tag: 'blockquote',
        attrs: node.attrs,
        content: node.content,
    }),
}));

// export const BBToReact = (input: string): ReactNode => {
//     // The [*] breaks the parser
//     const bbCode = input.replaceAll('[*]', '[li]').replaceAll('[/*]', '[/li]')
//     return reactRender(bbCode, extended(), options)
// }

export const BBRenderer = ({text}: {text: string}) => (
    <BBCode plugins={[extended()]} options={options}>
      {text}
    </BBCode>
  )
  