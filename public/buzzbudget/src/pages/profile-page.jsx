import FormEditProfile from "../components/form/formEditProfile";
import UseUser from "../components/hook/useUser";
const ProfilePage = () => {
  const user = UseUser();
  return (
    <>
      <div className="pt-16">
        <h1>Profile</h1>
        <div id="displayInfoUser">
          <FormEditProfile user={user} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
