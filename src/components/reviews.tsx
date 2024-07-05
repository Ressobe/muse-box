import { Button } from "@/components/ui/button";
import { AddComment } from "./add-comment";
import { Comment } from "./comment";

export function Reviews() {
  return (
    <div className="pt-20">
      <h2 className="font-bold text-2xl pb-4">User Reviews</h2>
      <AddComment artistId="dkdkdk" />
      <div className="pt-10 w-full grid grid-cols-2 gap-x-10">
        <Comment
          id="dkd"
          rate={3}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nibh sit amet arcu sagittis scelerisque. Suspendisse fermentum, nunc vel tristique posuere, ex nulla iaculis sapien, non eleifend justo diam eget risus. Quisque ut luctus mauris, sed malesuada lacus. Quisque"
          ownerId="dkdkdk"
          profileId="dkdkdk"
          createdAt={new Date()}
          ownerName="bartek"
        />
        <Comment
          id="dkd"
          rate={3}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nibh sit amet arcu sagittis scelerisque. Suspendisse fermentum, nunc vel tristique posuere, ex nulla iaculis sapien, non eleifend justo diam eget risus. Quisque ut luctus mauris, sed malesuada lacus. Quisque"
          ownerId="dkdkdk"
          profileId="dkdkdk"
          createdAt={new Date()}
          ownerName="bartek"
        />
        <Comment
          id="dkd"
          rate={3}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nibh sit amet arcu sagittis scelerisque. Suspendisse fermentum, nunc vel tristique posuere, ex nulla iaculis sapien, non eleifend justo diam eget risus. Quisque ut luctus mauris, sed malesuada lacus. Quisque"
          ownerId="dkdkdk"
          profileId="dkdkdk"
          createdAt={new Date()}
          ownerName="bartek"
        />
        <Comment
          id="dkd"
          rate={3}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nibh sit amet arcu sagittis scelerisque. Suspendisse fermentum, nunc vel tristique posuere, ex nulla iaculis sapien, non eleifend justo diam eget risus. Quisque ut luctus mauris, sed malesuada lacus. Quisque"
          ownerId="dkdkdk"
          profileId="dkdkdk"
          createdAt={new Date()}
          ownerName="bartek"
        />
        <Comment
          id="dkd"
          rate={3}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non nibh sit amet arcu sagittis scelerisque. Suspendisse fermentum, nunc vel tristique posuere, ex nulla iaculis sapien, non eleifend justo diam eget risus. Quisque ut luctus mauris, sed malesuada lacus. Quisque"
          ownerId="dkdkdk"
          profileId="dkdkdk"
          createdAt={new Date()}
          ownerName="bartek"
        />
      </div>
      <div className="pt-10 flex justify-center">
        <Button variant="secondary">See all reviews</Button>
      </div>
    </div>
  );
}
