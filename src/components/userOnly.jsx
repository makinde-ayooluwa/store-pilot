import { useUser } from "../contexts/userProvider"
import Loading from "./loading";
import LoginToView from "./notLoggedIn";

export const UserOnly = ({ loading, children, currentPage }) => {
    const { user } = useUser();
    if (user == null) {
        return (
            <>
                <LoginToView />
            </>
        )
    }

    return <>
        {
            loading &&
            <Loading page={currentPage} />
        }
        {!loading && children}
    </>;
}