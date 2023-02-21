import { createEditor } from 'slate';
import { Slate, withReact, Editable } from 'slate-react';
import { useState } from 'react';
import slateInitialValue from '../../config/slate';

function Editor() {
  const [editor] = useState(() => withReact(createEditor()));
  return (
    <Slate editor={editor} value={slateInitialValue}>
      <Editable />
    </Slate>
  );
}

export default Editor;
