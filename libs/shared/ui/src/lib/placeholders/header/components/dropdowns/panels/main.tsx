import Block from '../../parts/block'
import Divider from '../../../../../header/components/parts/divider'

const MainPanelPlaceholder = (): JSX.Element => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white p-2 dark:bg-neutral-800">
      <div className="relative grid animate-pulse grid-cols-1 gap-1 p-1">
        <div className="placeholder flex rounded-lg p-2">
          <div className="circle flex h-14 w-14 flex-shrink-0 px-1 py-1"></div>
          <div className="ml-4">
            <div className="h-3" />
            <div className="mb-2 flex">
              <div className="line h-3 w-14" />
              <div className="line ml-1 h-3 w-11" />
            </div>
            <div className="flex">
              <div className="line h-2 w-9" />
              <div className="line ml-1 h-2 w-12" />
            </div>
          </div>
        </div>
        <Divider />
        <Block widthFirst="w-[3.5rem]" widthSecond="w-[3.5rem]" full={true} />
        <Divider />
        <Block widthFirst="w-[3.5rem]" widthSecond="w-[6.5rem]" />
        <Block widthFirst="w-[7rem]" widthSecond="w-[3rem]" />
        <Block widthFirst="w-[5rem]" widthSecond="w-[5rem]" />
        <Block widthFirst="w-[3rem]" widthSecond="w-[7rem]" />
      </div>
    </div>
  );
};

export default MainPanelPlaceholder
