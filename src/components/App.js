import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import useLocalStorage from '../hooks/useLocalStorage';

function App() {

  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
  <html>
    <body> ${html}</body>
    <style>${css}</style>
    <script>${js}</script>
  </html>
  `)
    }, 250)
    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <div>
      {/* top section */}
      <div className="pane top-pane">
        <Editor
          languages="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          languages="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          languages="javascript"
          displayName="JavaScript"
          value={js}
          onChange={setJs}
        />
      </div>
      {/* bottom pane */}
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts" //help with security (dont want iframe to access cookies)
          // style="border:0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}

export default App;
