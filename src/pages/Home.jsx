import ContentCategory from '../components/home/categorysection/CategorySection';
import TimeAttackSection from '../components/home/TimeAttackSection';
import NewStaySection from "../components/home/newstaysection/NewStaySection";

export default function Home() {
    return(
        <main>
            <ContentCategory />
            <TimeAttackSection />
            <NewStaySection />
        </main>
    );
}