import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Link from "next/link";

type FavouriteProps = {

};

export default function Favourite() {
    return (
    <div className="grid grid-cols-3 gap-4 pb-5">
        <Card>
            <CardHeader>
                <CardTitle className="text-center text-xl">Favourite Song</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
                <img className="w-32 h-32 border-2 border-secondary" 
                src="https://i.scdn.co/image/ab67616d0000b27393b05c905503aef9a420ff76" />
            </CardContent>
            <CardFooter>
                <p><Link href="/">Scrim</Link> - who saves the savior </p>
            </CardFooter>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-center text-xl">Favourite Album</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
                <img className="w-32 h-32 border-2 border-secondary" src="https://i.scdn.co/image/ab67616d0000b273dcff3103179d992594a227db" />
            </CardContent>
            <CardFooter>
                <p><Link href="/artists/">$uicideboy$</Link> - My Liver Will Handle What My Heart Can't</p>
            </CardFooter>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="text-center text-xl">Favourite Artist</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
                <img 
                    className="w-32 h-32 border-2 border-secondary" 
                    src="https://i.scdn.co/image/ab6761610000e5ebc7b954414587e659d048d826" 
                />
            </CardContent>
            <CardFooter>
                <p className="text-center w-full"><Link href="/artists" >Taco Hemingway</Link></p>
            </CardFooter>
        </Card>
    </div>
    );
}