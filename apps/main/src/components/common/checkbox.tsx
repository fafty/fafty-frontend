export type CheckboxProps = {
  checked: boolean
  namespace: string | number
  title: string
}

export const Checkbox = ({ checked, namespace, title, onChange }) => {
  const onChangeCheckbox = (e) => {
    onChange(e.target.checked)
  }

  return (
    <>
      <input
        id={`checkbox_${namespace}`}
        type="checkbox"
        onChange={onChangeCheckbox}
        checked={checked}
        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
      />
      <label
        htmlFor={`checkbox_${namespace}`}
        className="pl-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {title}
      </label>
    </>
  )
}
