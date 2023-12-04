import RoomContent from '../components/roomdetail/RoomContent';
import PageTitle from '../components/common/PageTitle';

export function RoomDetail() {
    return(
        <main className='roomdetail_section'>
            <PageTitle title='BOOKING'/>
            <RoomContent />
        </main>
    );
}