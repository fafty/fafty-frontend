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
    <div className="flex items-center rounded-lg p-2 placeholder">
      <div className="flex h-9 w-9 circle" />
      <div className="ml-4">
        <div className="flex mb-2">
          <div
            className={`h-3 ${widthFirst} line`}
          />
          <div
            className={`h-3 ${widthSecond} line`}
          />
        </div>
        {full && (
          <div className="flex">
            <div className="h-2 w-9 line" />
            <div className="h-2 w-9 ml-1 line" />
            <div className="h-2 w-12 ml-1 line" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Block;
