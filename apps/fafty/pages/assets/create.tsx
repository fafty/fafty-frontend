import dynamic from 'next/dynamic'
import MainLayout  from '../../layouts/main'
import { lazy, Suspense, useRef } from 'react';

import { EditorPlaceholder } from '@fafty-frontend/shared/ui';

interface EditorProps {
  isAutocomplete?: boolean
  maxCharacters?: null | number
  isRichText?: boolean
  showTreeView?: boolean
  initialEditorState: null | string
  onChange: (editorState: JSON) => void
}
const Editor = dynamic<EditorProps>(() => import('@fafty-frontend/editor').then((mod) => mod.Editor), {
  ssr: false, loading: () => <EditorPlaceholder />
});
// const Editor = dynamic<EditorProps>(
//   () => import('@fafty-frontend/editor').then((mod) => mod.Editor), { suspense: true }
// )

const onEditorChange = (editorState: JSON) => {
  console.log('create page editorState', editorState);
}

export default function Create() {
  return (
    <MainLayout title={'Create Nft'} description={'Create Nft description'}>
      <div>
          <Editor initialEditorState={null} onChange={onEditorChange} />
        {/* <Suspense aria-hidden="true" fallback={<EditorPlaceholder />}>
        </Suspense> */}
      </div>
    </MainLayout>
  );
}

