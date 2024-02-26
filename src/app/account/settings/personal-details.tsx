import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/src/components/ui/card";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/src/components/ui/select";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";

export default function PersonalDetails() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Personal Details</CardTitle>
        <CardDescription>
          Manage your personal information and account settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">First Name</Label>
            <Input id="name" placeholder="Enter your first name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="surname">Last Name</Label>
            <Input id="surname" placeholder="Enter your last name" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthday">Birthday</Label>
          <Input id="birthday" type="date" />
        </div>
        <div className="flex items-start gap-6">
          <div className="grid gap-2 flex-1">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              className="min-h-[100px] resize-none"
              id="bio"
              placeholder="Enter your bio"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label>Gender</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
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
