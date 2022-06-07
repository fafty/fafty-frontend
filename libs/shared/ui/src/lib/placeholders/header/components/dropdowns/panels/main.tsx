import Block from '../../parts/block';
import Divider from "../../../../../header/components/parts/divider";

const MainPanelPlaceholder = (): JSX.Element => {
  return (
    <div className="relative overflow-hidden p-2 rounded-lg bg-white dark:bg-neutral-800">
      <div className="animate-pulse relative grid gap-1 p-1 grid-cols-1">
        <div className="flex rounded-lg p-2 placeholder">
          <div className="flex h-14 w-14 flex-shrink-0 px-1 py-1 circle"></div>
          <div className="ml-4">
            <div className="h-3" />
            <div className="flex mb-2">
              <div className="h-3 w-14 line" />
              <div className="h-3 w-11 ml-1 line" />
            </div>
            <div className="flex">
              <div className="h-2 w-9 line" />
              <div className="h-2 w-12 ml-1 line" />
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

export default MainPanelPlaceholder;
