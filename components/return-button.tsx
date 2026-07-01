import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface ReturnButtonProps {
  href: string;
  label: string;
}

export default function ReturnButton({ href, label }: ReturnButtonProps) {
  return (
    <Button size="sm">
      <Link href={href}>
        <ArrowLeftIcon /> {label}
      </Link>
    </Button>
  );
}
