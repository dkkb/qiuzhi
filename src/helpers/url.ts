import {useLocation, useParams} from "react-router-dom";

export const useQuery = () => {
    const query = new URLSearchParams(useLocation().search);
    const { feedId } = useParams();
    const feedUrl = query.get("url") || undefined;
    const type = query.get("type") || undefined;
    console.log(feedUrl, type, feedId)
    return [feedUrl, type, feedId];
};