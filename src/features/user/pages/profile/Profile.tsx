import Center from "@/layout/center/Center"
import ProfileForm from "../../widgets/profile-form/ProfileForm"

const Profile = () => {
	return (
		<Center>
			<h1 className="text-4xl font-bold mb-8">Profile</h1>
			<div className="w-80">
				<ProfileForm />
			</div>
		</Center>
	)
}

export default Profile
