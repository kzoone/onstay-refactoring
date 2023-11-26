import PageTitle from '../components/common/PageTitle';
import Search from '../components/findstay/Search';
import Sort from '../components/findstay/Sort';
import AccList from '../components/findstay/AccList';

export function FindStay() {
    return(
        <main className="findstay">
            <PageTitle title={'FIND STAY'} subtitle={'머무는 것 자체로 여행이 되는 공간'} />
            <Search />
            <Sort />
            <AccList />
        </main>
    );
}