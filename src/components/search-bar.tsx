import { Search } from "lucide-react";
import { Input } from "./ui/input";

export function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search books..."
        className="pl-10 text-md sm:w-[300px] md:w-[200px] lg:w-[300px]"
        // onChange={(e) => {
        //   handleSearch(e.target.value);
        // }}
        // defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
