import NewStaySection from "../components/home/newstaysection/NewStaySection";
import TimeAttackSection from '../components/home/TimeAttackSection';

export default function Home() {
    return(
        <main>
            <TimeAttackSection />
            <NewStaySection />
        </main>
    );
}