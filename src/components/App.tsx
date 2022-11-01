import React, { useState } from 'react';
import './App.css';
import TextareaAutosize from 'react-textarea-autosize';
import { BBRenderer } from './BBParser';
import { useHotkeys } from 'react-hotkeys-hook';
import { getFileHandle, readFile, writeFile } from '../utils/fileSystem';
import { parseDescription, replaceDescription } from '../utils/parser';

function App() {
  const [description, setDescription] = useState('')
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle>();

  const onTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const loadFile = async () => {
    const handle = await getFileHandle()
    setFileHandle(handle);
    const file = await handle.getFile();
    const contents = await readFile(file);
    onTextareaChange({ target: { value: parseDescription(contents) } } as any)
  }

  const saveFile = async () => {
    if (!fileHandle || !description) {
      return
    }
    const file = await fileHandle.getFile();
    const originalContent = await readFile(file);
    const newContent = replaceDescription(originalContent, description);
    writeFile(fileHandle, newContent)
  }

  useHotkeys('ctrl+o', (e) => {
    e.preventDefault();
    loadFile();
  }, { enableOnTags: ['TEXTAREA'] });

  useHotkeys('ctrl+s', (e) => {
    e.preventDefault();
    saveFile();
  }, { enableOnTags: ['TEXTAREA'] });


  return (
    <div className="App">
      <header className="font-sans text-white font-bold tracking-wide flex border-b-2 border-gray-700 gap-1 p-3">
        <button
          className='bg-cyan-900 rounded p-1 tracking-wide'
          onClick={loadFile}>
          Open (^O)
        </button>
        <button
          className='bg-cyan-900 rounded p-1 tracking-wide'
          disabled={!fileHandle}
          onClick={() => { console.log('click') }}>
          Save (^S)
        </button>
        <a className='bg-slate-500 rounded p-1' target={'_blank'} href="https://steamcommunity.com/comment/Guide/formattinghelp" rel="noreferrer">Formatting help</a>
      </header>
      <section className='grid grid-cols-2 p-4 gap-4 min-h-min'>
        <TextareaAutosize
          className='bg-[#191c1f] text-[#909090;] outline-none p-2 resize-none rounded font-mono border-2 border-gray-700 focus:border-gray-500'
          minRows={40}
          autoFocus
          value={description}
          onChange={onTextareaChange}>
        </TextareaAutosize>
        <div className='preview p-2 border-2 border-gray-700 rounded whitespace-pre-wrap'>
          <BBRenderer text={description} />
        </div>
      </section>
    </div>
  );
}

export default App;
