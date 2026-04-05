import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/" className="btn btn-link h-auto">
        <Image
          src="/vercel.svg"
          alt="Vercel logo"
          width={48}
          height={48}
          priority
          className="dark:invert size-12"
        />
      </Link>
    </div>
  );
}
