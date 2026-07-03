import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface ReturnButtonProps {
  href: string;
  label: string;
}

export default function ReturnButton({ href, label }: ReturnButtonProps) {
  return (
    <Link href={href} className={buttonVariants({ size: "sm" })}>
      <ArrowLeftIcon /> {label}
    </Link>
  );
}
