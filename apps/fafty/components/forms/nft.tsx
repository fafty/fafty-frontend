import dynamic from 'next/dynamic';
import {ChangeEventHandler, lazy, Suspense, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';

import {EditorPlaceholder} from '@fafty-frontend/shared/ui';

const SelectBlockchain = lazy(() => import('./components/selectBlockchain'));

interface EditorProps {
  isAutocomplete?: boolean;
  maxCharacters?: null | number;
  isRichText?: boolean;
  showTreeView?: boolean;
  initialEditorState: null | string;
  placeholder?: string;
  name: string;
  hasError?: boolean;
  onChange: ChangeEventHandler;
}

const Editor = dynamic<EditorProps>(
  () => import('@fafty-frontend/editor').then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => <EditorPlaceholder/>,
  }
);

// const onDescriptionChange = (e: any) => {
//   console.log('create page editorState', e);
// };

// const onUnlockableContentChange = (unlockableContent: JSON) => {
//   console.log('create page unlockableContent', unlockableContent);
// };

export default function NftForm() {
  const [hasUnlockableContent, setHasUnlockableContent] = useState(false);

  // const handleChangeUnlockableContent = ({
  //   name,
  //   value,
  // }: {
  //   name: string;
  //   value: boolean;
  // }) => {
  //   console.log('create page handleChangeUnlockableContent', name, value);
  //   setHasUnlockableContent(value);
  // };

  const {
    control,
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div className="mb-5 relative">
        <label
          htmlFor="item-name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
        >
          Name
        </label>
        <input
          type="text"
          id="item-name"
          className={`${
            errors.name
              ? 'border-red-500'
              : 'border-gray-200 dark:border-neutral-800'
          } text-gray-700 dark:text-gray-100 dark:bg-neutral-900/90 mt-1 border focus:outline-none rounded-md shadow-sm focus:border-gray-500 focus:shadow w-full p-3 h-12`}
          placeholder="Enter name of Nft"
          autoComplete="off"
          defaultValue="test"
          {...(errors.name && {'aria-invalid': true})}
          {...register('name', {
            required: true,
            minLength: 5,
            maxLength: 30,
          })}
        />
        <span className="text-red-500">
          {errors.name && errors.name.type === 'required' && (
            <span role="alert">Name is required.</span>
          )}
          {errors.name && errors.name.type === 'minLength' && (
            <span role="alert">Min length of name is 5 characters.</span>
          )}
          {errors.name && errors.name.type === 'maxLength' && (
            <span role="alert">Max length of name is 30 characters.</span>
          )}
        </span>
      </div>
      <div className="my-3">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-100">
          Description
        </label>
        <Controller
          name="description"
          control={control}
          // defaultValue="acasc cacascacsasca"
          rules={{
            required: true,
            minLength: 5,
            maxLength: 30,
          }}
          render={({field}) => (
            <Editor
              {...field}
              initialEditorState={field.value}
              name="description"
              placeholder={'Enter some description'}
              hasError={errors.description}
            />
          )}
        />
        <span className="text-red-500">
          {errors.description && errors.description.type === 'required' && (
            <span role="alert">Description is required.</span>
          )}
          {errors.description && errors.description.type === 'minLength' && (
            <span role="alert">Min length of description is 5 characters.</span>
          )}
          {errors.description && errors.description.type === 'maxLength' && (
            <span role="alert">
              Max length of description is 30 characters.
            </span>
          )}
        </span>
      </div>
      <div className="flex my-3">
        <div className="flex-row">
          <div className="block text-sm font-medium text-gray-700 dark:text-gray-100">
            Unlockable Content
          </div>
          <div className="text-xs block truncate text-gray-400">
            Include unlockable content that can only be revealed by the owner of
            the item.
          </div>
        </div>
        <div className="ml-auto">
          <label
            htmlFor="large-toggle"
            className="inline-flex relative items-center cursor-pointer"
          >
            <input
              type="checkbox"
              value=""
              id="large-toggle"
              className="sr-only peer"
              name="unlockableContent"
              aria-label={`${
                hasUnlockableContent ? 'Activate' : 'Deactivate'
              } Unlockable Content`}
              onChange={(e) => setHasUnlockableContent(e.target.checked)}
            />
            <div
              className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      {hasUnlockableContent && (
        <div>
          <Controller
            name="unlockableContent"
            control={control}
            // defaultValue="acasc  cacascacsasca"
            rules={{
              required: true,
              minLength: 5,
              maxLength: 30,
            }}
            render={({field}) => (
              <Editor
                {...field}
                {...(errors.unlockableContent && {'aria-invalid': true})}
                initialEditorState={field.value}
                name="unlockableContent"
                // onChange={onUnlockableContentChange}
                placeholder={
                  'Enter content (access key, code to redeem, link to a file, etc.)'
                }
                hasError={errors.unlockableContent}
              />
            )}
          />
          <span className="text-red-500">
            {errors.unlockableContent &&
              errors.unlockableContent.type === 'required' && (
                <span role="alert">Content is required.</span>
              )}
            {errors.unlockableContent &&
              errors.unlockableContent.type === 'minLength' && (
                <span role="alert">Min length of content is 5 characters.</span>
              )}
            {errors.unlockableContent &&
              errors.unlockableContent.type === 'maxLength' && (
                <span role="alert">
                  Max length of content is 30 characters.
                </span>
              )}
          </span>
        </div>
      )}
      <div className="mb-5 relative">
        <label
          htmlFor="item-supply-units"
          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
        >
          Supply
        </label>
        <input
          type="number"
          id="item-supply-units"
          className={`${
            errors.supplyUnits
              ? 'border-red-500'
              : 'border-gray-200 dark:border-neutral-800'
          } text-gray-700 dark:text-gray-100 dark:bg-neutral-900/90 mt-1 border focus:outline-none rounded-md shadow-sm focus:border-gray-500 focus:shadow w-full p-3 h-12`}
          placeholder="Enter of supply units"
          defaultValue="1"
          min="1"
          {...(errors.supplyUnits && {'aria-invalid': true})}
          {...register('supplyUnits', {
            required: true,
            min: 1,
          })}
        />
        <span className="text-red-500">
          {errors.supplyUnits && errors.supplyUnits.type === 'required' && (
            <span role="alert">Units for supply is required.</span>
          )}
          {errors.supplyUnits && errors.supplyUnits.type === 'min' && (
            <span role="alert">Minimum 1 unit.</span>
          )}
        </span>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <SelectBlockchain/>
      </Suspense>
      <input type="submit"/>
    </form>
  );
}
