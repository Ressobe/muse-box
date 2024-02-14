type SocialStatsProps = {
    className?: string,
    amountOfFriends: number,
    amountOfFollowers: number,
    amountOfFollowing: number,
    ratings: number,
};

export default function SocialStats({className, amountOfFriends, amountOfFollowers, amountOfFollowing, ratings} : SocialStatsProps) {
    return (
        <section className={className} >
            <div>{amountOfFriends} friends</div>
            <div>{amountOfFollowers} followers</div>
            <div>{amountOfFollowing} following</div>
            <div>{ratings} ratings</div>
        </section>
    );
}