import PageTitle from '../components/common/PageTitle';
import ReservationContent from '../components/reservation/ReservationContent';

export function Reservation() {
    return(
        <main className="reservation_section">
            <PageTitle title='RESERVATION'/>
            <ReservationContent />
        </main>
    );
}