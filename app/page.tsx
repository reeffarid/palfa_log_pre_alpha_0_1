
import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button";

export interface Props {
  term: string;
}

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
       <h1>Alfarillo Group - Logging Forms Main</h1>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li> 
          <Link href="/pages/geotech" className={buttonVariants({ variant: "outline" })}>Geotechnical Logging</Link>
          </li>   
          <li> 
          <Link href="/pages/relog" className={buttonVariants({ variant: "outline" })}>Relogging Form</Link>
          </li>  
          <li> 
          <Link href="/pages/structural" className={buttonVariants({ variant: "outline" })}>Structural Form</Link>
          </li> 
        </ol>       
      </main>     
    </div>
  );
}