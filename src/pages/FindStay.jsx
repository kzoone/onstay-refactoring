import PageTitle from '../components/common/PageTitle';
import Search from '../components/findstay/Search';

export function FindStay() {
    return(
        <main className="findStay">
            <PageTitle title={'FIND STAY'} subtitle={'머무는 것 자체로 여행이 되는 공간'} />
            <Search />
        </main>
    );
}