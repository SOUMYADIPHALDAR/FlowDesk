import UserActivationForm from "@/components/user-activation-form";

interface ActivatePageProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

export default async function ActivatePage({
  searchParams,
}: ActivatePageProps) {
  const { token } = await searchParams;

  return (
   <div>
    <UserActivationForm token={token} />
   </div>
  );
}