import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import AddComment from "./add-comment";

export default function ArtistComments() {
  return (
    <div className="px-4 py-6 md:px-6 md:py-12 lg:py-16">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight">Comments</h2>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <div className="rounded-full overflow-hidden w-10 h-10">
                <div
                  className="rounded-full w-[40px] h-[40px] border"
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                ></div>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold leading-none">Grace Lee</h3>
                <p className="space-x-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Posted on August 24, 2023
                  </span>
                  <span>Rate</span>
                </p>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800">
              <div className="pt-4 flex items-center justify-between">
                <p>
                  I really enjoyed this article! The story of the Jokester is
                  both funny and heartwarming. Its amazing how something as
                  simple as a joke can bring people together. I also love the
                  way the author weaves in the theme of the importance of
                  laughter in the face of adversity. Well done!
                </p>
              </div>
            </div>
          </div>
        </div>
        <AddComment artistId="ddk" profileId="kdkd" />
      </div>
    </div>
  );
}
