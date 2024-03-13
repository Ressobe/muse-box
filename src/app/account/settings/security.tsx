import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { SubmitButton } from "@/src/components/submit-button";
import getServerProfileSession from "@/src/lib/session";
import deleteAccountAction from "./_actions/delete-account";

export default async function Security() {
  const profile = await getServerProfileSession();

  if (!profile) {
    return null;
  }

  const handleSubmit = async () => {
    "use server";
    await deleteAccountAction(profile.id);
  };
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>Manage your security settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form action={handleSubmit}>
          <SubmitButton>Delete account</SubmitButton>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="mr-auto" variant="outline">
          Cancel
        </Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  );
}
