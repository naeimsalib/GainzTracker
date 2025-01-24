import HomeContainer from '../../components/HomeContainer/HomeContainer';

export default function HomePage({ user }) {
  return (
    <div>
      <HomeContainer user={user} />
    </div>
  );
}
