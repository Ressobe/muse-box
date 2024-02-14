import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";
import SocialStats from "@/src/components/user/SocialStats";
import Link from "next/link";
import Favourite from "@/src/components/user/Favourite";


export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return null;
    }

    return (
        <section className="pt-10 flex mx-20 gap-20">
            <div className="w-1/4">
                        <Avatar className="w-40 h-40">
                            <AvatarImage src="/user.png" alt="user avatar" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h1 className="text-4xl text-center  w-40 font-bold pt-2">{session.user.username}</h1>
                    <SocialStats
                        className="pt-4"
                        amountOfFriends={120}
                        amountOfFollowers={230}
                        amountOfFollowing={204}
                        ratings={1000}
                    />

                    <section className="pt-5">
                        <h2>Recently rated</h2>
                        <div>
                            <p>10 - Scrim - who saves the savior (21 minutes ago)</p>
                        </div>
                    </section>
            </div>
            <div className="w-full text-center">

                <Favourite />

                <h2 className="text-3xl pt-10 pb-4 font-bold">Listen Later</h2>
                <div className="flex justify-center gap-5 pb-2">
                    <img 
                        className="w-28 h-28 border-2 border-secondary" 
                        src="https://i.scdn.co/image/ab6761610000e5ebc7b954414587e659d048d826" 
                    />
                    <img className="w-28 h-28 border-2 border-secondary" 
                    src="https://i.scdn.co/image/ab67616d0000b273dcff3103179d992594a227db" />
                    <img 
                        className="w-28 h-28 border-2 border-secondary" 
                        src="https://i.scdn.co/image/ab6761610000e5ebc7b954414587e659d048d826" 
                    />
                    <img className="w-28 h-28 border-2 border-secondary" 
                    src="https://i.scdn.co/image/ab67616d0000b273dcff3103179d992594a227db" />
                    <img 
                        className="w-28 h-28 border-2 border-secondary" 
                        src="https://i.scdn.co/image/ab6761610000e5ebc7b954414587e659d048d826" 
                    />
                    <img className="w-28 h-28 border-2 border-secondary" 
                    src="https://i.scdn.co/image/ab67616d0000b273dcff3103179d992594a227db" />

                </div>

                <hr/>

                <h2 className="text-3xl pt-10 pb-4 font-bold">Rated Songs</h2>

                <div className="flex justify-center gap-5 pb-2">
                    <img 
                        className="w-28 h-28 border-2 border-secondary" 
                        src="https://i.scdn.co/image/ab6761610000e5ebc7b954414587e659d048d826" 
                    />
                    <img className="w-28 h-28 border-2 border-secondary" 
                    src="https://i.scdn.co/image/ab67616d0000b273dcff3103179d992594a227db" />
                    <img 
                        className="w-28 h-28 border-2 border-secondary" 
                        src="https://i.scdn.co/image/ab6761610000e5ebc7b954414587e659d048d826" 
                    />
                    <img className="w-28 h-28 border-2 border-secondary" 
                    src="https://i.scdn.co/image/ab67616d0000b273dcff3103179d992594a227db" />
                    <img 
                        className="w-28 h-28 border-2 border-secondary" 
                        src="https://i.scdn.co/image/ab6761610000e5ebc7b954414587e659d048d826" 
                    />
                    <img className="w-28 h-28 border-2 border-secondary" 
                    src="https://i.scdn.co/image/ab67616d0000b273dcff3103179d992594a227db" />
                </div>

                <Button className="mb-2">See more</Button>
                <hr/>

                <h2 className="text-3xl pt-10 pb-4 font-bold">Rated Albums</h2>
                <div className="flex justify-center gap-5 pb-2">
                    <img 
                        className="w-28 h-28 border-2 border-secondary" 
                        src="https://i.scdn.co/image/ab6761610000e5ebc7b954414587e659d048d826" 
                    />
                    <img className="w-28 h-28 border-2 border-secondary" 
                    src="https://i.scdn.co/image/ab67616d0000b273dcff3103179d992594a227db" />
                    <img 
                        className="w-28 h-28 border-2 border-secondary" 
                        src="https://i.scdn.co/image/ab6761610000e5ebc7b954414587e659d048d826" 
                    />
                    <img className="w-28 h-28 border-2 border-secondary" 
                    src="https://i.scdn.co/image/ab67616d0000b273dcff3103179d992594a227db" />
                    <img 
                        className="w-28 h-28 border-2 border-secondary" 
                        src="https://i.scdn.co/image/ab6761610000e5ebc7b954414587e659d048d826" 
                    />
                    <img className="w-28 h-28 border-2 border-secondary" 
                    src="https://i.scdn.co/image/ab67616d0000b273dcff3103179d992594a227db" />
                </div>

                <Button className="mb-2">See more</Button>
                <hr/>

                <h2 className="text-3xl pt-10 pb-4 font-bold">Rated Artists</h2>
                <div className="flex justify-center gap-5 pb-2">
                    <img 
                        className="w-28 h-28 border-2 border-secondary" 
                        src="https://i.scdn.co/image/ab6761610000e5ebc7b954414587e659d048d826" 
                    />
                    <img className="w-28 h-28 border-2 border-secondary" 
                    src="https://i.scdn.co/image/ab67616d0000b273dcff3103179d992594a227db" />
                    <img 
                        className="w-28 h-28 border-2 border-secondary" 
                        src="https://i.scdn.co/image/ab6761610000e5ebc7b954414587e659d048d826" 
                    />
                    <img className="w-28 h-28 border-2 border-secondary" 
                    src="https://i.scdn.co/image/ab67616d0000b273dcff3103179d992594a227db" />
                    <img 
                        className="w-28 h-28 border-2 border-secondary" 
                        src="https://i.scdn.co/image/ab6761610000e5ebc7b954414587e659d048d826" 
                    />
                    <img className="w-28 h-28 border-2 border-secondary" 
                    src="https://i.scdn.co/image/ab67616d0000b273dcff3103179d992594a227db" />
                </div>

                <Button className="mb-2">See more</Button>

            </div>
        </section>
    );
}