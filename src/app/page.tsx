import Link from "next/link";

export default function Home() {
  return (
    <main>
      This is the root page
      <Link href={"/admin/product"}>Go to product</Link>
    </main>
  )
}
