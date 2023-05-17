import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';


const Editorr = () => {

  const editiorRef = useRef(null);

  // useEffect(() => {  
  //   function init () {

  //     editiorRef.current = document.getElementById(realTimeEditor)
  //     editiorRef.current.on('change', (instance, changes) => {
  //       console.log('changes', changes);
  //     })
  //   }
  //   init();
  // }, [])
  


  return (
    
    <div id='realTimeEditor' >
      <Editor height="100vh" 
       
      width="1330px"
      theme='vs-dark'
      defaultLanguage="python" 
      defaultValue="print('Jai Shree Ram')"
      />
        </div>
      );
}

export default Editorr