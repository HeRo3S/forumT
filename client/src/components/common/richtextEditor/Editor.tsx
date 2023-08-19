import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
function Editor(props: EditorProps) {
  const { value, setValue } = props;

  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}

export default Editor;
