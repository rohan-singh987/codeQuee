import { useState } from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';


const Editorr = () => {

    const [code, setCode] = useState(
        // `function add(a, b) {\n  return a + b;\n}`
      );
      return (
        <div className=''>
          <Editor height="100vh" 
            width="1330px"
            theme='vs-dark'
          defaultLanguage="python" 
          defaultValue="print('Jai Shree Ram')" />
        </div>
      );
}

export default Editorr