import Center from "@/layout/center/Center"
import ProfileForm from "../../widgets/profile-form/ProfileForm"
import useUser from "../../service/useUser"

const Profile = () => {
	const { userProfile } = useUser()

	if (!userProfile?.viewUserProfile) return

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
