import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import PersonalDetails from "./personal-details";
import Settings from "./settings";
import Security from "./security";

export default function SettingsPage() {
  return (
    <section className="flex flex-col items-center justify-center mt-20">
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-3 text-3xl pb-10">
          <TabsTrigger className="text-xl" value="details">
            Personal Details
          </TabsTrigger>
          <TabsTrigger className="text-xl" value="settings">
            Settings
          </TabsTrigger>
          <TabsTrigger className="text-xl" value="security">
            Security
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <PersonalDetails />
        </TabsContent>
        <TabsContent value="settings">
          <Settings />
        </TabsContent>
        <TabsContent value="security">
          <Security />
        </TabsContent>
      </Tabs>
    </section>
  );
}
