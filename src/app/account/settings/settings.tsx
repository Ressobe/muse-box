import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { writeFile } from "fs/promises";
import { SubmitButton } from "@/src/components/submit-button";

export default function Settings() {
  const changeAvatar = async (formData: FormData) => {
    "use server";
    const file = formData.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile("/home/relow/code/muse-box/public/file.png", buffer);
  };
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="Enter your email" type="email" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="Enter your password"
            type="password"
          />
        </div>
        <div className="grid gap-2">
          <h1>Avatar</h1>
          <form action={changeAvatar}>
            <Input className="text-white" type="file" name="file" />
            <SubmitButton>Change avatar</SubmitButton>
          </form>
        </div>
        <div className="grid gap-2">
          <h1>Notifications</h1>
        </div>
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
