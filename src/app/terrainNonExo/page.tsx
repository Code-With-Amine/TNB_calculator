import { TnbForm } from "@/components/tnb-form";
import Nav from "@/components/Nav";
function page() {
  return (
    <div className=" justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-start sm:items-start">
        <Nav />
        <TnbForm />
      </main>
    </div>
    )
}

export default page