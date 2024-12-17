import Header from "./_components/Header";
import EditorPanel from "./_components/EditorPanel";
import OutputPanel from "./_components/OutputPanel";

export default function Editor() {
  return(
      <div className='min-h-screen'>
          <div className='max-w-[1800px] mx-auto p-4'>
              {/*@ts-ignore*/}
              <Header />
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <EditorPanel />
              <OutputPanel />
          </div>
      </div>
  );
}
