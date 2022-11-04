/*
 * @param {string} widthFirst - width first div of the block.
 * @param {string} widthSecond - width second div of the block.
 * @param {boolean} full - if the block is with description block.
 * @public
 * @returns {JSX.Element} - React element.
 */
const Block = ({
  widthFirst,
  widthSecond,
  full = false,
}: {
  widthFirst: string;
  widthSecond: string;
  full?: boolean;
}): JSX.Element => {
  return (
    <div className="placeholder flex items-center rounded-lg p-2">
      <div className="circle flex h-9 w-9" />
      <div className="ml-4">
        <div className="mb-2 flex">
          <div className={`h-3 ${widthFirst} line`} />
          <div className={`ml-1 h-3 ${widthSecond} line`} />
        </div>
        {full && (
          <div className="flex">
            <div className="line h-2 w-9" />
            <div className="line ml-1 h-2 w-9" />
            <div className="line ml-1 h-2 w-12" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Block
