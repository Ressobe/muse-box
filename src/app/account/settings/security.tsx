import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";

export default function Security() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>Manage your security settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-2">
          <h1>Delete account</h1>
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
