// import "./Home.css";
import LinkCard from "../components/LinkCard";
import ContentWrapper from "../components/widgets/ContentWrapper";

function Home(props)
{
    return (
        <>
        <ContentWrapper>
            <LinkCard title="Profile" href="profile" icon="Profile"/>
            <LinkCard title="Balance" href="balance" icon="Balance"/>
            <LinkCard title="Transactions" href="transactions" icon="Transaction"/>
            <LinkCard title="Goals" href="goals" icon="Goals"/>
            <LinkCard title="Savings Settings" href="savings" icon="Savings"/>
        </ContentWrapper>
        </>
    )
}

export default Home;